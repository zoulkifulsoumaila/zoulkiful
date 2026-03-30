'use client';
// components/sections/OfferCard.tsx
import { motion } from 'framer-motion';
import type { ProductPublic } from '@/types';

interface Props {
  product: ProductPublic;
  onSelect: (product: ProductPublic) => void;
  index: number;
}

const tierConfig = {
  STARTER: {
    label: 'Débutant',
    icon: 'fa-solid fa-seedling',
    color: 'text-brand-600',
    bg: 'bg-brand-50',
    border: 'border-brand-100',
    badge: 'badge-blue',
    popular: false,
  },
  GROWTH: {
    label: 'Croissance',
    icon: 'fa-solid fa-rocket',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    badge: 'badge-amber',
    popular: true,
  },
  PREMIUM: {
    label: 'Premium',
    icon: 'fa-solid fa-crown',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    badge: 'badge-green',
    popular: false,
  },
};

export default function OfferCard({ product, onSelect, index }: Props) {
  const cfg = tierConfig[product.tier];

  const formatPrice = (fcfa: number) =>
    new Intl.NumberFormat('fr-FR').format(fcfa);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`card flex flex-col h-full relative ${cfg.popular ? 'offer-popular' : ''}`}
    >
      <div className="p-7 flex flex-col h-full">
        {/* Icon & Badge */}
        <div className="flex items-start justify-between mb-5">
          <div className={`w-12 h-12 rounded-2xl ${cfg.bg} flex items-center justify-center`}>
            <i className={`${cfg.icon} ${cfg.color} text-xl`} />
          </div>
          <span className={`badge ${cfg.badge}`}>{cfg.label}</span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl font-bold text-ink mb-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-ink-muted leading-relaxed mb-5">{product.description}</p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-6">
          <span className="price-tag">{formatPrice(product.priceFcfa)}</span>
          <span className="price-currency">FCFA</span>
          {product.priceEur && (
            <span className="text-ink-light text-sm ml-1">≈ {product.priceEur}€</span>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-2.5 mb-8 flex-1">
          {product.features.map((feat, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-ink-muted">
              <i className={`fa-solid fa-circle-check ${cfg.color} text-base mt-0.5 flex-shrink-0`} />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => onSelect(product)}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
            cfg.popular
              ? 'btn-primary'
              : 'btn-secondary'
          }`}
        >
          <i className="fa-solid fa-cart-shopping mr-2" />
          Commencer maintenant
        </button>
      </div>
    </motion.div>
  );
}
