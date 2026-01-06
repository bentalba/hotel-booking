# 🏨 Hotel Booking Workspace

Primary focus: **Java console application** for hotel reservation management (NetBeans/Maven friendly) with optional MySQL persistence. A legacy Next.js scaffold remains in `src/` for reference; the Java module is the supported deliverable.

## Project Structure

- `java/` – Java console app (menu-based) with in-memory demo data (80 rooms) and optional MySQL DAO.
  - `pom.xml` – Maven config (JDK 17, MySQL driver runtime, exec plugin for `hotel.Main`).
  - `run-windows.bat` – One-command launcher on Windows.
  - `sql/hotel.sql` – Schema for optional MySQL tests.
  - `README.md` – Full Java usage notes.
- `src/, prisma/, scripts/` – Legacy Next.js/Prisma scaffold (not required to run the Java app).
- `.github/` – Copilot instructions.

## Quick Start (Java app)

### Windows (1 command)
```powershell
cd java
.\run-windows.bat
```

### macOS / Linux
```bash
cd java
mvn -DskipTests exec:java
```

> If Maven is missing, install it or use your IDE’s Maven runner. JDK 17 required.

## Optional: MySQL Persistence
- Configure credentials in `java/src/hotel/HotelDAO.java`.
- Create schema: `mysql -u <user> -p < sql/hotel/sql`.
- Use the console menu option “Connexion MySQL (Test)” to validate connectivity.

## Notes
- The working tree is clean on `main`; Java remains the supported path for compilation and grading.
- Legacy Next.js assets are left untouched but are not part of the required runtime.<div align="center"># 🏨 Système de Gestion Hôtelière - EMSI# 🏨 Systeme de Gestion Hotel# 🏨 Atlas — Réservation d’hôtels (Maroc)



# 🏨 Hotel Reservation System



### Système de Gestion de Réservations Hôtelières![Node.js](https://img.shields.io/badge/Node.js-18+-green)



