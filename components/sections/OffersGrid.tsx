'use client';
// components/sections/OffersGrid.tsx
import { useEffect, useState } from 'react';
import OfferCard from './OfferCard';
import CheckoutModal from '@/components/ui/CheckoutModal';
import type { ProductPublic } from '@/types';

export default function OffersGrid() {
  const [products, setProducts] = useState<ProductPublic[]>([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState<ProductPublic | null>(null);
  const [error, setError]       = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => { setProducts(d.products ?? []); setLoading(false); })
      .catch(() => { setError('Impossible de charger les offres.'); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card p-7 h-[520px]">
            <div className="skeleton w-12 h-12 rounded-2xl mb-5" />
            <div className="skeleton h-6 w-3/4 mb-3" />
            <div className="skeleton h-4 w-full mb-2" />
            <div className="skeleton h-4 w-5/6 mb-6" />
            <div className="skeleton h-10 w-1/3 mb-6" />
            <div className="space-y-2.5">
              {[1,2,3,4,5].map(j => <div key={j} className="skeleton h-4 w-full" />)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <i className="fa-solid fa-circle-exclamation text-red-400 text-3xl mb-3" />
        <p className="text-ink-muted">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <OfferCard key={p.id} product={p} onSelect={setSelected} index={i} />
        ))}
      </div>

      {selected && (
        <CheckoutModal product={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
