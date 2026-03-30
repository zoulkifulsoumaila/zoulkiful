// hooks/useProducts.ts
'use client';
import { useEffect, useState } from 'react';
import type { ProductPublic } from '@/types';

interface UseProductsResult {
  products: ProductPublic[];
  loading: boolean;
  error: string;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<ProductPublic[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then((r) => {
        if (!r.ok) throw new Error('Erreur réseau');
        return r.json();
      })
      .then((d) => setProducts(d.products ?? []))
      .catch(() => setError('Impossible de charger les offres.'))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
