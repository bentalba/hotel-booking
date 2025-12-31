#!/bin/bash#!/bin/bash#!/bin/bash

# 🏨 Hotel Reservation System - Launcher

# Développé par: Oussama SAJJI - EMSIset -euo pipefail

# macOS/Linux Script

# ╔══════════════════════════════════════════════════════════════════════════╗cd "$(dirname "$0")"

cd "$(dirname "$0")"

# ║                                                                          ║

clear

# ║     🏨  SYSTÈME DE GESTION HÔTELIÈRE - EMSI  🏨                          ║# Lance le script Node (macOS : double-clic)

echo ""

echo "╔══════════════════════════════════════════════════════════════════════════╗"# ║                                                                          ║node scripts/demarrer.js

echo "║                                                                          ║"

echo "║     🏨  SYSTÈME DE GESTION HÔTELIÈRE - EMSI  🏨                          ║"# ║     Préparé par Oussama SAJJI                                            ║

echo "║                                                                          ║"# ║                                                                          ║

echo "║     Préparé par Oussama SAJJI                                            ║"# ╚══════════════════════════════════════════════════════════════════════════╝

echo "║                                                                          ║"

echo "╚══════════════════════════════════════════════════════════════════════════╝"# Script Bash pour macOS/Linux

echo ""

clear

# Check Node.js

if ! command -v node &> /dev/null; thenecho ""

    echo "❌ Node.js n'est pas installé!"echo "╔══════════════════════════════════════════════════════════════════════════╗"

    echo ""echo "║                                                                          ║"

    echo "📥 Installez Node.js: https://nodejs.org/"echo "║     🏨  SYSTÈME DE GESTION HÔTELIÈRE - EMSI  🏨                          ║"

    echo "   ou via Homebrew: brew install node"echo "║                                                                          ║"

    echo ""echo "║     Préparé par Oussama SAJJI                                            ║"

    read -p "Appuyez sur Entrée pour quitter..."echo "║                                                                          ║"

    exit 1echo "╚══════════════════════════════════════════════════════════════════════════╝"

fiecho ""



echo "✅ Node.js détecté: $(node --version)"# Vérifier Node.js

echo ""if ! command -v node &> /dev/null; then

    echo "❌ Node.js n'est pas installé!"

# Install dependencies if needed    echo "📥 Téléchargez Node.js: https://nodejs.org/"

if [ ! -d "node_modules" ]; then    exit 1

    echo "📦 Installation des dépendances..."fi

    npm install

    if [ $? -ne 0 ]; thenecho "✅ Node.js détecté: $(node --version)"

        echo "❌ Erreur lors de l'installation!"echo ""

        read -p "Appuyez sur Entrée pour quitter..."

        exit 1# Aller dans le répertoire du script

    ficd "$(dirname "$0")"

    echo "✅ Dépendances installées!"

    echo ""# Installer les dépendances si nécessaire

fiif [ ! -d "node_modules" ]; then

    echo "📦 Installation des dépendances..."

# Create .env if not exists    npm install

if [ ! -f ".env" ]; then    if [ $? -ne 0 ]; then

    echo "📝 Création du fichier .env..."        echo "❌ Erreur lors de l'installation!"

    cat > .env << 'EOF'        exit 1

# 🏨 Hotel Reservation System - Database Configuration    fi

# Développé par: Oussama SAJJI - EMSI    echo "✅ Dépendances installées!"

    echo ""

# MySQL Database Connectionfi

DB_HOST=localhost

DB_PORT=3306# Vérifier .env

DB_NAME=hotel_reservationif [ ! -f ".env" ]; then

DB_USER=root    echo "⚠️  Fichier .env manquant! Création..."

DB_PASSWORD=    cp .env.example .env

    echo "✅ Fichier .env créé."

# Server Configuration    echo "⚠️  IMPORTANT: Modifiez .env avec vos paramètres MySQL!"

PORT=3000    echo ""

NODE_ENV=developmentfi