[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)![Express.js](https://img.shields.io/badge/Express.js-4.18-blue)

[![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com/)![Sequelize](https://img.shields.io/badge/Sequelize-6.35-orange)**Projet EMSI - Prepare par OUSSAMA SAJJI****Projet d’examen EMSI**  

[![Sequelize](https://img.shields.io/badge/Sequelize-6.35-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)

[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)



---**Auteur : OUSSAMA SAJJI**



**Une application complète de gestion hôtelière avec API REST, documentation Swagger, et interface CLI interactive.****Projet de Gestion de Réservations Hôtelières**  



*Développé par* ***Oussama SAJJI*** *-* ***EMSI***Préparé par **Oussama SAJJI** - EMSI---



[📚 Documentation](#-documentation-api) • [🚀 Installation](#-installation-rapide) • [💻 CLI Menu](#-menu-interactif-cli) • [🔧 Configuration](#-configuration)



------## 📝 Description (très courte)



</div>



## 📋 Table des Matières## 📋 Table des Matières## 📝 Description



- [✨ Fonctionnalités](#-fonctionnalités)

- [🏗️ Architecture](#️-architecture)

- [🚀 Installation Rapide](#-installation-rapide)- [Description](#-description)Atlas est une mini-application web de réservation d’hôtels au Maroc :

- [🔧 Configuration](#-configuration)

- [💻 Menu Interactif CLI](#-menu-interactif-cli)- [Architecture](#-architecture)

- [📚 Documentation API](#-documentation-api)

- [📊 Modèles de Données](#-modèles-de-données)- [Fonctionnalités](#-fonctionnalités)Application de gestion d'un hotel de 80 chambres avec :- recherche d’hôtels par ville

- [🔄 Workflow des Réservations](#-workflow-des-réservations)

- [☕ Version Java](#-version-java)- [Prérequis](#-prérequis)

- [🤝 Contribution](#-contribution)

- [Installation](#-installation)- Gestion des clients- sélection d’une chambre + dates

---

- [Configuration](#-configuration)

## ✨ Fonctionnalités

- [Démarrage](#-démarrage)- Gestion des chambres  - affichage du prix en **MAD**

<table>

<tr>- [API Documentation](#-api-documentation)

<td width="50%">

- [Structure du Projet](#-structure-du-projet)- Gestion des reservations (creation, modification, validation, annulation)- page “Mes réservations” (données de démonstration)

### 👥 Gestion des Clients

- ➕ Création de clients- [Base de Données](#-base-de-données)

- 📋 Liste et recherche

- ✏️ Modification des informations- Interface web moderne (Next.js)

- 🗑️ Suppression sécurisée

---

</td>

<td width="50%">- Programme console interactif avec menu## 🛠️ Comment c’est construit (simple)



### 🛏️ Gestion des Chambres## 📝 Description

- 🏠 Maximum 80 chambres

- 📞 Attribution téléphone

- ✅ Vérification disponibilité

- 📅 Recherche par périodeCe système permet la gestion complète d'un hôtel incluant :



</td>- **Gestion des clients** (CRUD complet)---- **Next.js 16 (App Router)** + **React 19** pour le front.

</tr>

<tr>- **Gestion des chambres** (80 chambres sur 8 étages)

<td width="50%">

- **Gestion des réservations** (création, validation, annulation, clôture)- **Tailwind CSS** pour le style minimal.

### 📅 Gestion des Réservations

- 🔑 Code unique automatique- **Vérification de disponibilité** automatique

- 🔄 États: Pending → Validated → Closed

- ➕ Ajout/Retrait de chambres- **Tâches automatiques** (cron jobs pour clôture automatique)## 🏗️ Architecture du Systeme- **Clerk** pour l’authentification (localisation FR).

- ⏰ Auto-clôture des réservations expirées



</td>

<td width="50%">---- **react-day-picker** + **date-fns** pour les dates.



### 📊 Dashboard & Statistiques

- 📈 Vue d'ensemble du système

- 📉 Répartition par état## 🏗 Architecture```- Turbopack activé pour des démarrages rapides en dev.

- 🏆 Statistiques en temps réel

- 📋 Rapports détaillés



</td>```┌─────────────────────────────────────────────────────────────────────────────┐

</tr>

</table>┌─────────────────────────────────────────────────────────────────┐



---│                         CLIENT                                  ││                        SYSTEME DE GESTION HOTEL                             │## ✅ Démarrage “1 clic” (zéro setup manuel)



## 🏗️ Architecture│                    (Navigateur / CLI)                           │



```└─────────────────────────────────────────────────────────────────┘│                        Projet EMSI - Oussama SAJJI                          │

hotel-reservation-system/

├── 📁 src/                              │

│   ├── 📁 config/          # Configuration DB & Swagger

│   │   ├── database.js     # Sequelize + MySQL                              ▼└─────────────────────────────────────────────────────────────────────────────┘Après avoir cloné le projet, tu as **une seule action** à faire.

│   │   └── swagger.js      # OpenAPI 3.0

│   ├── 📁 models/          # Modèles Sequelize┌─────────────────────────────────────────────────────────────────┐

│   │   ├── Client.js

│   │   ├── Chambre.js│                      API LAYER (Express.js)                     │                                    │

│   │   ├── Reservation.js

│   │   └── ReservationChambre.js│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐    │

│   ├── 📁 services/        # Logique métier

│   │   ├── ClientService.js│  │ /api/clients │  │ /api/chambres│  │ /api/reservations  │    │          ┌─────────────────────────┼─────────────────────────┐### Option A (recommandée) : une commande

│   │   ├── ChambreService.js

│   │   └── ReservationService.js│  └──────────────┘  └──────────────┘  └────────────────────┘    │

│   ├── 📁 controllers/     # Handlers HTTP

│   │   ├── ClientController.js└─────────────────────────────────────────────────────────────────┘          │                         │                         │

│   │   ├── ChambreController.js

│   │   └── ReservationController.js                              │

│   ├── 📁 routes/          # Routes Express

│   │   └── api.js                              ▼          ▼                         ▼                         ▼```bash

│   ├── 📁 scripts/         # Utilitaires

│   │   ├── databaseSetup.js   # 🆕 Setup interactif┌─────────────────────────────────────────────────────────────────┐

│   │   ├── syncDatabase.js

│   │   └── seedDatabase.js│                    SERVICE LAYER (Business Logic)               │┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐npm run demarrer

│   ├── 📁 cli/             # Interface console

│   │   ├── menu.js│  ┌───────────────┐  ┌───────────────┐  ┌───────────────────┐   │

│   │   └── menu-enhanced.js   # 🆕 Version améliorée

│   └── index.js            # Point d'entrée│  │ ClientService │  │ChambreService │  │ReservationService │   ││   INTERFACE     │     │    INTERFACE        │     │   BASE DE       │```

├── 📁 java/                # Version Java POO

├── 📄 .env                 # Variables d'environnement│  └───────────────┘  └───────────────┘  └───────────────────┘   │

├── 📄 package.json

└── 📄 README.md│                                              ▲                   ││   WEB           │     │    CONSOLE          │     │   DONNEES       │

```

│                           THE ENGINE ────────┘                   │

### 🔄 Architecture en Couches

│           (Availability Check, Room Limits, Duration Calc)       ││   (Next.js)     │     │    (menu.js)        │     │   (MySQL)       │Ce script fait automatiquement :

```

┌─────────────────────────────────────────────────────────────┐└─────────────────────────────────────────────────────────────────┘

│                     🌐 CLIENT (Browser/CLI)                  │

└────────────────────────────┬────────────────────────────────┘                              │└────────┬────────┘     └──────────┬──────────┘     └────────┬────────┘- installation des dépendances (`npm install`) si besoin

                             │

┌────────────────────────────▼────────────────────────────────┐                              ▼

│                   📡 API REST (Express.js)                   │

│                    Port: 3000                                │┌─────────────────────────────────────────────────────────────────┐         │                         │                         │- création de `.env.local` depuis `.env.example` si le fichier n’existe pas

├─────────────────────────────────────────────────────────────┤

│  GET  /api/v1/clients      │  POST /api/v1/reservations     ││                  DATA ACCESS LAYER (Sequelize ORM)              │

│  GET  /api/v1/chambres     │  PUT  /api/v1/reservations/:id │

│  GET  /api/v1/reservations │  GET  /api-docs                ││  ┌────────┐  ┌─────────┐  ┌─────────────┐  ┌─────────────────┐ │         └─────────────────────────┼─────────────────────────┘- lancement de l’app (`npm run dev`)

└────────────────────────────┬────────────────────────────────┘

                             ││  │ Client │  │ Chambre │  │ Reservation │  │ReservationChambre│ │

┌────────────────────────────▼────────────────────────────────┐

│                 🎯 CONTROLLERS (HTTP Handlers)               ││  └────────┘  └─────────┘  └─────────────┘  └─────────────────┘ │                                   │

│    ClientController │ ChambreController │ ReservationCtrl    │

└────────────────────────────┬────────────────────────────────┘└─────────────────────────────────────────────────────────────────┘

                             │

┌────────────────────────────▼────────────────────────────────┐                              │                                   ▼Ouvre ensuite : http://localhost:3000

│                  💼 SERVICES (Business Logic)                │

│     ClientService │ ChambreService │ ReservationService      │                              ▼

└────────────────────────────┬────────────────────────────────┘

                             │┌─────────────────────────────────────────────────────────────────┐                    ┌──────────────────────────────┐

┌────────────────────────────▼────────────────────────────────┐

│                   📊 MODELS (Sequelize ORM)                  ││                         MySQL Database                          │

│       Client │ Chambre │ Reservation │ ReservationChambre    │

└────────────────────────────┬────────────────────────────────┘│                    (hotel_reservation)                          │                    │      CLASSES METIER          │### Option Windows : un seul clic sur PowerShell

                             │

┌────────────────────────────▼────────────────────────────────┐└─────────────────────────────────────────────────────────────────┘

│                      🗄️ MySQL Database                       │

│                   hotel_reservation                          │```                    │  (src/lib/classes/)          │

└─────────────────────────────────────────────────────────────┘

```



------                    ├──────────────────────────────┤Sur Windows, double-clique sur `Demarrer.bat` (ça appelle PowerShell avec les bons paramètres) ou fais **clic droit → Exécuter avec PowerShell** sur `Demarrer.ps1`.



## 🚀 Installation Rapide



### Prérequis## ✨ Fonctionnalités                    │  • Client.js                 │Le script vérifie Node, télécharge les dépendances (`npm install`) si besoin, crée `.env.local`, tente d’initialiser la base MySQL (Prisma generate + db push + seed) si `DATABASE_URL` pointe sur MySQL, puis lance `npm run dev`. Si MySQL n’est pas accessible, un avertissement s’affiche mais le serveur démarre quand même (mode mock possible).



- **Node.js** >= 18.0.0

- **MySQL** >= 8.0

- **npm** ou **yarn**### Gestion des Clients                    │  • Chambre.js                │



### 📦 Installation- ✅ Créer, modifier, supprimer des clients



```bash- ✅ Rechercher par nom                    │  • Reservation.js            │Si Windows bloque encore l’exécution des scripts, ouvre PowerShell dans le dossier et lance :

# 1. Cloner le repository

git clone https://github.com/oussama-sajji/hotel-reservation-system.git- ✅ Vérifier les réservations actives avant suppression

cd hotel-reservation-system

                    │  • GestionReservations.js    │

# 2. Installer les dépendances

npm install### Gestion des Chambres



# 3. Configurer la base de données (interactif)- ✅ 80 chambres sur 8 étages (101-810)                    └──────────────────────────────┘```powershell

npm run db:setup

- ✅ Vérification des doublons

# 4. Démarrer le serveur

npm start- ✅ Numéro unique par chambre                                   │powershell -NoProfile -ExecutionPolicy Bypass -File ".\Demarrer.ps1"

```



### 🖱️ Démarrage en 1 Clic

### Gestion des Réservations                    ┌──────────────┴──────────────┐```

| Système | Fichier | Action |

|---------|---------|--------|- ✅ **Availability Check** : Vérification automatique de disponibilité

| 🪟 Windows | `Demarrer.bat` | Double-cliquer |

| 🪟 Windows (PowerShell) | `Demarrer.ps1` | Clic droit → Exécuter |- ✅ **Room Limit (80 max)** : Limite de chambres par réservation                    │                             │

| 🍎 macOS | `Demarrer.command` | Double-cliquer |

- ✅ **Duration Calculator** : Calcul automatique de la durée

---

- ✅ **State Management** : Pending → Validated → Closed / Canceled                    ▼                             ▼Cela contourne la restriction uniquement pour cette session.

## 🔧 Configuration

- ✅ **Transactions atomiques** pour l'intégrité des données

### Variables d'Environnement (`.env`)

         ┌─────────────────┐           ┌─────────────────┐

```env

# 🗄️ Base de données MySQL### Tâches Automatiques (Cron Jobs)

DB_HOST=localhost

DB_PORT=3306- ⏰ Clôture automatique des réservations expirées (minuit)         │  Prisma ORM     │           │  Service Hotel  │Alternative (si tu préfères une commande) :

DB_NAME=hotel_reservation

DB_USER=root- ⏰ Annulation des réservations en attente expirées (toutes les heures)

DB_PASSWORD=

- ⏰ Rapport quotidien (8h00)         │  (schema.prisma)│           │  (hotelService) │

# 🌐 Serveur

PORT=3000

NODE_ENV=development

```---         └────────┬────────┘           └─────────────────┘```bash



### 📜 Scripts NPM Disponibles



| Commande | Description |## 📋 Prérequis                  │npm run demarrer:win

|----------|-------------|

| `npm start` | 🚀 Démarrer le serveur API |

| `npm run dev` | 🔄 Mode développement (hot-reload) |

| `npm run menu` | 💻 Lancer le menu CLI |- **Node.js** >= 18.0.0                  ▼```

| `npm run menu:enhanced` | ✨ Menu CLI version améliorée |

| `npm run db:setup` | 🔧 Configuration interactive DB |- **MySQL** >= 5.7 (via XAMPP, WAMP, ou MySQL Server)

| `npm run db:sync` | 🔄 Synchroniser les tables |

| `npm run db:seed` | 🌱 Insérer données de test |- **npm** ou **yarn**         ┌─────────────────┐

| `npm run db:reset` | 🗑️ Réinitialiser la base |



---

---         │     MySQL       │### Option B (macOS) : double-clic

## 💻 Menu Interactif CLI



Lancez le menu interactif avec:

## 🚀 Installation         │   (DATABASE)    │

```bash

npm run menu:enhanced

```

### Windows (1-Click)         └─────────────────┘Double-clique sur `Demarrer.command`.

### 🖥️ Aperçu



```

██╗  ██╗ ██████╗ ████████╗███████╗██╗         ███████╗███╗   ███╗███████╗██╗1. Double-cliquez sur `Demarrer.bat` ou `Demarrer.ps1````

██║  ██║██╔═══██╗╚══██╔══╝██╔════╝██║         ██╔════╝████╗ ████║██╔════╝██║

███████║██║   ██║   ██║   █████╗  ██║         █████╗  ██╔████╔██║███████╗██║2. Le script installera automatiquement les dépendances

██╔══██║██║   ██║   ██║   ██╔══╝  ██║         ██╔══╝  ██║╚██╔╝██║╚════██║██║

██║  ██║╚██████╔╝   ██║   ███████╗███████╗    ███████╗██║ ╚═╝ ██║███████║██║3. Suivez le menu interactif> macOS peut demander l’autorisation d’exécuter le fichier la première fois.

╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝    ╚══════╝╚═╝     ╚═╝╚══════╝╚═╝



═══════════════════════════════════════════════════════════════════════════════

    ⭐ Système de Gestion de Réservations Hôtelières ⭐### Manuel---

    ✨ Développé par: Oussama SAJJI - EMSI ✨

═══════════════════════════════════════════════════════════════════════════════



  📊 Aperçu Rapide:```bash## 🔑 Variables d’environnement



      👥 Clients:      12# Cloner le projet

      🏠 Chambres:     80

      📆 Réservations: 25git clone <url-du-repo>## 📁 Structure des Fichiers

      ⏳ En attente:   3

cd oussama

⭐ Menu Principal - Que souhaitez-vous faire?

  ❯ 👥  Gestion des Clients       → CRUD completLe projet crée automatiquement `.env.local` à partir de `.env.example`.

    🛏️  Gestion des Chambres     → 80 chambres max

    📅  Gestion des Réservations → Workflow complet# Installer les dépendances

    📊  Dashboard & Statistiques → Vue d'ensemble

    ──────────────────────────────────────────────────npm install```

    🚪  Quitter

```



---# Copier le fichier de configurationhotel-booking/Pour activer l’authentification (Clerk) et la carte (Mapbox), remplace les valeurs dans `.env.local`.



## 📚 Documentation APIcp .env.example .env



### 🌐 Swagger UI│



Accédez à la documentation interactive:# Modifier .env avec vos paramètres MySQL



``````├── 📄 menu.js                    # Programme principal avec menu console## 🗄️ Base de données SQL (MySQL)

http://localhost:3000/api-docs

```



### 📍 Endpoints Principaux---├── 📄 package.json               # Dependances du projet



#### 👥 Clients `/api/v1/clients`



| Méthode | Endpoint | Description |## ⚙️ Configuration├── 📄 README.md                  # Ce fichier- Dans `.env.local`, configure :

|---------|----------|-------------|

| `GET` | `/clients` | Liste tous les clients |

| `POST` | `/clients` | Créer un client |

| `GET` | `/clients/:id` | Obtenir un client |Modifiez le fichier `.env` :│    - `DATABASE_URL="mysql://user:password@localhost:3306/hotel_db"`

| `PUT` | `/clients/:id` | Modifier un client |

| `DELETE` | `/clients/:id` | Supprimer un client |

| `GET` | `/clients/search/:nom` | Rechercher par nom |

```env├── 📁 prisma/- Assure-toi que MySQL tourne et que la base existe.

#### 🛏️ Chambres `/api/v1/chambres`

# Configuration MySQL

| Méthode | Endpoint | Description |

|---------|----------|-------------|DB_HOST=localhost│   ├── schema.prisma             # Schema de la base de donnees MySQL- Initialisation :

| `GET` | `/chambres` | Liste toutes les chambres |

| `POST` | `/chambres` | Créer une chambre |DB_PORT=3306

| `GET` | `/chambres/:id` | Obtenir une chambre |

| `DELETE` | `/chambres/:id` | Supprimer une chambre |DB_USER=root│   └── seed.js                   # Donnees initiales (clients, chambres)    ```bash

| `GET` | `/chambres/available/:debut/:fin` | Chambres disponibles |

DB_PASSWORD=

#### 📅 Réservations `/api/v1/reservations`

DB_NAME=hotel_reservation│    npx prisma generate

| Méthode | Endpoint | Description |

|---------|----------|-------------|

| `GET` | `/reservations` | Liste les réservations |

| `POST` | `/reservations` | Créer une réservation |# Configuration Serveur├── 📁 src/    npx prisma db push

| `GET` | `/reservations/:id` | Détails réservation |

| `PUT` | `/reservations/:id/validate` | Valider |PORT=3000

| `PUT` | `/reservations/:id/cancel` | Annuler |

| `PUT` | `/reservations/:id/close` | Clôturer |NODE_ENV=development│   ├── 📁 lib/    node prisma/seed.js

| `POST` | `/reservations/:id/chambres/:chambreId` | Ajouter chambre |

| `DELETE` | `/reservations/:id/chambres/:chambreId` | Retirer chambre |```

| `GET` | `/reservations/dashboard/stats` | Statistiques |

│   │   ├── 📁 classes/           # CLASSES METIER    ```

---

### Créer la base de données MySQL

## 📊 Modèles de Données

│   │   │   ├── Client.js         # Classe Client- Les scripts 1-clic tenteront aussi `db push` + `seed` ; en cas d’échec (MySQL down ou credentials), un avertissement est affiché mais le serveur démarre (données mock toujours possibles).

### Client

```javascript```sql

{

  id: INTEGER (PK, Auto),CREATE DATABASE IF NOT EXISTS hotel_reservation;│   │   │   ├── Chambre.js        # Classe Chambre

  nom: STRING(100) NOT NULL,

  prenom: STRING(100) NOT NULL,```

  adresse: STRING(255)

}│   │   │   ├── Reservation.js    # Classe Reservation## 📁 Structure (minimum de fichiers)

```

---

### Chambre

```javascript│   │   │   ├── GestionReservations.js  # Gestion tableau reservations

{

  id: INTEGER (PK, Auto),## ▶️ Démarrage

  numero_chambre: STRING(10) UNIQUE NOT NULL,

  telephone: STRING(20)│   │   │   └── index.js          # Export des classes```

}

```### Serveur API



### Reservation│   │   │src/

```javascript

{```bash

  id: INTEGER (PK, Auto),

  code: STRING(20) UNIQUE,  // Auto-généré: RES-XXXXXX# Développement (avec hot reload)│   │   ├── hotelService.js       # Service de connexion MySQL/Prisma├── composants.jsx         (UI : boutons, cards, calendrier, toast…)

  clientId: INTEGER (FK → Client),

  dateDebut: DATE NOT NULL,npm run dev

  dateFin: DATE NOT NULL,

  etat: ENUM('Pending', 'Validated', 'Canceled', 'Closed')│   │   └── donnees.js            # Donnees mock pour l'interface web├── lib/donnees.js         (données mock + utilitaires)

}

```# Production



---npm start│   │├── lib/hotelService.js    (logique Métier + Prisma MySQL)



## 🔄 Workflow des Réservations```



```│   └── 📁 app/                   # Pages Next.js (interface web)└── app/

  ┌─────────────┐

  │   CRÉATION  │Le serveur démarre sur `http://localhost:3000`

  │   (Code     │

  │   généré)   ││       ├── page.jsx              # Page d'accueil    ├── layout.jsx         (mise en page)

  └──────┬──────┘

         │### Menu Console (CLI)

         ▼

  ┌─────────────┐     ┌─────────────┐│       ├── layout.jsx            # Layout principal    ├── providers.jsx      (providers client : Toast)

  │   PENDING   │────▶│  CANCELED   │

  │  (En attente)│     │  (Annulée)  │```bash

  └──────┬──────┘     └─────────────┘

         │npm run cli│       ├── 📁 recherche/         # Page de recherche    ├── page.jsx           (accueil)

         ▼

  ┌─────────────┐```

  │  VALIDATED  │

  │  (Validée)  ││       └── 📁 reservations/      # Page des reservations    ├── recherche/         (recherche + actions serveur)

  └──────┬──────┘

         │### Scripts de Base de Données

         ▼

  ┌─────────────┐│    └── reservations/      (mes réservations + actions Prisma)

  │   CLOSED    │

  │  (Clôturée) │```bash

  └─────────────┘

```# Synchroniser les tables├── 📁 scripts/```



### ⚙️ Règles Métiernpm run db:sync



1. **Création** → État automatique: `Pending`│   └── demarrer.js               # Script de demarrage automatique

2. **Code** → Généré automatiquement: `RES-XXXXXX`

3. **Validation** → Possible uniquement depuis `Pending`# Peupler avec des données de test

4. **Annulation** → Possible depuis `Pending` ou `Validated`

5. **Clôture** → Possible uniquement depuis `Validated`npm run db:seed│## 🧪 Commandes utiles

6. **Auto-clôture** → Tâche cron pour réservations expirées



---

# Réinitialiser (ATTENTION: supprime tout!)├── 📄 Demarrer.bat               # Lancement Windows (1 clic)

## ☕ Version Java

npm run db:reset

Une implémentation Java POO est également disponible dans le dossier `java/`:

```├── 📄 Demarrer.ps1               # Script PowerShell Windows```bash

```bash

cd java

# Ouvrir dans NetBeans ou IntelliJ IDEA

```### Tâches Automatiques└── 📄 Demarrer.command           # Lancement macOS (1 clic)npm run dev



Structure:

- `Personne.java` - Classe abstraite

- `Client.java` - Hérite de Personne```bash```npm run build

- `Chambre.java` - Gestion des chambres

- `Reservation.java` - Gestion des réservationsnpm run cron

- `GestionReservations.java` - Logique métier

- `HotelDAO.java` - Accès données (JDBC)```npm start

- `Main.java` - Point d'entrée



---

------npm run lint

## 🤝 Contribution



Les contributions sont les bienvenues! N'hésitez pas à:

## 📚 API Documentation```

1. 🍴 Fork le projet

2. 🔧 Créer une branche (`git checkout -b feature/AmazingFeature`)

3. 💾 Commit (`git commit -m 'Add AmazingFeature'`)

4. 📤 Push (`git push origin feature/AmazingFeature`)La documentation Swagger est disponible à :## 📊 Diagramme des Classes

5. 📫 Ouvrir une Pull Request



---

``````

<div align="center">

http://localhost:3000/api/docs┌─────────────────────────────────────────────────────────────────────────────┐

## 👨‍💻 Auteur

```│                           DIAGRAMME DE CLASSES                              │

**Oussama SAJJI**

└─────────────────────────────────────────────────────────────────────────────┘

[![GitHub](https://img.shields.io/badge/GitHub-oussama--sajji-181717?style=for-the-badge&logo=github)](https://github.com/oussama-sajji)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/oussama-sajji)### Endpoints Principaux



*EMSI - École Marocaine des Sciences de l'Ingénieur*┌─────────────────────────┐



---| Méthode | Endpoint | Description |│        CLIENT           │



### ⭐ Star ce projet si vous l'avez trouvé utile!|---------|----------|-------------|├─────────────────────────┤



Made with ❤️ in Morocco 🇲🇦| **CLIENTS** | | |│ - id: number            │



</div>| GET | `/api/clients` | Liste tous les clients |│ - nom: string           │


| POST | `/api/clients` | Créer un client |│ - prenom: string        │

| GET | `/api/clients/:id` | Obtenir un client |│ - adresse: string       │

| PUT | `/api/clients/:id` | Modifier un client |├─────────────────────────┤

| DELETE | `/api/clients/:id` | Supprimer un client |│ + saisir(donnees)       │

| GET | `/api/clients/search/:name` | Rechercher par nom |│ + afficher(): string    │

| **CHAMBRES** | | |│ + comparer(client): bool│

| GET | `/api/chambres` | Liste toutes les chambres |│ + toObject(): Object    │

| POST | `/api/chambres` | Créer une chambre |│ + fromObject(obj): Client│

| GET | `/api/chambres/:id` | Obtenir une chambre |└─────────────────────────┘

| DELETE | `/api/chambres/:id` | Supprimer une chambre |            │

| GET | `/api/chambres/available` | Chambres disponibles |            │ 1

| **RESERVATIONS** | | |            │

| GET | `/api/reservations` | Liste les réservations |            ▼ *

| POST | `/api/reservations` | Créer une réservation |┌─────────────────────────┐         ┌─────────────────────────┐

| GET | `/api/reservations/:id` | Obtenir une réservation |│      RESERVATION        │─────────│        CHAMBRE          │

| PUT | `/api/reservations/:id/validate` | Valider |├─────────────────────────┤    *  * ├─────────────────────────┤

| PUT | `/api/reservations/:id/cancel` | Annuler |│ - id: number            │         │ - id: number            │

| PUT | `/api/reservations/:id/close` | Clôturer |│ - code: string          │         │ - numero: string        │

| POST | `/api/reservations/:id/chambres` | Ajouter chambre |│ - client: Client        │         │ - telephone: string     │

| DELETE | `/api/reservations/:id/chambres/:chambreId` | Retirer chambre |│ - etat: string          │         ├─────────────────────────┤

| GET | `/api/reservations/:id/duration` | Calculer durée |│ - dateDebut: Date       │         │ + saisir(donnees)       │

| GET | `/api/reservations/stats/dashboard` | Statistiques |│ - dateFin: Date         │         │ + afficher(): string    │

│ - chambres: Chambre[]   │         │ + comparer(ch): boolean │

---├─────────────────────────┤         └─────────────────────────┘

│ + verifierChambreReservee(ch): bool                         │

## 📁 Structure du Projet│ + ajouterChambre(ch): {success, msg}                        │

│ + supprimerChambre(ch): {success, msg}                      │

```│ + afficher(): string                                        │

oussama/│ + calculerDuree(): number                                   │

├── 📂 src/│ + valider(): {success, msg}                                 │

│   ├── 📂 config/│ + annuler(): {success, msg}                                 │

│   │   ├── database.js      # Configuration Sequelize└─────────────────────────────────────────────────────────────┘

│   │   └── swagger.js       # Documentation API            │

│   ├── 📂 models/            │ *

│   │   ├── index.js         # Associations            ▼

│   │   ├── Client.js        # Modèle Client┌─────────────────────────────────────────────────────────────┐

│   │   ├── Chambre.js       # Modèle Chambre│               GESTION_RESERVATIONS                          │

│   │   ├── Reservation.js   # Modèle Reservation├─────────────────────────────────────────────────────────────┤

│   │   └── ReservationChambre.js│ - reservations: Reservation[]                               │

│   ├── 📂 services/├─────────────────────────────────────────────────────────────┤

│   │   ├── index.js         # Export services│ + clientAReservation(client): boolean                       │

│   │   ├── ClientService.js # Logique clients│ + reservationExiste(code): boolean                          │

│   │   ├── ChambreService.js # Logique chambres│ + trouverReservation(code): Reservation                     │

│   │   └── ReservationService.js # THE ENGINE│ + ajouterReservation(res): {success, msg}                   │

│   ├── 📂 controllers/│ + modifierChambreReservation(code, old, new): {success,msg} │

│   │   ├── index.js         # Export controllers│ + supprimerReservation(code): {success, msg}                │

│   │   ├── ClientController.js│ + afficherToutes(): string                                  │

│   │   ├── ChambreController.js│ + getReservationsAujourdhui(): Reservation[]                │

│   │   └── ReservationController.js│ + getReservationsExpirantAujourdhui(): Reservation[]        │

│   ├── 📂 routes/│ + annulerReservationsExpirees(): {count, reservations}      │

│   │   └── api.js           # Routes API│ + chambreDisponible(ch, debut, fin): boolean                │

│   ├── 📂 cli/└─────────────────────────────────────────────────────────────┘

│   │   └── menu.js          # Menu console```

│   ├── 📂 scripts/

│   │   ├── syncDatabase.js  # Sync tables---

│   │   ├── seedDatabase.js  # Données test

│   │   ├── resetDatabase.js # Reset DB## 🗄️ Schema Base de Donnees (MySQL)

│   │   └── cronJobs.js      # Tâches auto

│   └── index.js             # Point d'entrée```sql

├── 📂 java/                  # Version Java (POO)┌─────────────────────────────────────────────────────────────────────────────┐

├── .env                      # Configuration locale│                         SCHEMA BASE DE DONNEES                              │

├── .env.example              # Template config└─────────────────────────────────────────────────────────────────────────────┘

├── package.json              # Dépendances Node.js

├── Demarrer.bat              # Script Windows CMD    ┌───────────────┐         ┌───────────────────────┐         ┌───────────────┐

├── Demarrer.ps1              # Script PowerShell    │    CLIENT     │         │     RESERVATION       │         │    CHAMBRE    │

├── Demarrer.command          # Script macOS/Linux    ├───────────────┤         ├───────────────────────┤         ├───────────────┤

└── README.md                 # Cette documentation    │ PK id         │◄────────│ FK clientId           │         │ PK id         │

```    │    nom        │    1  * │ PK id                 │         │    numero     │

    │    prenom     │         │    code (unique)      │         │    telephone  │

---    │    adresse    │         │    etat               │         └───────┬───────┘

    │    createdAt  │         │    dateDebut          │                 │

## 🗄 Base de Données    │    updatedAt  │         │    dateFin            │                 │

    └───────────────┘         │    createdAt          │                 │

### Schéma                              │    updatedAt          │                 │

                              └───────────┬───────────┘                 │

```                                          │                             │

┌─────────────────┐      ┌──────────────────────┐      ┌─────────────────┐                                          │ 1                           │ 1

│     clients     │      │    reservations      │      │    chambres     │                                          │                             │

├─────────────────┤      ├──────────────────────┤      ├─────────────────┤                                          ▼ *                           ▼ *

│ id (PK)         │──┐   │ id (PK)              │   ┌──│ id (PK)         │                              ┌───────────────────────────────────────────┐

│ nom             │  │   │ client_id (FK)       │───┘  │ numero_chambre  │                              │         RESERVATION_CHAMBRE              │

│ prenom          │  └──▶│ date_debut           │      │ telephone       │                              │         (Table de liaison M:N)           │

│ adresse         │      │ date_fin             │      │ created_at      │                              ├───────────────────────────────────────────┤

│ created_at      │      │ etat                 │      │ updated_at      │                              │ PK,FK reservationId                       │

│ updated_at      │      │ nb_chambres          │      └─────────────────┘                              │ PK,FK chambreId                           │

└─────────────────┘      │ created_at           │              │                              └───────────────────────────────────────────┘

                         │ updated_at           │              │```

                         └──────────────────────┘              │

                                    │                          │---

                                    │      ┌───────────────────┴──────────┐

                                    │      │  reservation_chambres        │## ✅ Demarrage Rapide (1 clic)

                                    │      ├──────────────────────────────┤

                                    └─────▶│ reservation_id (FK)          │### Windows

                                           │ chambre_id (FK)              │Double-cliquez sur `Demarrer.bat` ou executez:

                                           │ created_at                   │```powershell

                                           └──────────────────────────────┘.\Demarrer.ps1

``````



### États des Réservations### macOS / Linux

Double-cliquez sur `Demarrer.command` ou executez:

| État | Description |```bash

|------|-------------|npm run demarrer

| `Pending` | En attente de validation |```

| `Validated` | Confirmée |

| `Canceled` | Annulée |### Programme Console (Menu)

| `Closed` | Terminée/Clôturée |Pour lancer le menu interactif en console:

```bash

---node menu.js

```

## 📝 Scripts NPM

---

| Commande | Description |

|----------|-------------|## 🔧 Installation Manuelle

| `npm start` | Démarrer en production |

| `npm run dev` | Démarrer en développement |1. **Cloner le projet**

| `npm run cli` | Lancer le menu console |```bash

| `npm run db:sync` | Synchroniser la DB |git clone https://github.com/bentalba/hotel-booking.git

| `npm run db:seed` | Peupler la DB |cd hotel-booking

| `npm run db:reset` | Réinitialiser la DB |```

| `npm run cron` | Lancer les cron jobs |

| `npm test` | Exécuter les tests |2. **Installer les dependances**

```bash

---npm install

```

## 👨‍💻 Auteur

3. **Configurer la base de donnees MySQL**

**Oussama SAJJI**  

Projet EMSI - Gestion HôtelièreCreer `.env.local` avec:

```env

---DATABASE_URL="mysql://user:password@localhost:3306/hotel_db"

```

## 📄 Licence

4. **Initialiser la base**

Ce projet est développé dans le cadre d'un projet académique EMSI.```bash

npx prisma generate
npx prisma db push
node prisma/seed.js
```

5. **Lancer l'application**
```bash
# Interface web
npm run dev

# Menu console
node menu.js
```

---

## 📋 Fonctionnalites Implementees

### Classes Client, Chambre (Question 1)
- ✅ Constructeur par defaut
- ✅ Methode d'affichage
- ✅ Methode de saisie
- ✅ Getters / Setters
- ✅ Methode comparer (par code/numero)

### Classe Reservation (Question 2)
- ✅ a) Verifier si une chambre est deja reservee
- ✅ b) Ajouter une chambre (limite max 5 + anti-doublon)
- ✅ c) Afficher une reservation (client + chambres)
- ✅ d) Calculer la duree d'une reservation
- ✅ e) Supprimer une chambre (avec message erreur)
- ✅ f) Valider / Annuler une reservation

### Tableau de Reservations (Question 3)
- ✅ a) Tester si un client a des reservations
- ✅ b) Tester si une reservation existe
- ✅ c) Ajouter / Modifier / Supprimer une reservation
- ✅ d) Afficher toutes / aujourd'hui / expirant
- ✅ e) Annuler les reservations expirees

### Programme Principal (Question 4)
- ✅ Menu interactif console
- ✅ Sous-menus organises
- ✅ Tests de toutes les fonctionnalites

---

## 🖥️ Captures d'ecran Menu Console

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                    SYSTEME DE GESTION HOTEL                               ║
║                    Projet EMSI - Oussama SAJJI                            ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  1. 📋 Afficher toutes les reservations                                   ║
║  2. 🔍 Rechercher une reservation (par code)                              ║
║  3. ➕ Creer une nouvelle reservation                                     ║
║  4. ❌ Supprimer une reservation                                          ║
║  5. ✅ Valider une reservation                                            ║
║  6. 🚫 Annuler une reservation                                            ║
║  ...                                                                      ║
║  0. 🚪 Quitter                                                            ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

---

## 👤 Auteur

**OUSSAMA SAJJI**  
Projet realise pour **EMSI** (Ecole Marocaine des Sciences de l'Ingenieur)

---

## 📄 Licence

Projet educatif - EMSI 2024
