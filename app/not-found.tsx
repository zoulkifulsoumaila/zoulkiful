// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 mesh-bg">
      <div className="text-center max-w-sm">
        <p className="font-mono text-8xl font-black text-brand-100 select-none mb-2">404</p>
        <h1 className="font-heading text-2xl font-bold text-ink mb-3">Page introuvable</h1>
        <p className="text-ink-muted text-sm mb-8 leading-relaxed">
          Cette page n&apos;existe pas ou a été déplacée. Retourne à l&apos;accueil pour continuer.
        </p>
        <Link href="/" className="btn-primary">
          <i className="fa-solid fa-house" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
