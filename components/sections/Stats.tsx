'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const stats = [
  { value: 5,     suffix: '+', label: 'Années online',          sub: "D'expérience prouvée",         icon: 'fa-solid fa-calendar-check', color: 'text-brand-600',   bg: 'bg-brand-50'   },
  { value: 57800, suffix: '€', label: 'Revenus générés',        sub: '100% automatisé',               icon: 'fa-solid fa-euro-sign',       color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { value: 50,    suffix: '+', label: 'Entrepreneurs formés',   sub: "En Afrique de l'Ouest",         icon: 'fa-solid fa-users',           color: 'text-amber-600',   bg: 'bg-amber-50'   },
  { value: 3,     suffix: '',  label: 'SaaS construits',        sub: 'Et lancés sur le marché',       icon: 'fa-solid fa-layer-group',     color: 'text-purple-600',  bg: 'bg-purple-50'  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="stat-number">
      {count.toLocaleString('fr-FR')}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="section-sm border-y border-surface-200 bg-white">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <AnimatedSection key={i} delay={i * 0.1} className="text-center">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${stat.bg} mb-4`}>
                <i className={`${stat.icon} ${stat.color} text-2xl`} />
              </div>
              <div className="mb-1">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-semibold text-ink text-sm">{stat.label}</p>
              <p className="text-xs text-ink-light mt-0.5">{stat.sub}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
