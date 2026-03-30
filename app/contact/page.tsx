'use client';
// app/contact/page.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AnimatedSection from '@/components/ui/AnimatedSection';

const channels = [
  {
    icon: 'fa-brands fa-whatsapp',
    label: 'WhatsApp',
    value: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+229 67 00 00 00',
    href: `https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+22967000000').replace(/[^0-9]/g,'')}`,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    note: 'Réponse rapide — recommandé',
  },
  {
    icon: 'fa-solid fa-envelope',
    label: 'Email',
    value: 'contact@zoulkifulsoumaila.com',
    href: 'mailto:contact@zoulkifulsoumaila.com',
    color: 'text-brand-600',
    bg: 'bg-brand-50',
    note: 'Réponse sous 24 h',
  },
  {
    icon: 'fa-solid fa-location-dot',
    label: 'Localisation',
    value: 'Cotonou, Bénin 🇧🇯',
    href: undefined,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    note: 'Disponible en ligne partout',
  },
];

const subjects = [
  'Question sur une offre',
  'Demande de coaching',
  'Partenariat / Collaboration',
  'Support technique',
  'Autre',
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSent(true);
      toast.success('Message envoyé !');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Erreur lors de l\'envoi. Réessaye ou contacte-moi sur WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="pt-32 pb-12 mesh-bg">
        <div className="container text-center">
          <AnimatedSection>
            <span className="badge badge-blue mb-5">
              <i className="fa-solid fa-envelope text-xs" />
              Contact
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-black text-ink mb-4 leading-tight">
              Parlons de ton projet
            </h1>
            <p className="text-ink-muted text-lg max-w-xl mx-auto leading-relaxed">
              Une question sur une offre, un projet de collaboration ou simplement envie d&apos;échanger ?
              Je réponds personnellement à chaque message.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────── */}
      <section className="section-sm">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
            {/* Contact Channels */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatedSection direction="left">
                <h2 className="font-heading text-xl font-bold text-ink mb-5">Me joindre directement</h2>
              </AnimatedSection>

              {channels.map((c, i) => (
                <AnimatedSection key={i} direction="left" delay={i * 0.1}>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="card p-5 flex items-start gap-4 hover:shadow-card-hover transition-all group">
                      <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <i className={`${c.icon} ${c.color} text-lg`} />
                      </div>
                      <div>
                        <p className="text-xs text-ink-light font-medium uppercase tracking-wide mb-0.5">{c.label}</p>
                        <p className="font-semibold text-sm text-ink">{c.value}</p>
                        <p className="text-xs text-ink-light mt-0.5">{c.note}</p>
                      </div>
                      <i className="fa-solid fa-arrow-up-right-from-square text-ink-light text-xs ml-auto mt-1" />
                    </a>
                  ) : (
                    <div className="card p-5 flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
                        <i className={`${c.icon} ${c.color} text-lg`} />
                      </div>
                      <div>
                        <p className="text-xs text-ink-light font-medium uppercase tracking-wide mb-0.5">{c.label}</p>
                        <p className="font-semibold text-sm text-ink">{c.value}</p>
                        <p className="text-xs text-ink-light mt-0.5">{c.note}</p>
                      </div>
                    </div>
                  )}
                </AnimatedSection>
              ))}

              {/* Availability */}
              <AnimatedSection direction="left" delay={0.35} className="glass-blue rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-slow" />
                  <span className="text-sm font-semibold text-ink">Disponible pour coaching</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Quelques places de coaching sont disponibles ce mois-ci. 
                  Contacte-moi pour vérifier ma disponibilité.
                </p>
              </AnimatedSection>
            </div>

            {/* Form */}
            <AnimatedSection direction="right" className="lg:col-span-3">
              <div className="card p-8">
                <h2 className="font-heading text-xl font-bold text-ink mb-6">Envoie-moi un message</h2>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                      <i className="fa-solid fa-circle-check text-emerald-500 text-3xl" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-ink mb-2">Message envoyé !</h3>
                    <p className="text-sm text-ink-muted">Je te répondrai dans les 24 h. Pour une réponse plus rapide, contacte-moi sur WhatsApp.</p>
                    <button onClick={() => setSent(false)} className="btn-secondary mt-6 text-sm">
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-1.5">
                          Nom <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ton prénom"
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
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink mb-1.5">Sujet</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="input-field"
                      >
                        <option value="">Sélectionne un sujet</option>
                        {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Décris ton projet ou ta question en détail..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="input-field resize-none"
                      />
                      <p className="text-xs text-ink-light mt-1 text-right">{form.message.length}/2000</p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <><i className="fa-solid fa-spinner fa-spin" /> Envoi en cours...</>
                      ) : (
                        <><i className="fa-solid fa-paper-plane" /> Envoyer le message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
