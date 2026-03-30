'use client';
// app/success/page.tsx
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { TransactionPublic } from '@/types';

function SuccessContent() {
  const params = useSearchParams();
  const ref = params.get('ref');

  const [tx, setTx]         = useState<TransactionPublic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    if (!ref) { setError('Référence manquante.'); setLoading(false); return; }
    fetch(`/api/transaction/${ref}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setTx(d.transaction);
      })
      .catch((e) => setError(e.message ?? 'Transaction introuvable.'))
      .finally(() => setLoading(false));
  }, [ref]);

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Africa/Porto-Novo' }).format(new Date(iso));

  const formatPrice = (fcfa: number) =>
    new Intl.NumberFormat('fr-FR').format(fcfa) + ' FCFA';

  const printReceipt = () => window.print();

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-brand-100 border-t-brand-600 animate-spin mx-auto mb-4" />
          <p className="text-ink-muted">Vérification du paiement…</p>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error || !tx) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-circle-exclamation text-red-400 text-3xl" />
          </div>
          <h2 className="font-heading text-xl font-bold text-ink mb-2">Transaction introuvable</h2>
          <p className="text-sm text-ink-muted mb-6">{error || 'Essaie de rafraîchir la page. Si le problème persiste, contacte-moi.'}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => window.location.reload()} className="btn-secondary text-sm">
              <i className="fa-solid fa-rotate-right" /> Réessayer
            </button>
            <Link href="/contact" className="btn-primary text-sm">
              <i className="fa-brands fa-whatsapp" /> Contacter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isPaid = tx.status === 'SUCCESS';
  const isPending = tx.status === 'PENDING';

  return (
    <div className="min-h-screen pt-28 pb-16 mesh-bg">
      <div className="container max-w-2xl">
        {/* Status Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="text-center mb-8"
        >
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isPaid ? 'bg-emerald-50' : isPending ? 'bg-amber-50' : 'bg-red-50'
          }`}>
            <i className={`text-4xl ${
              isPaid    ? 'fa-solid fa-circle-check text-emerald-500' :
              isPending ? 'fa-solid fa-clock text-amber-500' :
                          'fa-solid fa-circle-xmark text-red-500'
            }`} />
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-black text-ink mb-2">
            {isPaid    ? 'Paiement confirmé !' :
             isPending ? 'Paiement en cours…' :
                         'Paiement échoué'}
          </h1>
          <p className="text-ink-muted text-base">
            {isPaid    ? `Merci ${tx.customerName?.split(' ')[0] ?? ''} ! Ton accès est prêt.` :
             isPending ? 'Nous vérifions ton paiement. Rafraîchis dans quelques secondes.' :
                         'Une erreur s\'est produite. Contacte-nous pour de l\'aide.'}
          </p>
        </motion.div>

        {/* Receipt Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="card overflow-hidden mb-6"
          id="receipt"
        >
          {/* Card Header */}
          <div className={`px-7 py-5 flex items-center justify-between ${isPaid ? 'bg-emerald-50 border-b border-emerald-100' : 'bg-surface-50 border-b border-surface-200'}`}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-light">Reçu de paiement</p>
              <p className="font-mono text-sm font-bold text-ink mt-0.5">{tx.reference}</p>
            </div>
            <span className={`badge ${isPaid ? 'badge-green' : isPending ? 'badge-amber' : 'text-red-600 bg-red-50 border-red-100'}`}>
              {isPaid ? 'Payé' : isPending ? 'En attente' : 'Échoué'}
            </span>
          </div>

          {/* Details */}
          <div className="px-7 py-6 space-y-4">
            {[
              { label: 'Produit',     value: tx.product.name },
              { label: 'Montant',     value: formatPrice(tx.amountFcfa), bold: true },
              { label: 'Email',       value: tx.customerEmail },
              { label: 'Nom',         value: tx.customerName ?? '—' },
              { label: 'Date',        value: tx.paidAt ? formatDate(tx.paidAt) : formatDate(tx.createdAt) },
              { label: 'Référence',   value: tx.reference, mono: true },
              { label: 'Transaction', value: tx.id,        mono: true },
            ].map((row, i) => (
              <div key={i} className="flex items-start justify-between gap-4 py-2 border-b border-surface-100 last:border-0">
                <span className="text-sm text-ink-muted flex-shrink-0">{row.label}</span>
                <span className={`text-sm text-right break-all ${row.bold ? 'font-bold text-ink text-base' : row.mono ? 'font-mono text-ink' : 'font-medium text-ink'}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          {isPaid && tx.notionUrl && (
            <a
              href={tx.notionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 justify-center py-4"
            >
              <i className="fa-solid fa-book-open" />
              Accéder au contenu
            </a>
          )}
          <button
            onClick={printReceipt}
            className="btn-secondary flex-1 justify-center py-4"
          >
            <i className="fa-solid fa-download" />
            Télécharger le reçu
          </button>
          {isPending && (
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary flex-1 justify-center py-4"
            >
              <i className="fa-solid fa-rotate-right" />
              Vérifier à nouveau
            </button>
          )}
        </motion.div>

        {isPaid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 glass-blue rounded-2xl p-5 text-center"
          >
            <i className="fa-solid fa-envelope text-brand-500 text-xl mb-2 block" />
            <p className="text-sm text-ink-muted leading-relaxed">
              Un email de confirmation avec ton lien d&apos;accès a été envoyé à{' '}
              <strong className="text-ink">{tx.customerEmail}</strong>.
              Vérifie tes spams si tu ne le reçois pas dans les 10 minutes.
            </p>
          </motion.div>
        )}

        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-ink-light hover:text-ink transition-colors">
            <i className="fa-solid fa-arrow-left mr-2 text-xs" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-brand-100 border-t-brand-600 animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
