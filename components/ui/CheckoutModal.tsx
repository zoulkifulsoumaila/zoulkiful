'use client';
// components/ui/CheckoutModal.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import type { ProductPublic } from '@/types';

interface Props {
  product: ProductPublic | null;
  onClose: () => void;
}

export default function CheckoutModal({ product, onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);

  if (!product) return null;

  const formatPrice = (fcfa: number) =>
    new Intl.NumberFormat('fr-FR').format(fcfa) + ' FCFA';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error('Veuillez remplir tous les champs requis.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erreur de paiement');
      toast.success('Redirection vers le paiement...');
      window.location.href = data.checkoutUrl;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur. Réessayez.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const tierColors: Record<string, string> = {
    STARTER: 'badge-blue',
    GROWTH:  'badge-amber',
    PREMIUM: 'badge-green',
  };
  const tierLabels: Record<string, string> = {
    STARTER: 'Débutant',
    GROWTH:  'Croissance',
    PREMIUM: 'Premium',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200] bg-ink/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-glass-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-700 to-brand-600 px-6 pt-6 pb-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
            <span className={`badge ${tierColors[product.tier]} text-white border-white/20 bg-white/20 mb-3`}>
              {tierLabels[product.tier]}
            </span>
            <h2 className="font-heading text-xl font-bold text-white leading-tight">{product.name}</h2>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-heading text-3xl font-black text-white">{formatPrice(product.priceFcfa)}</span>
              {product.priceEur && (
                <span className="text-white/60 text-sm">≈ {product.priceEur}€</span>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="px-6 pb-6 pt-6">
            <p className="text-sm text-ink-muted mb-5">
              Remplis tes informations pour accéder au paiement sécurisé via <strong>Moneroo</strong> (Mobile Money, Carte).
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Kofi Mensah"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="ton@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5">
                  Téléphone <span className="text-ink-light font-normal">(optionnel)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+229 67 00 00 00"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-field"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-4 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <><i className="fa-solid fa-spinner fa-spin" /> Chargement...</>
                ) : (
                  <><i className="fa-solid fa-lock" /> Payer {formatPrice(product.priceFcfa)}</>
                )}
              </button>

              <p className="text-center text-xs text-ink-light mt-3 flex items-center justify-center gap-1.5">
                <i className="fa-solid fa-shield-halved text-brand-500" />
                Paiement 100% sécurisé via Moneroo
              </p>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
