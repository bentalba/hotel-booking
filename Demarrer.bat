@echo off@echo off@echo off

chcp 65001 >nul

clschcp 65001 >nulsetlocal



echo.cls

echo ╔══════════════════════════════════════════════════════════════════════════╗

echo ║                                                                          ║REM Lance PowerShell en contournant la policy pour cette session et en se plaçant dans le dossier du script

echo ║     🏨  SYSTÈME DE GESTION HÔTELIÈRE - EMSI  🏨                          ║

echo ║                                                                          ║echo.powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; Set-Location '%~dp0'; .\Demarrer.ps1"

echo ║     Préparé par Oussama SAJJI                                            ║

echo ║                                                                          ║echo ╔══════════════════════════════════════════════════════════════════════════╗

echo ╚══════════════════════════════════════════════════════════════════════════╝

echo.echo ║                                                                          ║endlocal



:: Vérifier si Node.js est installéecho ║     🏨  SYSTÈME DE GESTION HÔTELIÈRE - EMSI  🏨                          ║

where node >nul 2>nulecho ║                                                                          ║

if errorlevel 1 (echo ║     Préparé par Oussama SAJJI                                            ║

    echo ❌ Node.js n'est pas installé!echo ║                                                                          ║

    echo.echo ╚══════════════════════════════════════════════════════════════════════════╝

    echo 📥 Téléchargez Node.js: https://nodejs.org/echo.

    echo.

    pause:: Vérifier si Node.js est installé

    exit /b 1where node >nul 2>nul

)if errorlevel 1 (

    echo ❌ Node.js n'est pas installé!

echo ✅ Node.js détecté:     echo.

node --version    echo 📥 Téléchargez Node.js: https://nodejs.org/

echo.    echo.

    pause

:: Vérifier si les dépendances sont installées    exit /b 1

if not exist "node_modules" ()

    echo 📦 Installation des dépendances...

    echo.echo ✅ Node.js détecté: 

    call npm installnode --version

    if errorlevel 1 (echo.

        echo ❌ Erreur lors de l'installation des dépendances!

        pause:: Vérifier si les dépendances sont installées

        exit /b 1if not exist "node_modules" (

    )    echo 📦 Installation des dépendances...

    echo.    echo.

    echo ✅ Dépendances installées!    call npm install

    echo.    if errorlevel 1 (

)        echo ❌ Erreur lors de l'installation des dépendances!

        pause

:: Créer le fichier .env s'il n'existe pas        exit /b 1

if not exist ".env" (    )

    echo 📝 Création du fichier .env...    echo.

    (    echo ✅ Dépendances installées!

        echo # 🏨 Hotel Reservation System - Database Configuration    echo.

        echo # Développé par: Oussama SAJJI - EMSI)

        echo.

        echo # MySQL Database Connection:: Vérifier le fichier .env

        echo DB_HOST=localhostif not exist ".env" (

        echo DB_PORT=3306    echo ⚠️  Fichier .env manquant! Création à partir de .env.example...

        echo DB_NAME=hotel_reservation    copy .env.example .env >nul

        echo DB_USER=root    echo ✅ Fichier .env créé.

        echo DB_PASSWORD=    echo.

        echo.    echo ⚠️  IMPORTANT: Modifiez le fichier .env avec vos paramètres MySQL!

        echo # Server Configuration    echo.

        echo PORT=3000    notepad .env

        echo NODE_ENV=development)

    ) > .env

    echo ✅ Fichier .env créé!echo.

    echo.echo ═══════════════════════════════════════════════════════════════════════════

)echo.

echo   Que souhaitez-vous faire?

:: Menu principalecho.

:menuecho   [1] 🚀 Démarrer le serveur API (Express.js)

echo.echo   [2] 📋 Lancer le menu console (CLI)

echo ═══════════════════════════════════════════════════════════════════════════echo   [3] 🔄 Synchroniser la base de données

echo.echo   [4] 🌱 Peupler la base avec des données de test

echo   Que souhaitez-vous faire?echo   [5] ⚠️  Réinitialiser la base de données

echo.echo   [6] ⏰ Démarrer les tâches automatiques (Cron)

echo   [1] 🚀 Démarrer le serveur APIecho   [7] 📚 Ouvrir la documentation API (Swagger)

echo   [2] 💻 Lancer le menu CLI interactifecho   [8] ❌ Quitter

echo   [3] 🔧 Configurer la base de données (MySQL)echo.

echo   [4] 🌱 Synchroniser et peupler la baseecho ═══════════════════════════════════════════════════════════════════════════

echo   [5] 📚 Ouvrir la documentation API (navigateur)echo.

echo   [6] ❌ Quitter

echo.set /p choice="Votre choix [1-8]: "

echo ═══════════════════════════════════════════════════════════════════════════

echo.if "%choice%"=="1" goto :start_server

if "%choice%"=="2" goto :start_cli

set /p choice="Votre choix [1-6]: "if "%choice%"=="3" goto :sync_db

if "%choice%"=="4" goto :seed_db

if "%choice%"=="1" goto start_serverif "%choice%"=="5" goto :reset_db

if "%choice%"=="2" goto start_menuif "%choice%"=="6" goto :start_cron

if "%choice%"=="3" goto db_setupif "%choice%"=="7" goto :open_docs

if "%choice%"=="4" goto db_syncif "%choice%"=="8" goto :exit

if "%choice%"=="5" goto open_docs

if "%choice%"=="6" goto endecho ❌ Choix invalide!

pause

echo.goto :eof

echo ⚠️  Choix invalide! Veuillez entrer un nombre entre 1 et 6.

goto menu:start_server

echo.

:start_serverecho 🚀 Démarrage du serveur API...

echo.echo    URL: http://localhost:3000

echo 🚀 Démarrage du serveur API...echo    Swagger: http://localhost:3000/api/docs

echo.echo.

echo    📚 Documentation: http://localhost:3000/api-docsecho    Appuyez sur Ctrl+C pour arrêter le serveur.

echo    🔗 API Base URL:  http://localhost:3000/api/v1echo.

echo.call npm run dev

echo    Appuyez sur Ctrl+C pour arrêter le serveur.goto :eof

echo.

call npm start:start_cli

goto menuecho.

echo 📋 Lancement du menu console...

:start_menuecho.

echo.call npm run cli

echo 💻 Lancement du menu CLI...goto :eof

echo.

call npm run menu:enhanced:sync_db

goto menuecho.

echo 🔄 Synchronisation de la base de données...

:db_setupecho.

echo.call npm run db:sync

echo 🔧 Configuration de la base de données...echo.

echo.pause

call npm run db:setupgoto :eof

goto menu

:seed_db

:db_syncecho.

echo.echo 🌱 Peuplement de la base de données...

echo 🌱 Synchronisation de la base de données...echo.

echo.call npm run db:seed

call npm run db:syncecho.

echo.pause

echo 🌱 Insertion des données de test...goto :eof

call npm run db:seed

echo.:reset_db

echo ✅ Base de données prête!echo.

goto menuecho ⚠️  ATTENTION: Ceci va SUPPRIMER toutes les données!

set /p confirm="Êtes-vous sûr? (oui/non): "

:open_docsif /i "%confirm%"=="oui" (

echo.    echo.

echo 📚 Ouverture de la documentation...    call npm run db:reset

start http://localhost:3000/api-docs)

echo.echo.

echo ⚠️  Assurez-vous que le serveur est démarré (option 1)pause

goto menugoto :eof



:end:start_cron

echo.echo.

echo 👋 Au revoir!echo ⏰ Démarrage des tâches automatiques...

echo.echo    Appuyez sur Ctrl+C pour arrêter.

timeout /t 2 >nulecho.

exit /b 0call npm run cron

goto :eof

:open_docs
echo.
echo 📚 Ouverture de la documentation Swagger...
echo    Note: Le serveur doit être démarré!
echo.
start http://localhost:3000/api/docs
pause
goto :eof

:exit
echo.
echo 👋 Au revoir!
echo.
exit /b 0
