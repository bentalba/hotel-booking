#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    🏨 HOTEL RESERVATION - DATABASE SETUP                      ║
 * ║                    Interactive MySQL Database Connector                       ║
 * ║                                                                              ║
 * ║                    Développé par: Oussama SAJJI                              ║
 * ║                    EMSI - École Marocaine des Sciences de l'Ingénieur        ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const figlet = require('figlet');
const Table = require('cli-table3');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION & CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

const COLORS = {
    primary: '#00D4FF',
    secondary: '#FF6B6B',
    success: '#00FF88',
    warning: '#FFD93D',
    info: '#6C5CE7',
    muted: '#636E72'
};

const ICONS = {
    database: '🗄️',
    check: '✅',
    cross: '❌',
    warning: '⚠️',
    rocket: '🚀',
    key: '🔑',
    link: '🔗',
    sparkle: '✨',
    gear: '⚙️',
    hotel: '🏨',
    table: '📋',
    seed: '🌱'
};

// ═══════════════════════════════════════════════════════════════════════════════
// DISPLAY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function displayBanner() {
    console.clear();
    console.log('\n');
    console.log(chalk.hex(COLORS.primary)(
        figlet.textSync('DB Setup', {
            font: 'ANSI Shadow',
            horizontalLayout: 'fitted'
        })
    ));
    
    console.log(chalk.hex(COLORS.muted)('═'.repeat(78)));
    console.log(chalk.hex(COLORS.secondary).bold('    🏨 Système de Gestion de Réservations Hôtelières'));
    console.log(chalk.hex(COLORS.info)('    📦 MySQL Database Configuration & Setup Tool'));
    console.log(chalk.hex(COLORS.muted)('═'.repeat(78)));
    console.log('\n');
}

function displayBox(title, content, color = COLORS.primary) {
    const width = 70;
    const border = chalk.hex(color);
    
    console.log(border('╔' + '═'.repeat(width) + '╗'));
    console.log(border('║') + chalk.bold.white(` ${title}`.padEnd(width)) + border('║'));
    console.log(border('╠' + '═'.repeat(width) + '╣'));
    
    content.forEach(line => {
        console.log(border('║') + ` ${line}`.padEnd(width) + border('║'));
    });
    
    console.log(border('╚' + '═'.repeat(width) + '╝'));
    console.log();
}

function displayStatus(label, status, details = '') {
    const icon = status ? chalk.hex(COLORS.success)(ICONS.check) : chalk.hex(COLORS.secondary)(ICONS.cross);
    const statusText = status 
        ? chalk.hex(COLORS.success)('Connecté') 
        : chalk.hex(COLORS.secondary)('Non connecté');
    
    console.log(`  ${icon} ${chalk.bold(label)}: ${statusText} ${chalk.hex(COLORS.muted)(details)}`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// DATABASE FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

async function testMySQLConnection(config) {
    try {
        const connection = await mysql.createConnection({
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password
        });
        await connection.end();
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function testDatabaseExists(config) {
    try {
        const connection = await mysql.createConnection({
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            database: config.database
        });
        await connection.end();
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function createDatabase(config) {
    const connection = await mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password
    });
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await connection.end();
}

async function getTableInfo(config) {
    const connection = await mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database
    });
    
    const [tables] = await connection.query('SHOW TABLES');
    const tableInfo = [];
    
    for (const row of tables) {
        const tableName = Object.values(row)[0];
        const [count] = await connection.query(`SELECT COUNT(*) as count FROM \`${tableName}\``);
        tableInfo.push({ name: tableName, count: count[0].count });
    }
    
    await connection.end();
    return tableInfo;
}

async function saveEnvFile(config) {
    const envContent = `# 🏨 Hotel Reservation System - Database Configuration
# Generated by Database Setup Tool
# Développé par: Oussama SAJJI - EMSI

# MySQL Database Connection
DB_HOST=${config.host}
DB_PORT=${config.port}
DB_NAME=${config.database}
DB_USER=${config.user}
DB_PASSWORD=${config.password}

# Server Configuration
PORT=3000
NODE_ENV=development
`;
    
    await fs.writeFile(path.join(process.cwd(), '.env'), envContent);
}

// ═══════════════════════════════════════════════════════════════════════════════
// INTERACTIVE SETUP WIZARD
// ═══════════════════════════════════════════════════════════════════════════════

async function runSetupWizard() {
    displayBanner();
    
    console.log(chalk.hex(COLORS.info)(`  ${ICONS.gear} Configuration de la connexion MySQL\n`));
    
    // Get current config from .env
    const currentConfig = {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'hotel_reservation'
    };
    
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'host',
            message: chalk.hex(COLORS.primary)('🖥️  Hôte MySQL:'),
            default: currentConfig.host
        },
        {
            type: 'number',
            name: 'port',
            message: chalk.hex(COLORS.primary)('🔌 Port MySQL:'),
            default: currentConfig.port
        },
        {
            type: 'input',
            name: 'user',
            message: chalk.hex(COLORS.primary)('👤 Utilisateur MySQL:'),
            default: currentConfig.user
        },
        {
            type: 'password',
            name: 'password',
            message: chalk.hex(COLORS.primary)('🔑 Mot de passe MySQL:'),
            default: currentConfig.password,
            mask: '*'
        },
        {
            type: 'input',
            name: 'database',
            message: chalk.hex(COLORS.primary)('🗄️  Nom de la base de données:'),
            default: currentConfig.database
        }
    ]);
    
    return answers;
}

