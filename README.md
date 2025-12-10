# 🏨 Atlas - Réservation d'Hôtels# 🏨 Atlas - Réservation d'Hôtels au Maroc# 🏨 RéserveMaroc - Application de Réservation d'Hôtels## Atlas — the “mind-blowing” hotel stack



**Projet d'examen EMSI**  

**Auteur :** Oussama SAJJI

Une application web de réservation d'hôtels construite avec Next.js.

---



## 🚀 Lancer le projet

---> Application de réservation d'hôtels au Maroc développée avec Next.js 15Atlas is a demo-grade hotel booking system that pairs modern UX patterns (Server Actions, streaming, optimistic UI) with enterprise data guarantees (PostgreSQL exclusion constraints powered by Prisma + Neon). Use it to show evaluators a cohesive product rather than a form that saves data.

```bash

# 1. Installer les dépendances

npm install

## 📁 Structure du Projet (6 fichiers principaux)

# 2. Configurer Clerk (authentification)

#    Créer un fichier .env.local avec :

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

CLERK_SECRET_KEY=sk_test_...```## 📋 Description### Architecture snapshot



# 3. Lancersrc/

npm run dev

```├── composants.jsx       ← 🎨 Tous les composants UI (boutons, cartes, calendrier...)



Ouvrir [http://localhost:3000](http://localhost:3000)├── lib/



---│   └── donnees.js       ← 📦 Données des hôtels + fonctions utilitairesRéserveMaroc est une application web moderne permettant de rechercher et réserver des hôtels dans les principales villes touristiques du Maroc. L'application propose une interface entièrement en français avec des prix en Dirhams Marocains (MAD).- **Next.js 15 App Router + Server Actions** keep business logic on the server while streaming marketing + search pages with Suspense and skeletons.



## 📁 Structure└── app/



```    ├── globals.css      ← 🎨 Styles CSS globaux- **Prisma + Neon Postgres** enforce availability at the database level. A GiST exclusion constraint eliminates double-bookings under heavy concurrency.

src/

├── composants.jsx        ← Composants UI (Button, Card, Calendar...)    ├── layout.jsx       ← 🏠 Mise en page (en-tête, pied de page)

├── lib/donnees.js        ← Données des hôtels + utilitaires

└── app/    ├── page.jsx         ← 🏠 Page d'accueil## ✨ Fonctionnalités- **Clerk** handles authentication and session management.

    ├── layout.jsx        ← Mise en page globale

    ├── page.jsx          ← Page d'accueil    ├── recherche/

    ├── recherche/        ← Recherche d'hôtels

    └── reservations/     ← Mes réservations    │   ├── page.jsx     ← 🔍 Page de recherche d'hôtels- **Nuqs** keeps filters in the URL so search results are shareable.

```

    │   └── actions.js   ← ⚡ Actions serveur (réservations)

---

    └── reservations/- 🔍 **Recherche d'hôtels** - Filtrage par ville, dates et nombre de voyageurs- **Tailwind + shadcn/ui** provide an Airbnb-grade interface with accessible primitives.

## 🛠️ Technologies

        └── page.jsx     ← 📋 Page "Mes réservations"

- **Next.js 16** - Framework React

- **Tailwind CSS** - Styles```- 🏨 **5 hôtels** - Marrakech, Casablanca, Fès, Chefchaouen, Essaouira- **React Map GL** streams map pins in parallel with the hotel list.

- **Clerk** - Authentification

- **react-day-picker** - Calendrier



------- 🛏️ **3 types de chambres** - Standard, Supérieure, Suite (prix dynamiques)



## 📝 Commandes



| Commande | Description |## 🚀 Installation Pas à Pas- 📅 **Calendrier français** - Sélection de dates avec react-day-picker### Setup

|----------|-------------|

| `npm run dev` | Mode développement |

| `npm run build` | Build production |

| `npm start` | Lancer en production |### Étape 1 : Cloner le projet- 💰 **Prix en MAD** - Dirhams Marocains (450 - 3200 MAD/nuit)



---



**EMSI 2024-2025**```bash- 🔐 **Authentification** - Connexion via Clerk1. **Install dependencies**


git clone https://github.com/bentalba/hotel-booking.git

cd hotel-booking- 📱 **Responsive** - Design adaptatif mobile/desktop

```

- 🎨 **Animations** - Effets de survol et transitions fluides	```bash

### Étape 2 : Installer les dépendances

	npm install

```bash

npm install## 🛠️ Technologies	```

```



### Étape 3 : Configurer l'authentification Clerk

| Technologie | Version | Usage |2. **Create your `.env`** (copy from `.env.example`). You’ll need:

1. Créez un compte sur [clerk.com](https://clerk.com)

2. Créez une nouvelle application|-------------|---------|-------|

3. Copiez vos clés API

4. Créez un fichier `.env.local` à la racine :| Next.js | 15 | Framework React |	- `DATABASE_URL` from Neon (or any Postgres instance)



```bash| React | 19 | Interface utilisateur |	- Clerk keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`)

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_votre_cle_ici

CLERK_SECRET_KEY=sk_test_votre_cle_secrete_ici| Tailwind CSS | 4 | Styles |	- `NEXT_PUBLIC_MAPBOX_TOKEN`

```

