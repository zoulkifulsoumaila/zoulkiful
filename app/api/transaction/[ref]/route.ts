export const dynamic = 'force-dynamic';
// app/api/transaction/[ref]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyMonerooTransaction } from '@/lib/moneroo';

export async function GET(
  _req: NextRequest,
  { params }: { params: { ref: string } }
) {
  try {
    const { ref } = params;
    if (!ref || typeof ref !== 'string') {
      return NextResponse.json({ error: 'Référence manquante' }, { status: 400 });
    }

    const transaction = await prisma.transaction.findUnique({
      where: { reference: ref },
      include: { product: { select: { name: true, slug: true, notionUrl: true } } },
    });

    if (!transaction) {
      return NextResponse.json({ error: 'Transaction introuvable' }, { status: 404 });
    }

    // If still pending, re-check with Moneroo
    if (transaction.status === 'PENDING' && transaction.monerooId) {
      const verified = await verifyMonerooTransaction(transaction.monerooId);
      if (verified?.status === 'success') {
        await prisma.transaction.update({
          where: { id: transaction.id },
          data: { status: 'SUCCESS', paidAt: new Date() },
        });
        transaction.status = 'SUCCESS';
      }
    }

    return NextResponse.json({
      transaction: {
        id: transaction.id,
        reference: transaction.reference,
        status: transaction.status,
        amountFcfa: transaction.amountFcfa,
        customerEmail: transaction.customerEmail,
        customerName: transaction.customerName,
        paidAt: transaction.paidAt?.toISOString() ?? null,
        createdAt: transaction.createdAt.toISOString(),
        product: {
          name: transaction.product.name,
          slug: transaction.product.slug,
        },
        notionUrl: transaction.status === 'SUCCESS' ? transaction.product.notionUrl : null,
      },
    });
  } catch (error) {
    console.error('[GET /api/transaction/[ref]]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