async function testAndSetup(config) {
    console.log('\n');
    
    // Test MySQL server connection
    const spinner1 = ora({
        text: chalk.hex(COLORS.info)('Test de connexion au serveur MySQL...'),
        spinner: 'dots12',
        color: 'cyan'
    }).start();
    
    const serverTest = await testMySQLConnection(config);
    
    if (!serverTest.success) {
        spinner1.fail(chalk.hex(COLORS.secondary)('Impossible de se connecter au serveur MySQL'));
        console.log(chalk.hex(COLORS.muted)(`   Erreur: ${serverTest.error}`));
        console.log(chalk.hex(COLORS.warning)(`\n   ${ICONS.warning} Vérifiez que MySQL est installé et en cours d'exécution`));
        console.log(chalk.hex(COLORS.info)('   💡 Commandes utiles:'));
        console.log(chalk.hex(COLORS.muted)('      • macOS: brew services start mysql'));
        console.log(chalk.hex(COLORS.muted)('      • Windows: net start mysql'));
        console.log(chalk.hex(COLORS.muted)('      • Linux: sudo systemctl start mysql'));
        return false;
    }
    
    spinner1.succeed(chalk.hex(COLORS.success)('Connexion au serveur MySQL établie'));
    
    // Test database existence
    const spinner2 = ora({
        text: chalk.hex(COLORS.info)(`Vérification de la base de données "${config.database}"...`),
        spinner: 'dots12',
        color: 'cyan'
    }).start();
    
    const dbTest = await testDatabaseExists(config);
    
    if (!dbTest.success) {
        spinner2.warn(chalk.hex(COLORS.warning)(`Base de données "${config.database}" non trouvée`));
        
        const { createDb } = await inquirer.prompt([{
            type: 'confirm',
            name: 'createDb',
            message: chalk.hex(COLORS.primary)(`Créer la base de données "${config.database}"?`),
            default: true
        }]);
        
        if (createDb) {
            const spinner3 = ora({
                text: chalk.hex(COLORS.info)('Création de la base de données...'),
                spinner: 'dots12',
                color: 'cyan'
            }).start();
            
            try {
                await createDatabase(config);
                spinner3.succeed(chalk.hex(COLORS.success)(`Base de données "${config.database}" créée avec succès`));
            } catch (error) {
                spinner3.fail(chalk.hex(COLORS.secondary)('Erreur lors de la création'));
                console.log(chalk.hex(COLORS.muted)(`   ${error.message}`));
                return false;
            }
        } else {
            return false;
        }
    } else {
        spinner2.succeed(chalk.hex(COLORS.success)(`Base de données "${config.database}" trouvée`));
    }
    
    // Save configuration
    const spinner4 = ora({
        text: chalk.hex(COLORS.info)('Sauvegarde de la configuration...'),
        spinner: 'dots12',
        color: 'cyan'
    }).start();
    
    try {
        await saveEnvFile(config);
        spinner4.succeed(chalk.hex(COLORS.success)('Configuration sauvegardée dans .env'));
    } catch (error) {
        spinner4.fail(chalk.hex(COLORS.secondary)('Erreur lors de la sauvegarde'));
        return false;
    }
    
    return true;
}

