export const dynamic = 'force-dynamic';
// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        priceFcfa: true,
        priceEur: true,
        tier: true,
        features: true,
        isActive: true,
        sortOrder: true,
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/products]', error);
    return NextResponse.json(
      { error: 'Impossible de charger les produits.' },
      { status: 500 }
    );
  }
}
