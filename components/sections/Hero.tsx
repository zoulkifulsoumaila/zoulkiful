'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden mesh-bg">
      <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-brand-100/60 to-transparent pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-radial from-cyan-100/40 to-transparent pointer-events-none" />

      {/* URGENCY BAR */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-[60px] left-0 right-0 z-40 bg-gradient-to-r from-brand-800 via-brand-600 to-brand-800 py-2.5 text-center text-white text-xs sm:text-sm font-semibold"
      >
        <i className="fa-solid fa-fire text-amber-300 mr-2" />
        🔥 <strong>3 places restantes</strong> ce mois-ci — Coaching privé · Fermeture dans{' '}
        <strong className="text-amber-300">48h</strong>
        <i className="fa-solid fa-fire text-amber-300 ml-2" />
      </motion.div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute top-48 left-6 hidden lg:flex items-center gap-2 glass rounded-xl px-4 py-2.5 shadow-glass animate-float"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-slow" />
        <span className="text-xs font-semibold text-ink-muted">Disponible pour coaching</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4 }}
        className="absolute top-48 right-6 hidden lg:block glass rounded-2xl px-5 py-4 shadow-glass animate-float-delay"
      >
        <p className="text-xs text-ink-muted font-medium mb-1">Revenus générés</p>
        <p className="font-heading text-2xl font-black text-ink">57 800 €</p>
        <div className="flex items-center gap-1.5 mt-1">
          <i className="fa-solid fa-arrow-trend-up text-emerald-500 text-xs" />
          <span className="text-xs text-emerald-600 font-semibold">100% automatisé</span>
        </div>
      </motion.div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-6"
          >
            {/* Photo — plus grande */}
            <motion.div variants={item} className="relative">
              <img
                src="/photo-profil.jpeg"
                alt="Zoulkiful Soumaila"
                className="w-40 h-40 rounded-3xl object-cover shadow-brand-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center">
                <i className="fa-solid fa-circle-check text-brand-600 text-lg" />
              </div>
              <div className="absolute -top-2 -left-2 glass rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-glass">
                <span className="text-base">🇧🇯</span>
                <span className="text-xs font-semibold text-ink-muted">Bénin</span>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <span className="badge badge-blue">
                <i className="fa-solid fa-bolt text-xs" />
                SaaS Builder · 5+ ans · Aucun code requis
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-ink leading-tight tracking-tight"
            >
              Lance ton{' '}
              <span className="gradient-text">SaaS rentable</span>{' '}
              depuis l&apos;Afrique — sans être développeur
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-ink-muted leading-relaxed max-w-2xl"
            >
              Je t&apos;accompagne de A à Z pour créer, lancer et monétiser ton propre SaaS
              avec des outils no-code.{' '}
              <strong className="text-ink">Suivi garanti jusqu&apos;à la fin de ta formation</strong>{' '}
              avec possibilité de coaching privé 1-on-1.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link href="/offers" className="btn-primary text-base py-4 px-8">
                <i className="fa-solid fa-rocket" /> Démarrer maintenant
              </Link>
              <Link href="/about" className="btn-secondary text-base py-4 px-8">
                <i className="fa-solid fa-play" /> Mon histoire
              </Link>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <div className="flex items-center gap-2 glass px-4 py-2.5 rounded-xl shadow-glass">
                <div className="flex -space-x-2 mr-1">
                  {['bg-brand-500','bg-emerald-500','bg-amber-500','bg-purple-500'].map((c, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                      {['K','A','M','S'][i]}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-semibold text-ink">+50 entrepreneurs formés</span>
              </div>
              <div className="flex items-center gap-1.5 glass px-4 py-2.5 rounded-xl shadow-glass">
                {[1,2,3,4,5].map(s => <i key={s} className="fa-solid fa-star text-amber-400 text-sm" />)}
                <span className="text-sm font-semibold text-ink ml-1">5.0 / 5</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-ink-light font-medium">Découvrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-ink-light/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-ink-light/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
