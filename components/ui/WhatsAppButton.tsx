'use client';
// components/ui/WhatsAppButton.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  phone: string;
  message?: string;
}

export default function WhatsAppButton({
  phone,
  message = 'Bonjour Zoulkiful, je suis intéressé(e) par tes offres 👋',
}: Props) {
  const [hovered, setHovered] = useState(false);

  const encodedMessage = encodeURIComponent(message);
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const href = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-5 z-[999] flex items-center gap-3">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="glass rounded-xl px-4 py-2.5 shadow-glass-lg pointer-events-none"
          >
            <p className="text-sm font-semibold text-ink whitespace-nowrap">Me contacter</p>
            <p className="text-xs text-ink-muted">Réponse en &lt; 24h</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.65)] transition-shadow"
      >
        <i className="fa-brands fa-whatsapp text-2xl" />
        {/* Pulse ring */}
        <span className="absolute w-14 h-14 rounded-full bg-[#25D366] animate-ping opacity-20" />
      </motion.a>
    </div>
  );
}
