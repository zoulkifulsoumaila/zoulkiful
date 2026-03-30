'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const testimonials = [
  {
    name: 'Kofi A.',
    location: 'Accra, Ghana',
    product: 'SaaS',
    rating: 5,
    text: 'En moins de 60 jours, j\'avais mon SaaS en ligne avec mes premiers clients payants. Zoulkiful m\'a guidé à chaque étape. Je ne savais pas coder, et pourtant ça marche !',
    result: '+180 000 FCFA / mois',
    initials: 'KA',
    color: 'bg-brand-600',
  },
  {
    name: 'Aminata D.',
    location: 'Dakar, Sénégal',
    product: 'Starter',
    rating: 5,
    text: 'J\'ai lancé mon premier produit digital en 3 semaines. Aujourd\'hui je génère des revenus même quand je dors. La méthode est simple et adaptée à notre contexte africain.',
    result: '1ères ventes en 3 semaines',
    initials: 'AD',
    color: 'bg-emerald-600',
  },
  {
    name: 'Moussa T.',
    location: 'Cotonou, Bénin',
    product: 'Coaching',
    rating: 5,
    text: 'Le coaching 1-on-1 a tout changé pour moi. Zoulkiful a analysé mon business, identifié mes blocages et m\'a donné un plan d\'action précis. En 30 jours j\'ai doublé mes revenus.',
    result: 'Revenus x2 en 30 jours',
    initials: 'MT',
    color: 'bg-amber-600',
  },
  {
    name: 'Fatou N.',
    location: 'Lomé, Togo',
    product: 'SaaS',
    rating: 5,
    text: 'Je n\'y croyais pas vraiment au début. Mais le suivi jusqu\'à la fin de la formation m\'a donné confiance. Mon SaaS tourne maintenant en automatique. Je recommande à 100%.',
    result: 'SaaS lancé en 45 jours',
    initials: 'FN',
    color: 'bg-purple-600',
  },
  {
    name: 'Ibrahim K.',
    location: 'Abidjan, Côte d\'Ivoire',
    product: 'Starter',
    rating: 5,
    text: 'Ce qui m\'a convaincu c\'est le suivi personnalisé. Pas un cours en ligne qu\'on abandonne. Zoulkiful répond vraiment à tes questions. Résultat : 25 000 FCFA de revenus en 1 mois.',
    result: '25 000 FCFA dès le 1er mois',
    initials: 'IK',
    color: 'bg-rose-600',
  },
  {
    name: 'Blandine O.',
    location: 'Porto-Novo, Bénin',
    product: 'Coaching',
    rating: 5,
    text: 'L\'audit de mon business m\'a ouvert les yeux sur des erreurs que je faisais depuis des mois. Le plan d\'action était clair, concret, et applicable immédiatement. Merci infiniment !',
    result: 'Business restructuré en 1 semaine',
    initials: 'BO',
    color: 'bg-cyan-600',
  },
];

export default function Testimonials() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <section className="section bg-surface-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="container relative z-10">
        <AnimatedSection className="text-center mb-4">
          <span className="badge badge-blue mb-4"><i className="fa-solid fa-star text-xs" /> Témoignages vérifiés</span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink mb-4">Ils ont transformé leur vie</h2>
          <p className="text-ink-muted max-w-xl mx-auto text-base leading-relaxed">
            Des entrepreneurs africains qui ont suivi la méthode et obtenu des résultats concrets.
          </p>
        </AnimatedSection>

        {/* Average */}
        <AnimatedSection delay={0.1} className="flex flex-wrap items-center justify-center gap-6 mb-12">
          <div className="flex items-center gap-3 glass px-5 py-3 rounded-2xl shadow-glass">
            <div className="text-center">
              <p className="font-heading text-3xl font-black text-ink">5.0</p>
              <div className="flex gap-0.5 mt-0.5">{[1,2,3,4,5].map(s => <i key={s} className="fa-solid fa-star text-amber-400 text-xs" />)}</div>
            </div>
            <div className="w-px h-10 bg-surface-200" />
            <div>
              <p className="text-sm font-semibold text-ink">Note moyenne</p>
              <p className="text-xs text-ink-muted">Sur {testimonials.length} avis</p>
            </div>
          </div>
          <div className="glass px-5 py-3 rounded-2xl shadow-glass text-center">
            <p className="font-heading text-2xl font-black text-emerald-600">+50</p>
            <p className="text-xs text-ink-muted mt-0.5">Entrepreneurs formés</p>
          </div>
          <div className="glass px-5 py-3 rounded-2xl shadow-glass text-center">
            <p className="font-heading text-2xl font-black text-brand-600">100%</p>
            <p className="text-xs text-ink-muted mt-0.5">Suivi garanti</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {visible.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 28 }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="card p-6 flex flex-col gap-4"
              >
                <div className="flex gap-1">{Array.from({ length: t.rating }).map((_, s) => <i key={s} className="fa-solid fa-star text-amber-400 text-sm" />)}</div>
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5 w-fit">
                  <i className="fa-solid fa-arrow-trend-up text-emerald-600 text-xs" />
                  <span className="text-xs font-bold text-emerald-700">{t.result}</span>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed flex-1 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-surface-200">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>{t.initials}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">{t.name}</p>
                    <p className="text-xs text-ink-light truncate">{t.location}</p>
                  </div>
                  <span className="badge badge-blue text-xs whitespace-nowrap flex-shrink-0">{t.product}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!showAll && (
          <AnimatedSection className="text-center mt-8">
            <button onClick={() => setShowAll(true)} className="btn-secondary">
              <i className="fa-solid fa-chevron-down" /> Voir tous les témoignages ({testimonials.length})
            </button>
          </AnimatedSection>
        )}

        <AnimatedSection className="mt-8 text-center">
          <p className="text-xs text-ink-light flex items-center justify-center gap-1.5">
            <i className="fa-solid fa-shield-halved text-brand-500" />
            Témoignages collectés directement auprès des clients — WhatsApp & email.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
