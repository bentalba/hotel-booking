# 🏨 Hotel Reservation System - Launcher# ╔══════════════════════════════════════════════════════════════════════════╗<#

# Développé par: Oussama SAJJI - EMSI

# PowerShell Script for Windows# ║                                                                          ║  Démarrage 1-clic (Windows)



$Host.UI.RawUI.WindowTitle = "🏨 Hotel EMSI - Système de Gestion"# ║     🏨  SYSTÈME DE GESTION HÔTELIÈRE - EMSI  🏨                          ║  - Installe les dépendances si besoin

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# ║                                                                          ║  - Crée .env.local depuis .env.example si manquant

Clear-Host

# ║     Préparé par Oussama SAJJI                                            ║  - Lance l'application (npm run dev)

Write-Host ""

Write-Host "╔══════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan# ║                                                                          ║

Write-Host "║                                                                          ║" -ForegroundColor Cyan

Write-Host "║     🏨  SYSTÈME DE GESTION HÔTELIÈRE - EMSI  🏨                          ║" -ForegroundColor Cyan# ╚══════════════════════════════════════════════════════════════════════════╝  Usage (double-clic) : Demarrer.ps1

Write-Host "║                                                                          ║" -ForegroundColor Cyan

Write-Host "║     Préparé par Oussama SAJJI                                            ║" -ForegroundColor Cyan  Usage (PowerShell)  : .\Demarrer.ps1

Write-Host "║                                                                          ║" -ForegroundColor Cyan

Write-Host "╚══════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan# Script PowerShell pour Windows#>

Write-Host ""



# Check Node.js

$nodeExists = Get-Command node -ErrorAction SilentlyContinue$Host.UI.RawUI.WindowTitle = "Hotel EMSI - Système de Gestion"$ErrorActionPreference = 'Stop'

if (-not $nodeExists) {

    Write-Host "❌ Node.js n'est pas installé!" -ForegroundColor Red

    Write-Host ""

    Write-Host "📥 Téléchargez Node.js: https://nodejs.org/" -ForegroundColor YellowWrite-Host ""function Write-Info($msg) { Write-Host $msg -ForegroundColor Cyan }

    Write-Host ""

    Read-Host "Appuyez sur Entrée pour quitter"Write-Host "╔══════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyanfunction Write-Ok($msg)   { Write-Host $msg -ForegroundColor Green }

    exit 1

}Write-Host "║                                                                          ║" -ForegroundColor Cyanfunction Write-Warn($msg) { Write-Host $msg -ForegroundColor Yellow }



Write-Host "✅ Node.js détecté: $(node --version)" -ForegroundColor GreenWrite-Host "║     🏨  SYSTÈME DE GESTION HÔTELIÈRE - EMSI  🏨                          ║" -ForegroundColor Cyan

Write-Host ""

