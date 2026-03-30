export const dynamic = 'force-dynamic';
// app/api/payment/initiate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { initiateMonerooPayment } from '@/lib/moneroo';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, customerName, customerEmail, customerPhone } = body;

    // ── Validate input ────────────────────────────────────────────────────
    if (!productId || typeof productId !== 'string') {
      return NextResponse.json({ error: 'productId requis.' }, { status: 400 });
    }
    if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }
    if (!customerName || customerName.trim().length < 2) {
      return NextResponse.json({ error: 'Nom requis.' }, { status: 400 });
    }

    // ── Fetch product & price from DB (NEVER trust client-side price) ─────
    const product = await prisma.product.findUnique({
      where: { id: productId, isActive: true },
    });

    if (!product) {
      return NextResponse.json({ error: 'Produit introuvable.' }, { status: 404 });
    }

    // ── Upsert user ───────────────────────────────────────────────────────
    const user = await prisma.user.upsert({
      where: { email: customerEmail },
      update: { name: customerName, phone: customerPhone ?? undefined },
      create: { email: customerEmail, name: customerName, phone: customerPhone },
    });

    // ── Create pending transaction ─────────────────────────────────────────
    const reference = `ZK-${uuidv4().replace(/-/g, '').slice(0, 16).toUpperCase()}`;

    const transaction = await prisma.transaction.create({
      data: {
        reference,
        userId: user.id,
        productId: product.id,
        amountFcfa: product.priceFcfa,   // price from DB — never from client
        currency: 'XOF',
        status: 'PENDING',
        customerEmail,
        customerName,
        customerPhone,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    // ── Initiate payment with Moneroo ──────────────────────────────────────
    const [firstName, ...rest] = customerName.trim().split(' ');
    const lastName = rest.join(' ') || undefined;

    const monerooRes = await initiateMonerooPayment({
      amount: product.priceFcfa,
      currency: 'XOF',
      description: `Achat — ${product.name}`,
      customer: {
        email: customerEmail,
        first_name: firstName,
        last_name: lastName,
        phone: customerPhone,
      },
      return_url: `${appUrl}/success?ref=${reference}`,
      cancel_url: `${appUrl}/offers?cancelled=1`,
      metadata: {
        transactionId: transaction.id,
        reference,
        productId: product.id,
      },
    });

    if (!monerooRes.data?.checkout_url) {
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: 'FAILED' },
      });
      return NextResponse.json(
        { error: 'Erreur lors de l\'initialisation du paiement.' },
        { status: 502 }
      );
    }

    // ── Save Moneroo ID ────────────────────────────────────────────────────
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { monerooId: monerooRes.data.id },
    });

    return NextResponse.json({
      checkoutUrl: monerooRes.data.checkout_url,
      reference,
    });
  } catch (error) {
    console.error('[POST /api/payment/initiate]', error);
    return NextResponse.json(
      { error: 'Erreur serveur. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}
