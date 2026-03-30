// types/index.ts

export interface ProductPublic {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceFcfa: number;
  priceEur: number | null;
  tier: 'STARTER' | 'GROWTH' | 'PREMIUM';
  features: string[];
  isActive: boolean;
  sortOrder: number;
}

export interface PaymentInitRequest {
  productId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
}

export interface PaymentInitResponse {
  checkoutUrl: string;
  reference: string;
}

export interface TransactionPublic {
  id: string;
  reference: string;
  status: string;
  amountFcfa: number;
  customerEmail: string;
  customerName: string | null;
  paidAt: string | null;
  createdAt: string;
  notionUrl: string | null;
  product: {
    name: string;
    slug: string;
  };
}