EOF

    echo "✅ Fichier .env créé!"show_menu() {

    echo ""    echo ""

fi    echo "═══════════════════════════════════════════════════════════════════════════"

    echo ""

show_menu() {    echo "  Que souhaitez-vous faire?"

    echo ""    echo ""

    echo "═══════════════════════════════════════════════════════════════════════════"    echo "  [1] 🚀 Démarrer le serveur API (Express.js)"

    echo ""    echo "  [2] 📋 Lancer le menu console (CLI)"

    echo "  Que souhaitez-vous faire?"    echo "  [3] 🔄 Synchroniser la base de données"

    echo ""    echo "  [4] 🌱 Peupler la base avec des données de test"

    echo "  [1] 🚀 Démarrer le serveur API"    echo "  [5] ⚠️  Réinitialiser la base de données"

    echo "  [2] 💻 Lancer le menu CLI interactif"    echo "  [6] ⏰ Démarrer les tâches automatiques (Cron)"

    echo "  [3] 🔧 Configurer la base de données (MySQL)"    echo "  [7] 📚 Ouvrir la documentation API (Swagger)"

    echo "  [4] 🌱 Synchroniser et peupler la base"    echo "  [8] ❌ Quitter"

    echo "  [5] 📚 Ouvrir la documentation API"    echo ""

    echo "  [6] ❌ Quitter"    echo "═══════════════════════════════════════════════════════════════════════════"

    echo ""    echo ""

    echo "═══════════════════════════════════════════════════════════════════════════"}

    echo ""

}show_menu

read -p "Votre choix [1-8]: " choice

while true; do

    show_menucase $choice in

    read -p "Votre choix [1-6]: " choice    1)

            echo ""

    case $choice in        echo "🚀 Démarrage du serveur API..."

        1)        echo "   URL: http://localhost:3000"

            echo ""        echo "   Swagger: http://localhost:3000/api/docs"

            echo "🚀 Démarrage du serveur API..."        echo ""

            echo ""        echo "   Appuyez sur Ctrl+C pour arrêter."

            echo "   📚 Documentation: http://localhost:3000/api-docs"        echo ""

            echo "   🔗 API Base URL:  http://localhost:3000/api/v1"        npm run dev

            echo ""        ;;

            echo "   Appuyez sur Ctrl+C pour arrêter le serveur."    2)

            echo ""        echo ""

            npm start        echo "📋 Lancement du menu console..."

            ;;        echo ""

        2)        npm run cli

            echo ""        ;;

            echo "💻 Lancement du menu CLI..."    3)

            echo ""        echo ""

            npm run menu:enhanced        echo "🔄 Synchronisation de la base de données..."

            ;;        npm run db:sync

        3)        read -p "Appuyez sur Entrée pour continuer..."

            echo ""        ;;

            echo "🔧 Configuration de la base de données..."    4)

            echo ""        echo ""

            npm run db:setup        echo "🌱 Peuplement de la base de données..."

            ;;        npm run db:seed

        4)        read -p "Appuyez sur Entrée pour continuer..."

            echo ""        ;;

            echo "🌱 Synchronisation de la base de données..."    5)

            npm run db:sync        echo ""

            echo ""        echo "⚠️  ATTENTION: Ceci va SUPPRIMER toutes les données!"

            echo "🌱 Insertion des données de test..."        read -p "Êtes-vous sûr? (oui/non): " confirm

            npm run db:seed        if [ "$confirm" = "oui" ]; then

            echo ""            npm run db:reset

            echo "✅ Base de données prête!"        fi

            ;;        read -p "Appuyez sur Entrée pour continuer..."

        5)        ;;

            echo ""    6)

            echo "📚 Ouverture de la documentation..."        echo ""

            if command -v open &> /dev/null; then        echo "⏰ Démarrage des tâches automatiques..."

                open "http://localhost:3000/api-docs"        echo "   Appuyez sur Ctrl+C pour arrêter."

            elif command -v xdg-open &> /dev/null; then        npm run cron

                xdg-open "http://localhost:3000/api-docs"        ;;

            fi    7)

            echo "⚠️  Assurez-vous que le serveur est démarré (option 1)"        echo ""

            ;;        echo "📚 Ouverture de la documentation Swagger..."

        6)        echo "   Note: Le serveur doit être démarré!"

            echo ""        if command -v open &> /dev/null; then

            echo "👋 Au revoir!"            open "http://localhost:3000/api/docs"

            sleep 1        elif command -v xdg-open &> /dev/null; then

            exit 0            xdg-open "http://localhost:3000/api/docs"

            ;;        fi

        *)        read -p "Appuyez sur Entrée pour continuer..."

            echo ""        ;;

            echo "⚠️  Choix invalide! Veuillez entrer un nombre entre 1 et 6."    8)

            ;;        echo ""

    esac        echo "👋 Au revoir!"

done        exit 0

        ;;
    *)
        echo "❌ Choix invalide!"
        ;;
esac
