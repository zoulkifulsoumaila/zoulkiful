# Zoulkiful Soumaila — Personal Brand Website

Site de personal branding & vente de produits digitaux, construit avec Next.js 14, Tailwind CSS, Framer Motion, Prisma et Moneroo.

---

## ⚡ Stack technique

| Couche       | Technologie                              |
|--------------|------------------------------------------|
| Frontend     | Next.js 14 (App Router), React 18        |
| Styles       | Tailwind CSS, Framer Motion              |
| Base de données | PostgreSQL + Prisma ORM               |
| Paiement     | Moneroo (Mobile Money + Cartes, FCFA)   |
| Emails       | Nodemailer (SMTP)                        |
| Icônes       | Font Awesome 6                           |
| Typo         | Syne (titres) + DM Sans (corps)          |

---

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone https://github.com/ton-compte/zoulkiful-brand.git
cd zoulkiful-brand
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
```bash
cp .env.example .env.local
# Puis édite .env.local avec tes vraies valeurs
```

Variables requises :
```env
DATABASE_URL=postgresql://user:password@localhost:5432/zoulkiful
NEXT_PUBLIC_APP_URL=http://localhost:3000
APP_SECRET=une-clé-secrète-32-chars-minimum

# Moneroo (https://moneroo.io)
MONEROO_API_KEY=...
MONEROO_SECRET_KEY=...
NEXT_PUBLIC_MONEROO_PUBLIC_KEY=...

# SMTP (Gmail ou autre)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=ton@email.com
SMTP_PASS=ton-app-password
EMAIL_FROM=Zoulkiful <ton@email.com>

# Notion URLs (après achat)
NOTION_STARTER_URL=https://notion.so/...
NOTION_SAAS_URL=https://notion.so/...
NOTION_COACHING_URL=https://notion.so/...

# WhatsApp & réseaux sociaux
NEXT_PUBLIC_WHATSAPP_NUMBER=+22967000000
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/...
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/...
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/...
```

### 4. Configurer la base de données
```bash
# Pousser le schéma Prisma vers ta DB
npm run db:push

# Générer le client Prisma
npm run db:generate

# Seeder les 3 produits
npm run db:seed
```

### 5. Lancer en développement
```bash
npm run dev
# → http://localhost:3000
```

### 6. Build de production
```bash
npm run build
npm start
```

---

## 📁 Structure du projet

```
zoulkiful/
├── app/
│   ├── api/
│   │   ├── products/route.ts          # GET produits depuis DB
│   │   ├── payment/
│   │   │   ├── initiate/route.ts      # Init paiement Moneroo
│   │   │   └── webhook/route.ts       # Webhook Moneroo (+ email)
│   │   ├── transaction/[ref]/route.ts # Lookup transaction
│   │   └── contact/route.ts           # Formulaire de contact
│   ├── page.tsx                        # Home
│   ├── offers/page.tsx                 # Page offres
│   ├── about/page.tsx                  # À propos
│   ├── contact/page.tsx                # Contact
│   ├── success/page.tsx                # Page succès paiement
│   ├── not-found.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── OffersGrid.tsx
│   │   ├── OfferCard.tsx
│   │   └── Testimonials.tsx
│   └── ui/
│       ├── AnimatedSection.tsx
│       ├── CheckoutModal.tsx
│       └── WhatsAppButton.tsx
├── lib/
│   ├── prisma.ts                       # Singleton Prisma
│   ├── moneroo.ts                      # API Moneroo
│   └── email.ts                        # Nodemailer
├── prisma/
│   ├── schema.prisma                   # Tables: User, Product, Transaction
│   └── seed.ts                         # Données initiales (3 produits)
├── types/index.ts
├── hooks/useProducts.ts
└── .env.example
```

---

## 💳 Flux de paiement

```
1. Client clique "Commencer maintenant"
2. Checkout modal s'ouvre (nom, email, téléphone)
3. POST /api/payment/initiate
   → Prisma: fetch prix du produit depuis DB (jamais du client)
   → Prisma: crée Transaction PENDING
   → Moneroo API: initie le paiement → retourne checkout_url
4. Client redirigé vers Moneroo pour payer (Mobile Money / Carte)
5. Moneroo POST /api/payment/webhook
   → Vérifie signature HMAC
   → Double-vérifie statut via Moneroo API (server-to-server)
   → Met à jour Transaction → SUCCESS
   → Envoie email de confirmation (Notion URL inclus)
6. Client redirigé vers /success?ref=ZK-XXXX
   → Affiche reçu complet + bouton "Accéder au contenu"
```

---

## 🔐 Sécurité

- ✅ Prix **toujours** lus depuis la base de données (jamais du frontend)
- ✅ Vérification de signature HMAC Moneroo sur le webhook
- ✅ Double-vérification server-to-server avec l'API Moneroo
- ✅ Variables d'environnement pour toutes les clés sensibles
- ✅ Validation des entrées sur toutes les API routes
- ✅ Rate limiting recommandé via Vercel / middleware (à ajouter en prod)

---

## 🌐 Déploiement (Vercel)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Configurer les variables d'environnement sur vercel.com
# → Settings → Environment Variables
```

**Webhook Moneroo en production :**
Configure l'URL webhook dans ton dashboard Moneroo :
```
https://ton-domaine.com/api/payment/webhook
```

---

## ✏️ Personnalisation rapide

| Quoi changer            | Où                                      |
|-------------------------|-----------------------------------------|
| Nom & infos perso       | `components/sections/Hero.tsx`, layout  |
| Prix des produits       | Seed DB : `prisma/seed.ts`              |
| Témoignages             | `components/sections/Testimonials.tsx`  |
| Couleur principale      | `tailwind.config.ts` → `brand`          |
| Photo de profil         | Remplace le "Z" dans Hero.tsx par `<Image>` |
| Numéro WhatsApp         | `.env.local` → `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Liens réseaux sociaux   | `.env.local` → `NEXT_PUBLIC_*_URL`      |

---

## 📊 Tables de la base de données

### `User`
| Colonne    | Type     | Description             |
|------------|----------|-------------------------|
| id         | String   | CUID auto-généré        |
| email      | String   | Unique                  |
| name       | String?  | Nom complet             |
| phone      | String?  | Téléphone               |
| createdAt  | DateTime |                         |

### `Product`
| Colonne     | Type        | Description             |
|-------------|-------------|-------------------------|
| id          | String      | CUID                    |
| name        | String      | Nom du produit          |
| slug        | String      | URL-friendly unique     |
| priceFcfa   | Int         | Prix en FCFA            |
| priceEur    | Float?      | Équivalent EUR          |
| tier        | ProductTier | STARTER/GROWTH/PREMIUM  |
| features    | String[]    | Liste des inclus        |
| notionUrl   | String?     | Lien contenu privé      |
| isActive    | Boolean     | Visible ou non          |

### `Transaction`
| Colonne       | Type              | Description           |
|---------------|-------------------|-----------------------|
| id            | String            | CUID                  |
| reference     | String            | Ref interne ZK-XXXX   |
| monerooId     | String?           | ID Moneroo            |
| status        | TransactionStatus | PENDING/SUCCESS/...   |
| amountFcfa    | Int               | Montant facturé       |
| customerEmail | String            | Email client          |
| emailSent     | Boolean           | Confirmation envoyée  |
| paidAt        | DateTime?         | Horodatage paiement   |

---

## 📞 Support

Construit par **Zoulkiful Soumaila** — [contact@zoulkiful.com](mailto:contact@zoulkiful.com)
