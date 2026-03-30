// app/about/page.tsx
import type { Metadata } from 'next';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvre le parcours de Zoulkiful Soumaila — développeur web, builder de SaaS et entrepreneur digital basé au Bénin.',
};

const timeline = [
  { year: '2019', title: 'Les débuts', text: 'Premiers pas dans le digital : freelance web, petites missions, beaucoup d\'apprentissage. Je découvre que le vrai levier, c\'est la scalabilité.', icon: 'fa-solid fa-seedling', color: 'text-brand-600', bg: 'bg-brand-50' },
  { year: '2020', title: 'Premiers revenus en ligne', text: 'Je vends mes premiers produits digitaux. Je comprends la puissance des actifs numériques qui se vendent pendant que je dors.', icon: 'fa-solid fa-coins', color: 'text-amber-600', bg: 'bg-amber-50' },
  { year: '2021', title: 'Construction de systèmes', text: 'Je développe mes premiers systèmes automatisés — tunnels de vente, email marketing, outils no-code. Le revenu devient prévisible.', icon: 'fa-solid fa-gears', color: 'text-purple-600', bg: 'bg-purple-50' },
  { year: '2022', title: 'Lancement de SaaS', text: 'Je construis et lance mon premier SaaS. Les revenus récurrents changent complètement ma relation à l\'argent et au temps.', icon: 'fa-solid fa-rocket', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { year: '2024', title: '57 800 € générés', text: 'Mes systèmes automatisés ont généré plus de 57 800 €. Je décide de partager mes méthodes avec la communauté entrepreneuriale africaine.', icon: 'fa-solid fa-chart-line', color: 'text-brand-700', bg: 'bg-brand-50' },
];

const skills = [
  { label: 'SaaS Building',        icon: 'fa-solid fa-layer-group',   pct: 95 },
  { label: 'No-code / Automation', icon: 'fa-solid fa-gears',         pct: 92 },
  { label: 'Marketing Digital',    icon: 'fa-solid fa-bullhorn',      pct: 90 },
  { label: 'Tunnels de vente',     icon: 'fa-solid fa-filter',        pct: 92 },
  { label: 'Développement Web',    icon: 'fa-solid fa-code',          pct: 90 },
  { label: 'Email Marketing',      icon: 'fa-solid fa-envelope-open', pct: 88 },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 mesh-bg relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-100/40 rounded-full pointer-events-none" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <span className="badge badge-blue mb-5">
                <i className="fa-solid fa-user text-xs" /> À propos
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl font-black text-ink mb-5 leading-tight">
                Je suis <span className="gradient-text">Zoulkiful</span>,<br />
                entrepreneur digital<br />depuis le Bénin 🇧🇯
              </h1>
              <p className="text-ink-muted text-base leading-relaxed mb-6">
                À 23 ans, j&apos;ai généré plus de <strong className="text-ink">57 800 €</strong> grâce à des systèmes
                digitaux entièrement automatisés — SaaS, produits numériques et funnels optimisés.
                Je partage maintenant mes méthodes pour aider d&apos;autres entrepreneurs africains
                à construire leur liberté financière.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/offers" className="btn-primary">
                  <i className="fa-solid fa-rocket" /> Mes offres
                </Link>
                <Link href="/contact" className="btn-secondary">
                  <i className="fa-brands fa-whatsapp" /> Me contacter
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="glass rounded-3xl p-8 shadow-glass-lg max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                {/* Vraie photo */}
                <div className="flex justify-center mb-6">
                  <img
                    src="/photo-profil.jpeg"
                    alt="Zoulkiful Soumaila"
                    className="w-36 h-36 rounded-3xl object-cover shadow-brand-lg"
                  />
                </div>
                <div className="text-center mb-6">
                  <h2 className="font-heading text-xl font-bold text-ink">Zoulkiful Soumaila</h2>
                  <p className="text-sm text-ink-muted mt-1">SaaS Builder · Digital Entrepreneur</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    {[1,2,3,4,5].map(s => <i key={s} className="fa-solid fa-star text-amber-400 text-sm" />)}
                    <span className="text-xs text-ink-muted ml-1">5.0 / 5</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center border-t border-surface-200 pt-5">
                  {[
                    { n: '23',     l: 'ans'         },
                    { n: '5+',     l: 'ans online'  },
                    { n: '57K€',   l: 'générés'     },
                  ].map((s, i) => (
                    <div key={i}>
                      <p className="font-heading text-lg font-black text-brand-600">{s.n}</p>
                      <p className="text-xs text-ink-muted">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-surface-50">
        <div className="container max-w-3xl">
          <AnimatedSection className="text-center mb-14">
            <span className="badge badge-blue mb-4">Mon parcours</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-3">De zéro à 57 800 €</h2>
            <p className="text-ink-muted text-base">5 ans de construction, d&apos;échecs et de progrès.</p>
          </AnimatedSection>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-surface-200 hidden sm:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1} className="flex gap-6 relative">
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center flex-shrink-0 relative z-10 hidden sm:flex`}>
                    <i className={`${item.icon} ${item.color} text-lg`} />
                  </div>
                  <div className="card p-6 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="badge badge-blue font-mono">{item.year}</span>
                      <h3 className="font-heading font-bold text-base text-ink">{item.title}</h3>
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed">{item.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section">
        <div className="container max-w-3xl">
          <AnimatedSection className="text-center mb-12">
            <span className="badge badge-blue mb-4">Compétences</span>
            <h2 className="font-heading text-3xl font-bold text-ink">Ce que je maîtrise</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {skills.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.07} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <i className={`${s.icon} text-brand-600 text-base`} />
                    <span className="font-semibold text-sm text-ink">{s.label}</span>
                  </div>
                  <span className="text-sm font-bold text-brand-600 font-mono">{s.pct}%</span>
                </div>
                <div className="h-1.5 bg-surface-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full" style={{ width: `${s.pct}%` }} />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm bg-surface-50">
        <div className="container max-w-2xl text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-ink mb-4">Prêt(e) à construire ton système ?</h2>
            <p className="text-ink-muted text-base mb-8 leading-relaxed">
              Tu n&apos;as pas besoin de réinventer la roue. Utilise mes méthodes éprouvées pour aller plus vite.
            </p>
            <Link href="/offers" className="btn-primary text-base py-4 px-10">
              <i className="fa-solid fa-rocket" /> Voir les offres
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
