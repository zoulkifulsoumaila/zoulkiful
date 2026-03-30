// app/offers/page.tsx
import type { Metadata } from 'next';
import OffersGrid from '@/components/sections/OffersGrid';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Offres',
  description: 'Choisis ton programme : Digital Product Starter, SaaS Launch System ou Coaching & Audit. Paiement sécurisé via Mobile Money.',
};

const faqs = [
  {
    q: 'Comment se déroule le paiement ?',
    a: 'Le paiement est 100 % sécurisé via Moneroo, qui accepte Mobile Money (MTN, Moov), cartes Visa/MasterCard et d\'autres méthodes locales. Tu reçois un accès immédiat après confirmation.',
  },
  {
    q: 'Y a-t-il une garantie ?',
    a: 'Je propose une garantie satisfait ou remboursé de 7 jours si tu as bien appliqué les étapes et que tu ne vois aucun progrès. Le remboursement est traité en 48 h.',
  },
  {
    q: 'Je n\'ai aucune expérience — puis-je quand même suivre ?',
    a: 'Oui. Le Digital Product Starter est fait pour les débutants complets. Chaque étape est expliquée simplement. Si tu as déjà de l\'expérience, le SaaS Launch System ou le Coaching sera plus adapté.',
  },
  {
    q: 'Comment puis-je accéder au contenu après l\'achat ?',
    a: 'Tu reçois immédiatement un email avec un lien vers ton espace Notion privé, ainsi que les détails de ta transaction. Si tu ne reçois rien dans les 10 min, vérifie tes spams.',
  },
  {
    q: 'Puis-je payer en plusieurs fois ?',
    a: 'Pour le Coaching & Audit (150 000 FCFA), un paiement en 2 fois est possible. Contacte-moi directement sur WhatsApp pour en discuter.',
  },
];

export default function OffersPage() {
  return (
    <>
      {/* ── Page Header ──────────────────────────────────────── */}
      <section className="pt-32 pb-16 mesh-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100/50 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <span className="badge badge-blue mb-5">
              <i className="fa-solid fa-tag text-xs" />
              3 offres disponibles
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-black text-ink mb-4 leading-tight">
              Choisis ton programme<br />
              <span className="gradient-text">de lancement</span>
            </h1>
            <p className="text-ink-muted text-lg max-w-xl mx-auto leading-relaxed">
              Chaque offre est conçue pour un niveau précis. Pas de fioriture — uniquement
              ce qui fonctionne pour construire un business digital rentable depuis l&apos;Afrique.
            </p>
          </AnimatedSection>

          {/* Trust bar */}
          <AnimatedSection delay={0.2} className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-ink-muted">
            {[
              { icon: 'fa-solid fa-shield-halved', text: 'Paiement sécurisé Moneroo', color: 'text-brand-600' },
              { icon: 'fa-solid fa-bolt',          text: 'Accès immédiat',            color: 'text-amber-500' },
              { icon: 'fa-solid fa-rotate-left',   text: 'Garantie 7 jours',          color: 'text-emerald-600' },
              { icon: 'fa-solid fa-headset',       text: 'Support inclus',            color: 'text-purple-600' },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 glass px-3 py-2 rounded-lg shadow-glass">
                <i className={`${t.icon} ${t.color} text-sm`} />
                <span className="font-medium">{t.text}</span>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── Offers Grid ──────────────────────────────────────── */}
      <section className="section-sm">
        <div className="container">
          <OffersGrid />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="section bg-surface-50">
        <div className="container max-w-3xl">
          <AnimatedSection className="text-center mb-12">
            <span className="badge badge-blue mb-4">FAQ</span>
            <h2 className="font-heading text-3xl font-bold text-ink">Questions fréquentes</h2>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.07} className="card p-6">
                <h3 className="font-heading font-bold text-base text-ink mb-2 flex items-start gap-3">
                  <i className="fa-solid fa-circle-question text-brand-500 mt-0.5 flex-shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed pl-7">{faq.a}</p>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-12 text-center">
            <p className="text-ink-muted mb-4">Tu as d&apos;autres questions ?</p>
            <Link href="/contact" className="btn-secondary">
              <i className="fa-brands fa-whatsapp text-base" />
              Me contacter directement
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