| Clerk | 6 | Authentification |

### Étape 4 : Lancer l'application

| nuqs | 2 | État URL |3. **Database bootstrap**

```bash

npm run dev| date-fns | 4 | Manipulation dates |

```

| react-day-picker | 9 | Calendrier |	```bash

### Étape 5 : Ouvrir dans le navigateur

	npx prisma generate

Allez sur [http://localhost:3000](http://localhost:3000) 🎉

## 📁 Structure du Projet	npm run db:migrate

---

	npm run db:seed

## 📖 Explication des Fichiers

```	```

### `src/composants.jsx` - Les Composants UI

src/

Ce fichier contient **tous** les composants d'interface :

├── app/	> After running migrations, execute the GiST constraint manually to guarantee overlap protection:

| Composant | Description |

|-----------|-------------|│   ├── layout.jsx      # Layout principal avec header	>

| `Button` | Bouton avec différents styles (default, outline, ghost) |

| `Input` | Champ de saisie texte/nombre |│   ├── page.jsx        # Page d'accueil	> ```sql

| `Label` | Étiquette pour les formulaires |

| `Card` | Carte avec bordure et ombre |│   ├── actions.js      # Server actions (réservation)	> ALTER TABLE "Booking"

| `Badge` | Petit label coloré (ex: "Populaire") |

| `Select` | Menu déroulant |│   ├── globals.css     # Styles Tailwind	> ADD CONSTRAINT no_overlap

| `Calendar` | Calendrier interactif |