async function syncTables() {
    console.log('\n');
    
    const spinner = ora({
        text: chalk.hex(COLORS.info)('Synchronisation des tables avec Sequelize...'),
        spinner: 'dots12',
        color: 'cyan'
    }).start();
    
    try {
        // Clear require cache for fresh config
        delete require.cache[require.resolve('../config/database')];
        delete require.cache[require.resolve('../models')];
        
        const sequelize = require('../config/database');
        const models = require('../models');
        
        await sequelize.sync({ alter: true });
        spinner.succeed(chalk.hex(COLORS.success)('Tables synchronisées avec succès'));
        
        // Show table info
        const tableInfo = await getTableInfo({
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'hotel_reservation'
        });
        
        if (tableInfo.length > 0) {
            console.log('\n');
            const table = new Table({
                head: [
                    chalk.hex(COLORS.primary).bold('Table'),
                    chalk.hex(COLORS.primary).bold('Enregistrements')
                ],
                style: {
                    head: [],
                    border: ['cyan']
                }
            });
            
            tableInfo.forEach(t => {
                table.push([
                    chalk.white(t.name),
                    chalk.hex(COLORS.success)(t.count.toString())
                ]);
            });
            
            console.log(table.toString());
        }
        
        await sequelize.close();
        return true;
    } catch (error) {
        spinner.fail(chalk.hex(COLORS.secondary)('Erreur lors de la synchronisation'));
        console.log(chalk.hex(COLORS.muted)(`   ${error.message}`));
        return false;
    }
}

