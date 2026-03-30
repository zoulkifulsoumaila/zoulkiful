// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Zoulkiful Soumaila — Digital Entrepreneur & SaaS Builder',
    template: '%s | Zoulkiful Soumaila',
  },
  description:
    'Développeur web, créateur de SaaS et entrepreneur digital basé au Bénin. Je génère jusqu\'à 4 000 €/mois avec des systèmes automatisés. Découvre mes formations et accompagnements.',
  keywords: [
    'digital entrepreneur',
    'SaaS builder',
    'Bénin',
    'Afrique',
    'formation en ligne',
    'produits digitaux',
    'freelance',
    'revenus passifs',
    'web developer',
  ],
  authors: [{ name: 'Zoulkiful Soumaila' }],
  creator: 'Zoulkiful Soumaila',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Zoulkiful Soumaila',
    title: 'Zoulkiful Soumaila — Digital Entrepreneur & SaaS Builder',
    description:
      'Systèmes automatisés, produits digitaux et SaaS depuis le Bénin. Jusqu\'à 4 000€/mois générés en automatique.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@zoulkiful',
    title: 'Zoulkiful Soumaila — Digital Entrepreneur & SaaS Builder',
    description: 'Systèmes automatisés, produits digitaux et SaaS depuis le Bénin.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+22967000000';

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Preconnect for fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton phone={whatsappNumber} />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: 'var(--font-satoshi)',
              fontSize: '14px',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            },
            success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  );
}