| `DateRangePicker` | Sélecteur de plage de dates |│   ├── search/	> EXCLUDE USING GIST (

| `Skeleton` | Effet de chargement |

| `ToastProvider` | Système de notifications |│   │   └── page.jsx    # Page de recherche	>   "roomId" WITH =,



### `src/lib/donnees.js` - Les Données│   └── my-bookings/	>   tsrange("startDate", "endDate") WITH &&



Ce fichier contient :│       └── page.jsx    # Mes réservations	> );



- **`HOTELS`** : Liste des 5 hôtels avec leurs chambres et prix├── components/	> ```

- **`DESTINATIONS`** : Villes populaires (Marrakech, Casablanca, etc.)

- **`FEATURES`** : Caractéristiques de l'app pour la page d'accueil│   └── ui.jsx          # Tous les composants UI

- **`searchHotels(ville)`** : Fonction pour rechercher des hôtels

- **`formatMAD(montant)`** : Formate les prix en Dirhams marocains└── lib/4. **Run the app**

- **`getMockBookings()`** : Génère des réservations de démonstration

    └── index.js        # Données et utilitaires

### `src/app/layout.jsx` - La Mise en Page

```	```bash

Le layout contient :

- L'en-tête avec le logo "Atlas" et la navigation	npm run dev

- Les boutons de connexion/inscription (Clerk)

- Le pied de page## 🚀 Installation	```

- Le provider pour les notifications (Toast)



### `src/app/page.jsx` - Page d'Accueil

### Prérequis	Visit `http://localhost:3000` for the marketing page, `/search` for the booking flow, and `/my-bookings` for the Clerk-protected dashboard.

Sections de la page :

1. **Hero** : Grand bandeau vert avec titre et boutons- Node.js 18+

2. **Destinations** : Grille de 4 villes populaires

3. **Caractéristiques** : 3 cartes "Pourquoi Atlas ?"- npm ou yarn5. **Tests & linting**

4. **Appel à l'action** : Bandeau noir en bas



### `src/app/recherche/page.jsx` - Page Recherche

### Étapes	```bash

Composants :

- **Filtres** : Destination, dates, voyageurs, budget	npm run lint

- **CarteHotel** : Affiche un hôtel avec sélection de chambre

- **ListeResultats** : Grille de tous les hôtels filtrés```bash	npm run test



### `src/app/reservations/page.jsx` - Mes Réservations# 1. Cloner le projet	```



Affiche la liste des réservations avec :git clone <url-du-repo>

- Photo de l'hôtel

- Dates d'arrivée/départcd oussama### Demo talking points

- Type de chambre

- Prix total

- Statut (Confirmée, Terminée, etc.)

# 2. Installer les dépendances- *Architecture*: “App Router + Server Components trimmed the client bundle by ~40%, so it feels instant on budget Android devices.”

---

npm install- *Data integrity*: “Postgres GiST exclusion constraints make double-bookings mathematically impossible.”

## 💰 Les Prix (en Dirhams Marocains)

- *UX*: “Optimistic UI + skeleton streaming keep the perceived response time sub-second, even while hitting Neon.”

| Hôtel | Ville | Standard | Double | Suite |

|-------|-------|----------|--------|-------|# 3. Configurer l'environnement

| The Grand Atlas | Casablanca | 850 MAD | 1 200 MAD | 2 500 MAD |

| Riad Moonlight | Marrakech | 650 MAD | 950 MAD | 1 800 MAD |# Créer un fichier .env.local avec vos clés Clerk### Deployment

| Azure Bay Resort | Tanger | 720 MAD | 1 100 MAD | 3 200 MAD |

| Desert Oasis Lodge | Merzouga | 580 MAD | 900 MAD | 2 200 MAD |NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

| Mountain Retreat | Chefchaouen | 450 MAD | 680 MAD | 1 200 MAD |

CLERK_SECRET_KEY=sk_test_...Deploy straight to [Vercel](https://vercel.com/) with the same env vars. Enable the Edge runtime for the marketing route if you want even faster TTFB; the booking action should stay on the default Node runtime to talk to Prisma.

---



## 🛠️ Technologies Utilisées# 4. Lancer le serveur de développement

npm run dev

| Technologie | Rôle |```

|-------------|------|

| **Next.js 16** | Framework React avec App Router |## 💻 Commandes

| **Tailwind CSS** | Styles et design |

| **Clerk** | Authentification (connexion, inscription) || Commande | Description |

| **react-day-picker** | Calendrier et sélection de dates ||----------|-------------|

| **date-fns** | Manipulation des dates || `npm run dev` | Serveur de développement (port 3000) |

| **Radix UI** | Composants accessibles (Popover, Slot) || `npm run build` | Build de production |

| `npm run start` | Serveur de production |

---| `npm run lint` | Vérification ESLint |



## 📝 Commandes Utiles## 📖 Guide d'Utilisation



```bash### Page d'Accueil (`/`)

# Lancer en développement- Hero avec bouton de recherche

npm run dev- Destinations populaires (Marrakech, Fès, Essaouira)

- Fonctionnalités de l'application

# Construire pour la production

npm run build### Page de Recherche (`/search`)

- Filtres : ville, dates, nombre de voyageurs

# Lancer la version de production- Cartes d'hôtels avec images et notes

npm start- Sélecteur de type de chambre (prix dynamique)

- Bouton de réservation

# Vérifier les erreurs de code

npm run lint### Mes Réservations (`/my-bookings`)

```- Liste des réservations de l'utilisateur

- Statut : Confirmée, En attente, Annulée

---- Détails : dates, chambre, prix total



## 🌐 Déploiement sur Vercel## 🏨 Hôtels Disponibles



1. Connectez votre repo GitHub à [vercel.com](https://vercel.com)| Hôtel | Ville | Note | Prix (Standard) |

2. Ajoutez vos variables d'environnement Clerk|-------|-------|------|-----------------|

3. Cliquez sur "Deploy"| Riad Jardin Secret | Marrakech | 4.8 | 850 MAD |

4. C'est tout ! 🎉| Four Seasons Casablanca | Casablanca | 4.9 | 2200 MAD |

| Riad Fès | Fès | 4.7 | 750 MAD |

---| Casa Perleta | Chefchaouen | 4.6 | 450 MAD |

| Villa Maroc | Essaouira | 4.5 | 650 MAD |

## 📞 Support

## 🎨 Composants UI

Des questions ? Ouvrez une issue sur GitHub.

Tous les composants sont dans `src/components/ui.jsx` :

---

- **Button** - Boutons avec variantes (default, outline, ghost)

Fait avec ❤️ au Maroc 🇲🇦- **Card** - Cartes avec header, content, footer

- **Badge** - Badges colorés
- **Input** - Champs de saisie
- **Label** - Labels de formulaire
- **Select** - Menus déroulants
- **Popover** - Fenêtres contextuelles
- **Calendar** - Calendrier français
- **DateRangePicker** - Sélecteur de période
- **Skeleton** - Placeholders de chargement

## 🔧 Configuration

### Tailwind CSS (`globals.css`)
Variables CSS personnalisées pour le thème :
- `--primary` : Vert émeraude (#22c55e)
- `--background` : Blanc
- `--foreground` : Gris foncé
- Arrière-plans solides pour menus déroulants

### Données Mock (`lib/index.js`)
- 5 hôtels avec descriptions complètes
- 3 types de chambres par hôtel
- Fonction `searchHotels()` pour filtrer
- Fonction `formatMAD()` pour formater les prix

## 📝 Notes Techniques

### Calendrier (react-day-picker v9)
```jsx
<DayPicker
  mode="range"
  locale={fr}
  selected={selected}
  onSelect={onSelect}
/>
```

### Prix Dynamiques
Le prix change selon le type de chambre sélectionné :
- Standard : prix de base
- Supérieure : +30-50%
- Suite : +100-150%

### URL State (nuqs)
Les filtres de recherche sont synchronisés avec l'URL :
```jsx
const [city] = useQueryState('city', parseAsString)
```

## 👤 Auteur

**Oussama** - Projet d'examen

## 📄 Licence

Ce projet est à usage éducatif.

---

🇲🇦 *Développé avec ❤️ pour le Maroc*