async function seedDatabase() {
    console.log('\n');
    
    const { confirmSeed } = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirmSeed',
        message: chalk.hex(COLORS.warning)(`${ICONS.warning} Voulez-vous insérer des données de test? (clients, chambres, réservations)`),
        default: true
    }]);
    
    if (!confirmSeed) {
        console.log(chalk.hex(COLORS.muted)('   Insertion annulée'));
        return true;
    }
    
    const spinner = ora({
        text: chalk.hex(COLORS.info)('Insertion des données de test...'),
        spinner: 'dots12',
        color: 'cyan'
    }).start();
    
    try {
        // Run seed script
        require('./seedDatabase');
        
        // Wait for seed to complete
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        spinner.succeed(chalk.hex(COLORS.success)('Données de test insérées avec succès'));
        console.log(chalk.hex(COLORS.muted)('   • 5 clients créés'));
        console.log(chalk.hex(COLORS.muted)('   • 80 chambres créées (numéros 101-880)'));
        console.log(chalk.hex(COLORS.muted)('   • 3 réservations de test créées'));
        
        return true;
    } catch (error) {
        spinner.fail(chalk.hex(COLORS.secondary)('Erreur lors de l\'insertion'));
        console.log(chalk.hex(COLORS.muted)(`   ${error.message}`));
        return false;
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN MENU
// ═══════════════════════════════════════════════════════════════════════════════

async function showMainMenu() {
    displayBanner();
    
    // Show current status
    const currentConfig = {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'hotel_reservation'
    };
    
    displayBox(`${ICONS.database} Configuration Actuelle`, [
        `Hôte:          ${chalk.hex(COLORS.success)(currentConfig.host)}`,
        `Port:          ${chalk.hex(COLORS.success)(currentConfig.port)}`,
        `Utilisateur:   ${chalk.hex(COLORS.success)(currentConfig.user)}`,
        `Base:          ${chalk.hex(COLORS.success)(currentConfig.database)}`,
        ``,
        `Mot de passe:  ${currentConfig.password ? chalk.hex(COLORS.success)('••••••••') : chalk.hex(COLORS.warning)('(vide)')}`
    ], COLORS.info);
    
    // Test current connection
    const serverStatus = await testMySQLConnection(currentConfig);
    const dbStatus = serverStatus.success ? await testDatabaseExists(currentConfig) : { success: false };
    
    console.log(chalk.hex(COLORS.primary).bold('  📊 État de la Connexion:\n'));
    displayStatus('Serveur MySQL', serverStatus.success, serverStatus.success ? `(${currentConfig.host}:${currentConfig.port})` : '');
    displayStatus('Base de données', dbStatus.success, dbStatus.success ? `(${currentConfig.database})` : '');
    console.log('\n');
    
    const { action } = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: chalk.hex(COLORS.primary)('Que souhaitez-vous faire?'),
        choices: [
            { name: `${ICONS.gear}  Configurer la connexion MySQL`, value: 'configure' },
            { name: `${ICONS.link}  Tester la connexion`, value: 'test' },
            { name: `${ICONS.table}  Synchroniser les tables (Sequelize)`, value: 'sync' },
            { name: `${ICONS.seed}  Insérer données de test`, value: 'seed' },
            { name: `${ICONS.rocket}  Démarrer le serveur`, value: 'start' },
            new inquirer.Separator(),
            { name: `${ICONS.cross}  Quitter`, value: 'exit' }
        ]
    }]);
    
    return action;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
    let running = true;
    
    while (running) {
        try {
            const action = await showMainMenu();
            
            switch (action) {
                case 'configure':
                    const config = await runSetupWizard();
                    const success = await testAndSetup(config);
                    if (success) {
                        console.log(chalk.hex(COLORS.success)(`\n  ${ICONS.check} Configuration terminée avec succès!\n`));
                        // Reload env
                        require('dotenv').config({ override: true });
                    }
                    await inquirer.prompt([{ type: 'input', name: 'continue', message: chalk.hex(COLORS.muted)('Appuyez sur Entrée pour continuer...') }]);
                    break;
                    
                case 'test':
                    const testConfig = {
                        host: process.env.DB_HOST || 'localhost',
                        port: parseInt(process.env.DB_PORT) || 3306,
                        user: process.env.DB_USER || 'root',
                        password: process.env.DB_PASSWORD || '',
                        database: process.env.DB_NAME || 'hotel_reservation'
                    };
                    await testAndSetup(testConfig);
                    await inquirer.prompt([{ type: 'input', name: 'continue', message: chalk.hex(COLORS.muted)('Appuyez sur Entrée pour continuer...') }]);
                    break;
                    
                case 'sync':
                    await syncTables();
                    await inquirer.prompt([{ type: 'input', name: 'continue', message: chalk.hex(COLORS.muted)('Appuyez sur Entrée pour continuer...') }]);
                    break;
                    
                case 'seed':
                    await seedDatabase();
                    await inquirer.prompt([{ type: 'input', name: 'continue', message: chalk.hex(COLORS.muted)('Appuyez sur Entrée pour continuer...') }]);
                    break;
                    
                case 'start':
                    console.log(chalk.hex(COLORS.success)(`\n  ${ICONS.rocket} Démarrage du serveur...\n`));
                    running = false;
                    // Start server
                    require('../index');
                    break;
                    
                case 'exit':
                    running = false;
                    console.log(chalk.hex(COLORS.primary)(`\n  ${ICONS.sparkle} Au revoir!\n`));
                    process.exit(0);
                    break;
            }
        } catch (error) {
            if (error.name === 'ExitPromptError') {
                running = false;
                console.log(chalk.hex(COLORS.primary)(`\n  ${ICONS.sparkle} Au revoir!\n`));
                process.exit(0);
            }
            console.error(chalk.hex(COLORS.secondary)(`\n  ${ICONS.cross} Erreur: ${error.message}\n`));
            await inquirer.prompt([{ type: 'input', name: 'continue', message: chalk.hex(COLORS.muted)('Appuyez sur Entrée pour continuer...') }]);
        }
    }
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { main, testMySQLConnection, testDatabaseExists, createDatabase };
