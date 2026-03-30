// prisma/seed.ts
import { PrismaClient, ProductTier } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing products
  await prisma.product.deleteMany();

  const products = [
    {
      name: 'Digital Product Starter',
      slug: 'digital-product-starter',
      description: 'Lance ton premier produit digital et génère tes premières ventes en 30 jours avec un système automatisé clé en main.',
      priceFcfa: 25000,
      priceEur: 38,
      tier: ProductTier.STARTER,
      features: [
        'Recherche de niche rentable',
        'Création du produit digital',
        'Structuration de l\'offre irrésistible',
        'Tunnel de vente complet',
        'Stratégie de lancement',
        'Automatisation des ventes',
        'Accès à l\'espace membres (Notion)',
        'Support par email 30 jours',
      ],
      notionUrl: process.env.NOTION_STARTER_URL ?? '',
      isActive: true,
      sortOrder: 1,
    },
    {
      name: 'SaaS Launch System',
      slug: 'saas-launch-system',
      description: 'De l\'idée au SaaS qui génère des revenus récurrents. Valide, construit et lance ton logiciel sans coder en 60 jours.',
      priceFcfa: 67500,
      priceEur: 103,
      tier: ProductTier.GROWTH,
      features: [
        'Validation de l\'idée SaaS',
        'Analyse de marché approfondie',
        'Création du MVP (no-code)',
        'Outils no-code & stack recommandée',
        'Branding complet (nom, logo, identité)',
        'Intégration paiement (Stripe / Moneroo)',
        'Stratégie de monétisation',
        'Plan de lancement complet',
        'Acquisition des premiers utilisateurs',
        'Automatisation & croissance',
        'Accès à l\'espace membres (Notion)',
        'Support prioritaire 60 jours',
      ],
      notionUrl: process.env.NOTION_SAAS_URL ?? '',
      isActive: true,
      sortOrder: 2,
    },
    {
      name: 'Coaching & Audit',
      slug: 'coaching-audit',
      description: 'Un accompagnement 1-on-1 ultra-personnalisé pour structurer, auditer et accélérer ton business digital avec un plan d\'action concret.',
      priceFcfa: 150000,
      priceEur: 229,
      tier: ProductTier.PREMIUM,
      features: [
        'Appel stratégique 90 min (Zoom)',
        'Analyse complète de ton profil & business',
        'Sélection du business model optimal',
        'Plan d\'action personnalisé détaillé',
        'Accompagnement guidé étape par étape',
        'Audit de tes outils & systèmes existants',
        'Accès WhatsApp direct (30 jours)',
        'Suivi hebdomadaire de tes progrès',
        'Ressources exclusives & templates',
        'Support illimité par email 90 jours',
      ],
      notionUrl: process.env.NOTION_COACHING_URL ?? '',
      isActive: true,
      sortOrder: 3,
    },
  ];

  for (const product of products) {
    const created = await prisma.product.create({ data: product });
    console.log(`✅ Created: ${created.name} (${created.priceFcfa.toLocaleString()} FCFA)`);
  }

  console.log('✅ Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
