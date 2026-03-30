'use client';
// components/layout/Footer.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';

const links = {
  nav: [
    { href: '/',        label: 'Accueil'  },
    { href: '/offers',  label: 'Offres'   },
    { href: '/about',   label: 'À propos' },
    { href: '/contact', label: 'Contact'  },
  ],
  social: [
    { icon: 'fa-brands fa-twitter',   href: process.env.NEXT_PUBLIC_TWITTER_URL   ?? '#', label: 'Twitter'   },
    { icon: 'fa-brands fa-instagram', href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '#', label: 'Instagram' },
    { icon: 'fa-brands fa-linkedin',  href: process.env.NEXT_PUBLIC_LINKEDIN_URL  ?? '#', label: 'LinkedIn'  },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5 w-fit group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">Z</span>
              </div>
              <span className="font-heading font-bold text-lg tracking-tight">
                Zoulkiful<span className="text-brand-400">.</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Entrepreneur digital basé au Bénin. Je construis des systèmes automatisés qui génèrent des revenus récurrents.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {links.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
                >
                  <i className={`${s.icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Navigation</p>
            <ul className="space-y-3">
              {links.nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Contact</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/60">
                <i className="fa-solid fa-location-dot text-brand-400 w-4" />
                Cotonou, Bénin
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <i className="fa-solid fa-envelope text-brand-400 w-4" />
                contact@zoulkifulsoumaila.com
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <i className="fa-brands fa-whatsapp text-brand-400 w-4" />
                {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+229 67 00 00 00'}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Zoulkiful Soumaila. Tous droits réservés.
          </p>
          <p className="text-sm text-white/30">
            Fait avec <span className="text-red-400">♥</span> au Bénin 🇧🇯
          </p>
        </div>
      </div>
    </footer>
  );
}