Write-Host "║                                                                          ║" -ForegroundColor Cyantry {

# Install dependencies if needed

if (-not (Test-Path "node_modules")) {Write-Host "║     Préparé par Oussama SAJJI                                            ║" -ForegroundColor Cyan  Set-Location -Path $PSScriptRoot

    Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow

    npm installWrite-Host "║                                                                          ║" -ForegroundColor Cyan

    if ($LASTEXITCODE -ne 0) {

        Write-Host "❌ Erreur lors de l'installation!" -ForegroundColor RedWrite-Host "╚══════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan  Write-Host ""

        Read-Host "Appuyez sur Entrée pour quitter"

        exit 1Write-Host ""  Write-Host "🏁 Démarrage Atlas (1 clic)" -ForegroundColor White

    }

    Write-Host "✅ Dépendances installées!" -ForegroundColor Green  Write-Host ""

    Write-Host ""

}# Vérifier Node.js



# Create .env if not existstry {  # 1) Vérifier Node

if (-not (Test-Path ".env")) {

    Write-Host "📝 Création du fichier .env..." -ForegroundColor Yellow    $nodeVersion = node --version  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {

    @"

# 🏨 Hotel Reservation System - Database Configuration    Write-Host "✅ Node.js détecté: $nodeVersion" -ForegroundColor Green    Write-Warn "Node.js n'est pas installé (commande 'node' introuvable)."

# Développé par: Oussama SAJJI - EMSI

} catch {    Write-Warn "Installe Node LTS puis réessaie."

# MySQL Database Connection

DB_HOST=localhost    Write-Host "❌ Node.js n'est pas installé!" -ForegroundColor Red    Pause

DB_PORT=3306

DB_NAME=hotel_reservation    Write-Host "📥 Téléchargez Node.js: https://nodejs.org/" -ForegroundColor Yellow    exit 1

DB_USER=root

DB_PASSWORD=    Read-Host "Appuyez sur Entrée pour quitter"  }



# Server Configuration    exit 1

PORT=3000

NODE_ENV=development}  # 2) Installer deps si node_modules absent

"@ | Out-File -FilePath ".env" -Encoding UTF8

    Write-Host "✅ Fichier .env créé!" -ForegroundColor Green  if (-not (Test-Path -Path (Join-Path $PSScriptRoot 'node_modules'))) {

    Write-Host ""

}Write-Host ""    Write-Info "📦 Installation des dépendances (npm install)..."



function Show-Menu {    npm install

    Write-Host ""

    Write-Host "═══════════════════════════════════════════════════════════════════════════" -ForegroundColor DarkGray# Installer les dépendances si nécessaire    Write-Ok "✅ Dépendances installées"

    Write-Host ""

    Write-Host "  Que souhaitez-vous faire?" -ForegroundColor Whiteif (-not (Test-Path "node_modules")) {  } else {

    Write-Host ""

    Write-Host "  [1] 🚀 Démarrer le serveur API" -ForegroundColor Green    Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow    Write-Ok "✅ Dépendances déjà installées"

    Write-Host "  [2] 💻 Lancer le menu CLI interactif" -ForegroundColor Blue

    Write-Host "  [3] 🔧 Configurer la base de données (MySQL)" -ForegroundColor Yellow    npm install  }

    Write-Host "  [4] 🌱 Synchroniser et peupler la base" -ForegroundColor Magenta

    Write-Host "  [5] 📚 Ouvrir la documentation API" -ForegroundColor Cyan    if ($LASTEXITCODE -ne 0) {

    Write-Host "  [6] ❌ Quitter" -ForegroundColor Red

    Write-Host ""        Write-Host "❌ Erreur lors de l'installation!" -ForegroundColor Red  # 3) Préparer .env.local

    Write-Host "═══════════════════════════════════════════════════════════════════════════" -ForegroundColor DarkGray

    Write-Host ""        Read-Host "Appuyez sur Entrée pour quitter"  $envLocal = Join-Path $PSScriptRoot '.env.local'

}

        exit 1  $envExample = Join-Path $PSScriptRoot '.env.example'

do {

    Show-Menu    }

    $choice = Read-Host "Votre choix [1-6]"

        Write-Host "✅ Dépendances installées!" -ForegroundColor Green  if (-not (Test-Path $envLocal) -and (Test-Path $envExample)) {

    switch ($choice) {

        "1" {    Write-Host ""    Copy-Item $envExample $envLocal

            Write-Host ""

            Write-Host "🚀 Démarrage du serveur API..." -ForegroundColor Green}    Write-Ok "✅ .env.local créé depuis .env.example"

            Write-Host ""

            Write-Host "   📚 Documentation: http://localhost:3000/api-docs" -ForegroundColor Cyan    Write-Warn "ℹ️  Remplace les clés Clerk/Mapbox/DB dans .env.local si nécessaire."

            Write-Host "   🔗 API Base URL:  http://localhost:3000/api/v1" -ForegroundColor Cyan

            Write-Host ""# Vérifier .env  }

            Write-Host "   Appuyez sur Ctrl+C pour arrêter le serveur." -ForegroundColor Yellow

            Write-Host ""if (-not (Test-Path ".env")) {

            npm start

        }    Write-Host "⚠️  Fichier .env manquant! Création..." -ForegroundColor Yellow  # 3bis) Initialiser DB (MySQL ou SQLite) si DATABASE_URL est défini

        "2" {

            Write-Host ""    Copy-Item ".env.example" ".env"  if (Test-Path $envLocal) {

            Write-Host "💻 Lancement du menu CLI..." -ForegroundColor Blue

            Write-Host ""    Write-Host "✅ Fichier .env créé." -ForegroundColor Green    $envContent = Get-Content $envLocal -Raw

            npm run menu:enhanced

        }    Write-Host "⚠️  IMPORTANT: Modifiez .env avec vos paramètres MySQL!" -ForegroundColor Yellow    if ($envContent -match "(?m)^DATABASE_URL\s*=\s*(.+)\s*$") {

        "3" {

            Write-Host ""    notepad .env      $dbUrl = $Matches[1].Trim().Trim('"')

            Write-Host "🔧 Configuration de la base de données..." -ForegroundColor Yellow

            Write-Host ""}      try {

            npm run db:setup

        }        Write-Info "🗄️  Initialisation DB (Prisma)..."

        "4" {

            Write-Host ""function Show-Menu {        npx prisma generate

            Write-Host "🌱 Synchronisation de la base de données..." -ForegroundColor Magenta

            npm run db:sync    Write-Host ""        npx prisma db push

            Write-Host ""

            Write-Host "🌱 Insertion des données de test..." -ForegroundColor Magenta    Write-Host "═══════════════════════════════════════════════════════════════════════════" -ForegroundColor Gray        if (Test-Path (Join-Path $PSScriptRoot 'prisma\seed.js')) {

            npm run db:seed

            Write-Host ""    Write-Host ""          node .\prisma\seed.js

            Write-Host "✅ Base de données prête!" -ForegroundColor Green

        }    Write-Host "  Que souhaitez-vous faire?" -ForegroundColor White        }

        "5" {

            Write-Host ""    Write-Host ""        Write-Ok "✅ DB prête"

            Write-Host "📚 Ouverture de la documentation..." -ForegroundColor Cyan

            Start-Process "http://localhost:3000/api-docs"    Write-Host "  [1] 🚀 Démarrer le serveur API (Express.js)" -ForegroundColor White      }

            Write-Host "⚠️  Assurez-vous que le serveur est démarré (option 1)" -ForegroundColor Yellow

        }    Write-Host "  [2] 📋 Lancer le menu console (CLI)" -ForegroundColor White      catch {

        "6" {

            Write-Host ""    Write-Host "  [3] 🔄 Synchroniser la base de données" -ForegroundColor White        Write-Warn "⚠️  Initialisation DB échouée. Vérifie MySQL (ou la connexion) puis relance."

            Write-Host "👋 Au revoir!" -ForegroundColor Cyan

            Start-Sleep -Seconds 1    Write-Host "  [4] 🌱 Peupler la base avec des données de test" -ForegroundColor White        Write-Warn "Détail: $($_.Exception.Message)"

            exit 0

        }    Write-Host "  [5] ⚠️  Réinitialiser la base de données" -ForegroundColor Yellow      }

        default {

            Write-Host ""    Write-Host "  [6] ⏰ Démarrer les tâches automatiques (Cron)" -ForegroundColor White    }

            Write-Host "⚠️  Choix invalide! Veuillez entrer un nombre entre 1 et 6." -ForegroundColor Yellow

        }    Write-Host "  [7] 📚 Ouvrir la documentation API (Swagger)" -ForegroundColor White  }

    }

} while ($true)    Write-Host "  [8] ❌ Quitter" -ForegroundColor Red


    Write-Host ""  # 4) Lancer

    Write-Host "═══════════════════════════════════════════════════════════════════════════" -ForegroundColor Gray  Write-Host ""

    Write-Host ""  Write-Info "🚀 Lancement du serveur (npm run dev)..."

}  Write-Host ""



Show-Menu  npm run dev

$choice = Read-Host "Votre choix [1-8]"}

