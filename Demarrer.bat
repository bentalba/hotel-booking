@echo off
chcp 65001 >nul
title Hotel EMSI - Système de Réservation
cls
echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║                                                              ║
echo  ║      🏨 HOTEL EMSI - Système de Réservation Hôtelière        ║
echo  ║                                                              ║
echo  ║          Next.js 15 + Tailwind CSS + Prisma                  ║
echo  ║                                                              ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.
echo  📦 Vérification des dépendances...
if not exist node_modules (
    echo  ⏳ Installation des packages npm...
    call npm install --legacy-peer-deps
)
echo.
echo  🔧 Configuration de la base de données...
call npx prisma generate
echo.
echo  🚀 Démarrage du serveur de développement...
echo.
echo  ════════════════════════════════════════════════════════════════
echo    L'application sera disponible sur: http://localhost:3000
echo  ════════════════════════════════════════════════════════════════
echo.
call npm run dev
pause
