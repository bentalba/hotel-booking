#!/bin/bash
cd "$(dirname "$0")"
clear
echo ""
echo "  ╔══════════════════════════════════════════════════════════════╗"
echo "  ║                                                              ║"
echo "  ║      🏨 HOTEL EMSI - Système de Réservation Hôtelière        ║"
echo "  ║                                                              ║"
echo "  ║          Next.js 15 + Tailwind CSS + Prisma                  ║"
echo "  ║                                                              ║"
echo "  ╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "  📦 Vérification des dépendances..."
if [ ! -d "node_modules" ]; then
    echo "  ⏳ Installation des packages npm..."
    npm install --legacy-peer-deps
fi
echo ""
echo "  🔧 Configuration de la base de données..."
npx prisma generate
echo ""
echo "  🚀 Démarrage du serveur de développement..."
echo ""
echo "  ════════════════════════════════════════════════════════════════"
echo "    L'application sera disponible sur: http://localhost:3000"
echo "  ════════════════════════════════════════════════════════════════"
echo ""
npm run dev
