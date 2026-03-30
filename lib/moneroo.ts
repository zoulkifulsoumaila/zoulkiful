// lib/moneroo.ts
// Moneroo Payment Gateway — https://docs.moneroo.io

const MONEROO_BASE_URL = 'https://api.moneroo.io/v1';

export interface MonerooInitPayload {
  amount: number;
  currency: string;
  description: string;
  customer: {
    email: string;
    first_name: string;
    last_name?: string;
    phone?: string;
  };
  return_url: string;
  metadata?: Record<string, string>;
  methods?: string[];
}

export interface MonerooInitResponse {
  message: string;
  data?: {
    id: string;
    checkout_url: string;
  };
  errors?: unknown;
}

export interface MonerooVerifyResponse {
  message: string;
  data?: {
    id: string;
    status: 'initiated' | 'pending' | 'success' | 'failed' | 'cancelled';
    amount: number;
    currency: string;
    customer: {
      email: string;
      first_name: string;
      last_name?: string;
      phone?: string;
    };
    payment_method?: string;
    metadata?: Record<string, string>;
  };
}

/**
 * Initiate a Moneroo payment — Step 2 of standard integration
 * POST /v1/payments/initialize
 */
export async function initiateMonerooPayment(
  payload: MonerooInitPayload
): Promise<MonerooInitResponse> {
  const apiKey = process.env.MONEROO_API_KEY;
  if (!apiKey) throw new Error('MONEROO_API_KEY is not configured');

  const response = await fetch(`${MONEROO_BASE_URL}/payments/initialize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('[Moneroo] Init error:', data);
    throw new Error(data.message ?? `Moneroo error ${response.status}`);
  }

  return data;
}

/**
 * Verify a Moneroo transaction — always call server-side, never trust frontend
 * GET /v1/payments/{paymentId}/verify
 */
export async function verifyMonerooTransaction(
  paymentId: string
): Promise<MonerooVerifyResponse['data'] | null> {
  const apiKey = process.env.MONEROO_API_KEY;
  if (!apiKey) throw new Error('MONEROO_API_KEY is not configured');

  const response = await fetch(`${MONEROO_BASE_URL}/payments/${paymentId}/verify`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) return null;

  const data: MonerooVerifyResponse = await response.json();
  return data.data ?? null;
}

/**
 * Verify Moneroo webhook signature (HMAC SHA-256)
 * Header: x-moneroo-signature
 */
export function verifyMonerooSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const crypto = require('crypto');
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expected, 'hex')
    );
  } catch {
    return false;
  }
}
