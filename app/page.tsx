// app/page.tsx
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Testimonials from '@/components/sections/Testimonials';
import AnimatedSection from '@/components/ui/AnimatedSection';
import OffersGrid from '@/components/sections/OffersGrid';
import Link from 'next/link';

const whyReasons = [
  { icon: 'fa-solid fa-globe-africa',  title: '🌍 Contexte 100% africain',  text: "Méthodes adaptées au marché africain — Mobile Money, Moov, MTN. Pas une copie de l'Occident.", color: 'text-brand-600',   bg: 'bg-brand-50'   },
  { icon: 'fa-solid fa-code-branch',   title: '💻 Zéro code requis',        text: "Tu n'as pas besoin d'être développeur. Des outils no-code puissants que n'importe qui peut maîtriser.", color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: 'fa-solid fa-chart-line',    title: '📈 Résultats prouvés',       text: "5+ ans d'expérience, jusqu'à 4 000€/mois automatiquement. Du concret, pas de la théorie.", color: 'text-amber-600',   bg: 'bg-amber-50'   },
  { icon: 'fa-solid fa-hands-holding', title: '🤝 Suivi jusqu\'à la fin',   text: "Accompagnement garanti jusqu'à la fin de ta formation. Coaching privé 1-on-1 disponible.", color: 'text-purple-600',  bg: 'bg-purple-50'  },
  { icon: 'fa-solid fa-robot',         title: '🤖 Systèmes automatisés',    text: "Ton SaaS travaille pendant que tu dors. Revenus récurrents sans intervention quotidienne.", color: 'text-rose-600',    bg: 'bg-rose-50'    },
  { icon: 'fa-solid fa-shield-halved', title: '🛡️ Garantie 7 jours',       text: "Si tu appliques la méthode et ne vois aucun résultat en 7 jours, remboursement intégral garanti.", color: 'text-cyan-600', bg: 'bg-cyan-50'    },
];

const proofStats = [
  { value: '57 800 €', label: 'Revenus générés',     icon: 'fa-solid fa-euro-sign'    },
  { value: '+50',      label: 'Entrepreneurs formés', icon: 'fa-solid fa-users'         },
  { value: '5★',       label: 'Note moyenne',         icon: 'fa-solid fa-star'          },
  { value: '100%',     label: 'Suivi garanti',        icon: 'fa-solid fa-check-double'  },
];

const statsImages = [
  { src: '/stats-revenus.png',   alt: 'Capture revenus Zoulkiful'      },
  { src: '/stats-dashboard.png', alt: 'Dashboard SaaS Zoulkiful'       },
  { src: '/stats-clients.png',   alt: 'Statistiques clients Zoulkiful' },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />

      {/* Section preuves */}
      <section className="section-sm bg-gradient-to-br from-brand-900 to-brand-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-white" />
        </div>
        <div className="container relative z-10">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
              Des résultats réels, pas des promesses
            </h2>
            <p className="text-white/60 text-sm">Captures directement depuis mes tableaux de bord</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {statsImages.map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {proofStats.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="glass rounded-2xl p-4 text-center">
                <i className={`${s.icon} text-brand-300 text-xl mb-2 block`} />
                <p className="font-heading text-2xl font-black text-white">{s.value}</p>
                <p className="text-white/60 text-xs mt-1">{s.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Offres */}
      <section className="section" id="offres">
        <div className="container">
          <AnimatedSection className="text-center mb-6">
            <span className="badge badge-blue mb-4">
              <i className="fa-solid fa-tag text-xs" /> 3 programmes
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink mb-4">
              Choisis ton niveau de départ
            </h2>
            <p className="text-ink-muted max-w-xl mx-auto text-base leading-relaxed">
              Débutant complet ou déjà en activité —{' '}
              <strong className="text-ink">tu seras accompagné jusqu&apos;à la fin.</strong>
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="mb-10">
            <div className="flex items-center justify-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 max-w-lg mx-auto">
              <i className="fa-solid fa-clock text-amber-500" />
              <p className="text-sm font-semibold text-amber-800">
                ⏳ Coaching privé — <strong>3 places restantes</strong> · Fermeture dans 48h
              </p>
            </div>
          </AnimatedSection>
          <OffersGrid />
        </div>
      </section>

      {/* 6 Raisons */}
      <section className="section bg-surface-50">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <span className="badge badge-blue mb-4">Pourquoi me choisir ?</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink mb-4">
              6 raisons de nous rejoindre
            </h2>
            <p className="text-ink-muted max-w-xl mx-auto text-base leading-relaxed">
              Méthode concrète, accompagnement humain, systèmes qui durent.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyReasons.map((r, i) => (
              <AnimatedSection key={i} delay={i * 0.08} className="card p-7 flex gap-5 hover:shadow-card-hover transition-all">
                <div className={`w-12 h-12 rounded-2xl ${r.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <i className={`${r.icon} ${r.color} text-xl`} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-ink mb-1.5">{r.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{r.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* FOMO */}
      <section className="section-sm bg-amber-50 border-y border-amber-100">
        <div className="container">
          <AnimatedSection className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-hourglass-half text-amber-600 text-xl" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-ink mb-1">
                  ⚠️ Places très limitées
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  Je limite volontairement le nombre d&apos;élèves pour garantir un suivi de qualité.
                  Une fois les places prises, les inscriptions ferment jusqu&apos;à la prochaine session.
                </p>
              </div>
            </div>
            <Link href="/offers" className="btn-primary flex-shrink-0 py-4 px-8">
              <i className="fa-solid fa-bolt" /> Réserver ma place
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-10 md:p-16 text-center text-white">
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/3 pointer-events-none" />
              <div className="relative z-10">
                <span className="badge bg-white/15 text-white border-white/20 mb-5 inline-flex">
                  <i className="fa-solid fa-fire text-amber-300 text-xs" /> Dernière chance ce mois-ci
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-black mb-4 leading-tight">
                  Le meilleur moment pour commencer,<br />c&apos;était hier. Le 2ème, c&apos;est maintenant.
                </h2>
                <p className="text-white/75 text-base max-w-xl mx-auto leading-relaxed mb-8">
                  Rejoins les 50+ entrepreneurs africains qui construisent leur liberté financière
                  avec un SaaS automatisé.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/offers" className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-semibold text-base px-8 py-4 rounded-xl hover:bg-brand-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1">
                    <i className="fa-solid fa-rocket" /> Voir les programmes
                  </Link>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold text-base px-8 py-4 rounded-xl border border-white/25 hover:bg-white/25 transition-all duration-200">
                    <i className="fa-brands fa-whatsapp" /> Poser une question
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