catch {

switch ($choice) {  Write-Host "\n❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red

    "1" {  Pause

        Write-Host ""  exit 1

        Write-Host "🚀 Démarrage du serveur API..." -ForegroundColor Green}

        Write-Host "   URL: http://localhost:3000" -ForegroundColor Gray
        Write-Host "   Swagger: http://localhost:3000/api/docs" -ForegroundColor Gray
        Write-Host ""
        Write-Host "   Appuyez sur Ctrl+C pour arrêter." -ForegroundColor Yellow
        Write-Host ""
        npm run dev
    }
    "2" {
        Write-Host ""
        Write-Host "📋 Lancement du menu console..." -ForegroundColor Green
        Write-Host ""
        npm run cli
    }
    "3" {
        Write-Host ""
        Write-Host "🔄 Synchronisation de la base de données..." -ForegroundColor Green
        npm run db:sync
        Read-Host "Appuyez sur Entrée pour continuer"
    }
    "4" {
        Write-Host ""
        Write-Host "🌱 Peuplement de la base de données..." -ForegroundColor Green
        npm run db:seed
        Read-Host "Appuyez sur Entrée pour continuer"
    }
    "5" {
        Write-Host ""
        Write-Host "⚠️  ATTENTION: Ceci va SUPPRIMER toutes les données!" -ForegroundColor Red
        $confirm = Read-Host "Êtes-vous sûr? (oui/non)"
        if ($confirm -eq "oui") {
            npm run db:reset
        }
        Read-Host "Appuyez sur Entrée pour continuer"
    }
    "6" {
        Write-Host ""
        Write-Host "⏰ Démarrage des tâches automatiques..." -ForegroundColor Green
        Write-Host "   Appuyez sur Ctrl+C pour arrêter." -ForegroundColor Yellow
        npm run cron
    }
    "7" {
        Write-Host ""
        Write-Host "📚 Ouverture de la documentation Swagger..." -ForegroundColor Green
        Write-Host "   Note: Le serveur doit être démarré!" -ForegroundColor Yellow
        Start-Process "http://localhost:3000/api/docs"
        Read-Host "Appuyez sur Entrée pour continuer"
    }
    "8" {
        Write-Host ""
        Write-Host "👋 Au revoir!" -ForegroundColor Cyan
        exit 0
    }
    default {
        Write-Host "❌ Choix invalide!" -ForegroundColor Red
    }
}
