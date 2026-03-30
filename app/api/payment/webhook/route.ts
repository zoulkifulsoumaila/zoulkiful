export const dynamic = 'force-dynamic';
// app/api/payment/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyMonerooSignature, verifyMonerooTransaction } from '@/lib/moneroo';
import { sendPaymentConfirmationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-moneroo-signature') ?? '';
    const secret = process.env.MONEROO_SECRET_KEY ?? '';

    // ── Verify signature ──────────────────────────────────────────────────
    if (secret && !verifyMonerooSignature(rawBody, signature, secret)) {
      console.warn('[Webhook] Invalid signature — rejecting');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const { reference, status, id: monerooId } = payload;

    if (!reference) {
      return NextResponse.json({ error: 'Missing reference' }, { status: 400 });
    }

    // ── Find transaction ───────────────────────────────────────────────────
    const transaction = await prisma.transaction.findUnique({
      where: { reference },
      include: { product: true, user: true },
    });

    if (!transaction) {
      console.warn(`[Webhook] Transaction not found: ${reference}`);
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    // Skip if already processed
    if (transaction.status === 'SUCCESS') {
      return NextResponse.json({ ok: true, message: 'Already processed' });
    }

    // ── Double-verify with Moneroo API (server-to-server) ─────────────────
    const verified = await verifyMonerooTransaction(monerooId);
    const confirmedStatus = verified?.status ?? status;

    const dbStatus =
      confirmedStatus === 'success'   ? 'SUCCESS'   :
      confirmedStatus === 'failed'    ? 'FAILED'    :
      confirmedStatus === 'cancelled' ? 'CANCELLED' :
      'PENDING';

    // ── Update transaction ─────────────────────────────────────────────────
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        status: dbStatus,
        monerooId,
        monerooPayload: payload,
        paidAt: dbStatus === 'SUCCESS' ? new Date() : undefined,
        paymentMethod: verified?.payment_method,
      },
    });

    // ── Send confirmation email ────────────────────────────────────────────
    if (dbStatus === 'SUCCESS' && !transaction.emailSent) {
      try {
        await sendPaymentConfirmationEmail({
          to: transaction.customerEmail,
          customerName: transaction.customerName ?? 'Client',
          productName: transaction.product.name,
          amountFcfa: transaction.amountFcfa,
          reference: transaction.reference,
          paidAt: new Date(),
          notionUrl: transaction.product.notionUrl ?? '#',
        });
        await prisma.transaction.update({
          where: { id: transaction.id },
          data: { emailSent: true },
        });
      } catch (emailErr) {
        console.error('[Webhook] Email failed:', emailErr);
        // Don't fail webhook — email failure is non-critical
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[POST /api/payment/webhook]', error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}
