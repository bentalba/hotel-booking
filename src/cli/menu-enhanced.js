/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                              ║
 * ║    🏨  SYSTÈME DE GESTION HÔTELIÈRE - MENU INTERACTIF                        ║
 * ║                                                                              ║
 * ║    Interface CLI moderne et élégante pour la gestion complète               ║
 * ║    des réservations, clients et chambres d'hôtel.                           ║
 * ║                                                                              ║
 * ║    Développé par: Oussama SAJJI                                              ║
 * ║    EMSI - École Marocaine des Sciences de l'Ingénieur                        ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

require('dotenv').config();
const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const Table = require('cli-table3');
const ora = require('ora');
const gradient = require('gradient-string');
const boxen = require('boxen');
const { sequelize, Client, Chambre, Reservation, ReservationChambre } = require('../models');
const { ClientService, ChambreService, ReservationService } = require('../services');

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 THEME & STYLE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const THEME = {
    colors: {
        primary: '#00D4FF',      // Cyan brillant
        secondary: '#FF6B6B',    // Corail
        success: '#00FF88',      // Vert néon
        warning: '#FFD93D',      // Jaune doré
        info: '#6C5CE7',         // Violet
        accent: '#FD79A8',       // Rose
        muted: '#636E72',        // Gris
        gold: '#F1C40F',         // Or
        emerald: '#2ECC71',      // Émeraude
        sapphire: '#3498DB'      // Saphir
    },
    icons: {
        hotel: '🏨',
        client: '👤',
        clients: '👥',
        room: '🛏️',
        rooms: '🏠',
        reservation: '📅',
        calendar: '📆',
        dashboard: '📊',
        stats: '📈',
        check: '✅',
        cross: '❌',
        warning: '⚠️',
        info: 'ℹ️',
        star: '⭐',
        sparkle: '✨',
        rocket: '🚀',
        key: '🔑',
        phone: '📞',
        home: '🏠',
        exit: '🚪',
        back: '↩️',
        add: '➕',
        edit: '✏️',
        delete: '🗑️',
        search: '🔍',
        list: '📋',
        money: '💰',
        time: '⏰',
        valid: '✓',
        pending: '⏳',
        cancel: '🚫',
        close: '🔒'
    }
};

// Gradient presets
const gradients = {
    title: gradient(['#00D4FF', '#6C5CE7', '#FD79A8']),
    success: gradient(['#00FF88', '#2ECC71']),
    warning: gradient(['#FFD93D', '#F39C12']),
    info: gradient(['#3498DB', '#6C5CE7']),
    accent: gradient(['#FD79A8', '#FF6B6B'])
};

// Helper functions
const c = {
    primary: (text) => chalk.hex(THEME.colors.primary)(text),
    secondary: (text) => chalk.hex(THEME.colors.secondary)(text),
    success: (text) => chalk.hex(THEME.colors.success)(text),
    warning: (text) => chalk.hex(THEME.colors.warning)(text),
    info: (text) => chalk.hex(THEME.colors.info)(text),
    accent: (text) => chalk.hex(THEME.colors.accent)(text),
    muted: (text) => chalk.hex(THEME.colors.muted)(text),
    gold: (text) => chalk.hex(THEME.colors.gold)(text),
    emerald: (text) => chalk.hex(THEME.colors.emerald)(text),
    sapphire: (text) => chalk.hex(THEME.colors.sapphire)(text)
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🖼️ DISPLAY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function showHeader(subtitle = null) {
    console.clear();
    console.log('\n');
    
    // Beautiful ASCII art banner with gradient
    const banner = figlet.textSync('HOTEL EMSI', {
        font: 'ANSI Shadow',
        horizontalLayout: 'fitted'
    });
    
    console.log(gradients.title(banner));
    
    // Decorative line
    const line = '═'.repeat(78);
    console.log(c.muted(line));
    
    // Subtitle area
    console.log(c.gold(`    ${THEME.icons.star} `) + 
                chalk.bold.white('Système de Gestion de Réservations Hôtelières') + 
                c.gold(` ${THEME.icons.star}`));
    console.log(c.info(`    ${THEME.icons.sparkle} `) + 
                c.muted('Développé par: ') + 
                c.accent.bold('Oussama SAJJI') + 
                c.muted(' - EMSI') + 
                c.info(` ${THEME.icons.sparkle}`));
    
    if (subtitle) {
        console.log(c.muted(line));
        console.log(c.primary(`    ${subtitle}`));
    }
    
    console.log(c.muted(line));
    console.log('\n');
}

function displayBox(title, content, options = {}) {
    const {
        borderColor = THEME.colors.primary,
        padding = 1,
        margin = 0
    } = options;
    
    const boxContent = [
        chalk.bold(title),
        '',
        ...content
    ].join('\n');
    
    console.log(boxen(boxContent, {
        padding,
        margin,
        borderColor,
        borderStyle: 'round',
        title: THEME.icons.hotel,
        titleAlignment: 'center'
    }));
    console.log();
}

function displayStatusLine(icon, label, value, color = 'primary') {
    console.log(`  ${icon} ${c.muted(label + ':')} ${c[color](value)}`);
}

function displaySuccess(message) {
    console.log(c.success(`\n  ${THEME.icons.check} ${message}\n`));
}

function displayError(message) {
    console.log(c.secondary(`\n  ${THEME.icons.cross} ${message}\n`));
}

function displayWarning(message) {
    console.log(c.warning(`\n  ${THEME.icons.warning} ${message}\n`));
}

function displayInfo(message) {
    console.log(c.info(`\n  ${THEME.icons.info} ${message}\n`));
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📋 TABLE STYLING
// ═══════════════════════════════════════════════════════════════════════════════

function createStyledTable(headers, options = {}) {
    const { colWidths = null, style = 'modern' } = options;
    
    const tableOptions = {
        head: headers.map(h => c.primary.bold(h)),
        style: {
            head: [],
            border: ['cyan']
        },
        chars: {
            'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
            'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
            'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼',
            'right': '║', 'right-mid': '╢', 'middle': '│'
        }
    };
    
    if (colWidths) {
        tableOptions.colWidths = colWidths;
    }
    
    return new Table(tableOptions);
}

function getStatusBadge(status) {
    const badges = {
        'Pending': c.warning(`${THEME.icons.pending} En attente`),
        'Validated': c.success(`${THEME.icons.valid} Validée`),
        'Canceled': c.secondary(`${THEME.icons.cancel} Annulée`),
        'Closed': c.muted(`${THEME.icons.close} Clôturée`)
    };
    return badges[status] || status;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 MAIN MENU
// ═══════════════════════════════════════════════════════════════════════════════

async function mainMenu() {
    showHeader();
    
    // Quick stats display
    try {
        const stats = await ReservationService.getStatistics();
        if (stats.success) {
            console.log(c.info('  📊 Aperçu Rapide:\n'));
            console.log(`      ${THEME.icons.clients} Clients:      ${c.success(stats.data.totalClients || 0)}`);
            console.log(`      ${THEME.icons.rooms} Chambres:     ${c.success(stats.data.totalChambres || 0)}`);
            console.log(`      ${THEME.icons.calendar} Réservations: ${c.success(stats.data.totalReservations || 0)}`);
            console.log(`      ${THEME.icons.pending} En attente:   ${c.warning(stats.data.byStatus?.Pending || 0)}`);
            console.log('\n');
        }
    } catch (e) {
        // Ignore stats errors on startup
    }
    
    const { choice } = await inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: c.gold(`${THEME.icons.star} Menu Principal - Que souhaitez-vous faire?`),
        choices: [
            { 
                name: `${THEME.icons.clients}  ${c.sapphire('Gestion des Clients')}       ${c.muted('→ CRUD complet')}`, 
                value: 'clients' 
            },
            { 
                name: `${THEME.icons.room}  ${c.emerald('Gestion des Chambres')}     ${c.muted('→ 80 chambres max')}`, 
                value: 'chambres' 
            },
            { 
                name: `${THEME.icons.calendar}  ${c.accent('Gestion des Réservations')} ${c.muted('→ Workflow complet')}`, 
                value: 'reservations' 
            },
            { 
                name: `${THEME.icons.dashboard}  ${c.gold('Dashboard & Statistiques')} ${c.muted('→ Vue d\'ensemble')}`, 
                value: 'dashboard' 
            },
            new inquirer.Separator(c.muted('─'.repeat(50))),
            { 
                name: `${THEME.icons.exit}  ${c.secondary('Quitter')}`, 
                value: 'exit' 
            }
        ],
        pageSize: 10
    }]);
    
    switch (choice) {
        case 'clients': await clientsMenu(); break;
        case 'chambres': await chambresMenu(); break;
        case 'reservations': await reservationsMenu(); break;
        case 'dashboard': await showDashboard(); break;
        case 'exit': await exitApp(); break;
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 👥 CLIENTS MENU
// ═══════════════════════════════════════════════════════════════════════════════

async function clientsMenu() {
    showHeader(`${THEME.icons.clients} GESTION DES CLIENTS`);
    
    const { action } = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: c.sapphire(`${THEME.icons.client} Choisissez une action:`),
        choices: [
            { name: `${THEME.icons.list}  Lister tous les clients`, value: 'list' },
            { name: `${THEME.icons.add}  Ajouter un nouveau client`, value: 'add' },
            { name: `${THEME.icons.search}  Rechercher un client`, value: 'search' },
            { name: `${THEME.icons.edit}  Modifier un client`, value: 'edit' },
            { name: `${THEME.icons.delete}  Supprimer un client`, value: 'delete' },
            new inquirer.Separator(c.muted('─'.repeat(40))),
            { name: `${THEME.icons.back}  ${c.warning('Retour au menu principal')}`, value: 'back' }
        ]
    }]);
    
    switch (action) {
        case 'list': await listClients(); break;
        case 'add': await addClient(); break;
        case 'search': await searchClient(); break;
        case 'edit': await editClient(); break;
        case 'delete': await deleteClient(); break;
        case 'back': await mainMenu(); return;
    }
    
    await pauseAndReturn(clientsMenu);
}

async function listClients() {
    const spinner = ora({
        text: c.info('Chargement des clients...'),
        spinner: 'dots12',
        color: 'cyan'
    }).start();
    
    const result = await ClientService.getAll();
    spinner.stop();
    
    if (!result.success || result.data.length === 0) {
        displayWarning('Aucun client trouvé dans la base de données.');
        return;
    }
    
    const table = createStyledTable(['ID', 'Nom', 'Prénom', 'Adresse'], {
        colWidths: [8, 18, 18, 38]
    });
    
    result.data.forEach(client => {
        table.push([
            c.gold(client.id.toString()),
            chalk.white(client.nom),
            chalk.white(client.prenom),
            c.muted(client.adresse || '—')
        ]);
    });
    
    console.log('\n' + table.toString());
    console.log(c.success(`\n  ${THEME.icons.check} Total: ${result.data.length} client(s) trouvé(s)\n`));
}

async function addClient() {
    console.log(c.info(`\n  ${THEME.icons.add} Nouveau Client\n`));
    
    const answers = await inquirer.prompt([
        { 
            type: 'input', 
            name: 'nom', 
            message: c.primary('Nom:'),
            validate: v => v.trim() ? true : c.secondary('Le nom est requis')
        },
        { 
            type: 'input', 
            name: 'prenom', 
            message: c.primary('Prénom:'),
            validate: v => v.trim() ? true : c.secondary('Le prénom est requis')
        },
        { 
            type: 'input', 
            name: 'adresse', 
            message: c.primary('Adresse (optionnel):')
        }
    ]);
    
    const spinner = ora({
        text: c.info('Création du client...'),
        spinner: 'dots12',
        color: 'cyan'
    }).start();
    
    const result = await ClientService.create(answers);
    spinner.stop();
    
    if (result.success) {
        displaySuccess(`Client créé avec succès! ID: ${result.data.id}`);
    } else {
        displayError(`Erreur: ${result.message}`);
    }
}

async function searchClient() {
    const { term } = await inquirer.prompt([{
        type: 'input',
        name: 'term',
        message: c.primary(`${THEME.icons.search} Rechercher par nom:`)
    }]);
    
    const spinner = ora({
        text: c.info('Recherche en cours...'),
        spinner: 'dots12',
        color: 'cyan'
    }).start();
    
    const result = await ClientService.findByName(term);
    spinner.stop();
    
    if (!result.success || result.data.length === 0) {
        displayWarning('Aucun client correspondant trouvé.');
        return;
    }
    
    const table = createStyledTable(['ID', 'Nom', 'Prénom', 'Adresse']);
    result.data.forEach(c => table.push([
        c.id, c.nom, c.prenom, c.adresse || '—'
    ]));
    
    console.log('\n' + table.toString());
    console.log(c.success(`\n  ${result.data.length} résultat(s) trouvé(s)\n`));
}

async function editClient() {
    const { id } = await inquirer.prompt([{
        type: 'input',
        name: 'id',
        message: c.primary(`${THEME.icons.edit} ID du client à modifier:`)
    }]);
    
    const existing = await ClientService.getById(parseInt(id));
    if (!existing.success) {
        displayError('Client non trouvé.');
        return;
    }
    
    console.log(c.info(`\n  Client actuel: ${existing.data.nom} ${existing.data.prenom}\n`));
    
    const answers = await inquirer.prompt([
        { type: 'input', name: 'nom', message: c.primary('Nouveau nom:'), default: existing.data.nom },
        { type: 'input', name: 'prenom', message: c.primary('Nouveau prénom:'), default: existing.data.prenom },
        { type: 'input', name: 'adresse', message: c.primary('Nouvelle adresse:'), default: existing.data.adresse }
    ]);
    
    const result = await ClientService.update(parseInt(id), answers);
    if (result.success) {
        displaySuccess('Client mis à jour avec succès!');
    } else {
        displayError(`Erreur: ${result.message}`);
    }
}

async function deleteClient() {
    const { id } = await inquirer.prompt([{
        type: 'input',
        name: 'id',
        message: c.secondary(`${THEME.icons.delete} ID du client à supprimer:`)
    }]);
    
    const existing = await ClientService.getById(parseInt(id));
    if (!existing.success) {
        displayError('Client non trouvé.');
        return;
    }
    
    console.log(c.warning(`\n  ${THEME.icons.warning} Vous allez supprimer: ${existing.data.nom} ${existing.data.prenom}\n`));
    
    const { confirm } = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: c.secondary('Confirmer la suppression?'),
        default: false
    }]);
    
    if (!confirm) {
        displayInfo('Suppression annulée.');
        return;
    }
    
    const result = await ClientService.delete(parseInt(id));
    if (result.success) {
        displaySuccess('Client supprimé avec succès!');
    } else {
        displayError(`Erreur: ${result.message}`);
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🛏️ CHAMBRES MENU
// ═══════════════════════════════════════════════════════════════════════════════

async function chambresMenu() {
    showHeader(`${THEME.icons.room} GESTION DES CHAMBRES`);
    
    const { action } = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: c.emerald(`${THEME.icons.rooms} Choisissez une action:`),
        choices: [
            { name: `${THEME.icons.list}  Lister toutes les chambres`, value: 'list' },
            { name: `${THEME.icons.add}  Ajouter une chambre`, value: 'add' },
            { name: `${THEME.icons.search}  Vérifier disponibilité`, value: 'check' },
            { name: `${THEME.icons.calendar}  Chambres disponibles (période)`, value: 'available' },
            { name: `${THEME.icons.delete}  Supprimer une chambre`, value: 'delete' },
            new inquirer.Separator(c.muted('─'.repeat(40))),
            { name: `${THEME.icons.back}  ${c.warning('Retour au menu principal')}`, value: 'back' }
        ]
    }]);
    
    switch (action) {
        case 'list': await listChambres(); break;
        case 'add': await addChambre(); break;
        case 'check': await checkChambreAvailability(); break;
        case 'available': await findAvailableChambres(); break;
        case 'delete': await deleteChambre(); break;
        case 'back': await mainMenu(); return;
    }
    
    await pauseAndReturn(chambresMenu);
}

async function listChambres() {
    const spinner = ora({
        text: c.info('Chargement des chambres...'),
        spinner: 'dots12',
        color: 'cyan'
    }).start();
    
    const result = await ChambreService.getAll();
    spinner.stop();
    
    if (!result.success || result.data.length === 0) {
        displayWarning('Aucune chambre trouvée.');
        return;
    }
    
    // Group by floor for visual display
    const byFloor = {};
    result.data.forEach(ch => {
        const floor = ch.numero_chambre.charAt(0);
        if (!byFloor[floor]) byFloor[floor] = [];
        byFloor[floor].push(ch.numero_chambre);
    });
    
    console.log(c.success(`\n  ${THEME.icons.rooms} Total: ${result.data.length} chambres\n`));
    console.log(c.muted('  ─'.repeat(35)));
    
    Object.keys(byFloor).sort().forEach(floor => {
        const rooms = byFloor[floor];
        const emoji = floor <= 2 ? '🏠' : floor <= 5 ? '🏢' : '🏰';
        console.log(`\n  ${emoji} ${c.gold('Étage ' + floor)} ${c.muted('(' + rooms.length + ' chambres)')}`);
        
        // Display in rows of 8
        for (let i = 0; i < rooms.length; i += 8) {
            const row = rooms.slice(i, i + 8).map(r => c.primary(r)).join(c.muted(' │ '));
            console.log(`     ${row}`);
        }
    });
    
    console.log('\n' + c.muted('  ─'.repeat(35)));
}

async function addChambre() {
    const countResult = await ChambreService.getAll();
    if (countResult.success && countResult.data.length >= 80) {
        displayError('Limite maximale de 80 chambres atteinte!');
        return;
    }
    
    console.log(c.info(`\n  ${THEME.icons.add} Nouvelle Chambre\n`));
    console.log(c.muted(`  Chambres existantes: ${countResult.data?.length || 0}/80\n`));
    
    const answers = await inquirer.prompt([
        { 
            type: 'input', 
            name: 'numero_chambre', 
            message: c.primary('Numéro de chambre (ex: 101):'),
            validate: v => v.trim() ? true : c.secondary('Le numéro est requis')
        },
        { 
            type: 'input', 
            name: 'telephone', 
            message: c.primary('Téléphone (optionnel):')
        }
    ]);
    
    const spinner = ora({
        text: c.info('Création de la chambre...'),
        spinner: 'dots12',
        color: 'cyan'
    }).start();
    
    const result = await ChambreService.create(answers);
    spinner.stop();
    
    if (result.success) {
        displaySuccess(`Chambre ${answers.numero_chambre} créée avec succès!`);
    } else {
        displayError(`Erreur: ${result.message}`);
    }
}

async function checkChambreAvailability() {
    const { numero } = await inquirer.prompt([{
        type: 'input',
        name: 'numero',
        message: c.primary(`${THEME.icons.search} Numéro de chambre:`)
    }]);
    
    const { dateDebut, dateFin } = await inquirer.prompt([
        { type: 'input', name: 'dateDebut', message: c.primary('Date début (YYYY-MM-DD):') },
        { type: 'input', name: 'dateFin', message: c.primary('Date fin (YYYY-MM-DD):') }
    ]);
    
    const chambre = await ChambreService.getByNumero(numero);
    if (!chambre.success) {
        displayError('Chambre non trouvée.');
        return;
    }
    
    const available = await ChambreService.isAvailable(chambre.data.id, dateDebut, dateFin);
    
    if (available.success && available.data) {
        displaySuccess(`Chambre ${numero} est DISPONIBLE pour cette période!`);
    } else {
        displayWarning(`Chambre ${numero} n'est PAS disponible pour cette période.`);
    }
}

async function findAvailableChambres() {
    const { dateDebut, dateFin } = await inquirer.prompt([
        { type: 'input', name: 'dateDebut', message: c.primary('Date début (YYYY-MM-DD):') },
        { type: 'input', name: 'dateFin', message: c.primary('Date fin (YYYY-MM-DD):') }
    ]);
    
    const spinner = ora({
        text: c.info('Recherche des chambres disponibles...'),
        spinner: 'dots12',
        color: 'cyan'
    }).start();
    
    const result = await ChambreService.getAvailableRooms(dateDebut, dateFin);
    spinner.stop();
    
    if (!result.success || result.data.length === 0) {
        displayWarning('Aucune chambre disponible pour cette période.');
        return;
    }
    
    console.log(c.success(`\n  ${THEME.icons.check} ${result.data.length} chambre(s) disponible(s):\n`));
    
    const rooms = result.data.map(ch => c.success(ch.numero_chambre)).join(c.muted(' │ '));
    console.log(`  ${rooms}\n`);
}

async function deleteChambre() {
    const { id } = await inquirer.prompt([{
        type: 'input',
        name: 'id',
        message: c.secondary(`${THEME.icons.delete} ID de la chambre à supprimer:`)
    }]);
    
    const { confirm } = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: c.secondary('Confirmer la suppression?'),
        default: false
    }]);
    
    if (!confirm) {
        displayInfo('Suppression annulée.');
        return;
    }
    
    const result = await ChambreService.delete(parseInt(id));
    if (result.success) {
        displaySuccess('Chambre supprimée avec succès!');
    } else {
        displayError(`Erreur: ${result.message}`);
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📅 RESERVATIONS MENU
// ═══════════════════════════════════════════════════════════════════════════════

async function reservationsMenu() {
    showHeader(`${THEME.icons.reservation} GESTION DES RÉSERVATIONS`);
    
    const { action } = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: c.accent(`${THEME.icons.calendar} Choisissez une action:`),
        choices: [
            { name: `${THEME.icons.list}  Lister toutes les réservations`, value: 'list' },
            { name: `${THEME.icons.add}  Créer une nouvelle réservation`, value: 'create' },
            { name: `${THEME.icons.search}  Voir détails d'une réservation`, value: 'details' },
            new inquirer.Separator(c.muted('─ Gestion des états ─'.padStart(30))),
            { name: `${THEME.icons.valid}  Valider une réservation`, value: 'validate' },
            { name: `${THEME.icons.cancel}  Annuler une réservation`, value: 'cancel' },
            { name: `${THEME.icons.close}  Clôturer une réservation`, value: 'close' },
            new inquirer.Separator(c.muted('─ Gestion des chambres ─'.padStart(30))),
            { name: `${THEME.icons.add}  Ajouter chambre à réservation`, value: 'addRoom' },
            { name: `${THEME.icons.delete}  Retirer chambre de réservation`, value: 'removeRoom' },
            new inquirer.Separator(c.muted('─'.repeat(40))),
            { name: `${THEME.icons.back}  ${c.warning('Retour au menu principal')}`, value: 'back' }
        ],
        pageSize: 15
    }]);
    
    switch (action) {
        case 'list': await listReservations(); break;
        case 'create': await createReservation(); break;
        case 'details': await showReservationDetails(); break;
        case 'validate': await validateReservation(); break;
        case 'cancel': await cancelReservation(); break;
        case 'close': await closeReservation(); break;
        case 'addRoom': await addRoomToReservation(); break;
        case 'removeRoom': await removeRoomFromReservation(); break;
        case 'back': await mainMenu(); return;
    }
    
    await pauseAndReturn(reservationsMenu);
}

async function listReservations() {
    const spinner = ora({
        text: c.info('Chargement des réservations...'),
        spinner: 'dots12',
        color: 'cyan'
    }).start();
    
    const result = await ReservationService.getAll();
    spinner.stop();
    
    if (!result.success || result.data.length === 0) {
        displayWarning('Aucune réservation trouvée.');
        return;
    }
    
    const table = createStyledTable(['ID', 'Code', 'Client', 'Dates', 'Chambres', 'État'], {
        colWidths: [6, 15, 22, 24, 12, 16]
    });
    
    result.data.forEach(r => {
        const clientName = r.client ? `${r.client.nom} ${r.client.prenom}` : '—';
        const dates = `${new Date(r.dateDebut).toLocaleDateString('fr-FR')} → ${new Date(r.dateFin).toLocaleDateString('fr-FR')}`;
        const roomCount = r.chambres ? r.chambres.length : 0;
        
        table.push([
            c.gold(r.id.toString()),
            c.primary(r.code || '—'),
            chalk.white(clientName.substring(0, 20)),
            c.muted(dates),
            c.info(roomCount.toString()),
            getStatusBadge(r.etat)
        ]);
    });
    
    console.log('\n' + table.toString());
    console.log(c.success(`\n  Total: ${result.data.length} réservation(s)\n`));
}

async function createReservation() {
    console.log(c.info(`\n  ${THEME.icons.add} Nouvelle Réservation\n`));
    
    // List clients for selection
    const clientsResult = await ClientService.getAll();
    if (!clientsResult.success || clientsResult.data.length === 0) {
        displayError('Aucun client disponible. Créez d\'abord un client.');
        return;
    }
    
    const clientChoices = clientsResult.data.map(cl => ({
        name: `${cl.id}. ${cl.nom} ${cl.prenom}`,
        value: cl.id
    }));
    
    const { clientId, dateDebut, dateFin } = await inquirer.prompt([
        {
            type: 'list',
            name: 'clientId',
            message: c.primary(`${THEME.icons.client} Sélectionnez le client:`),
            choices: clientChoices,
            pageSize: 10
        },
        {
            type: 'input',
            name: 'dateDebut',
            message: c.primary('Date de début (YYYY-MM-DD):'),
            validate: v => /^\d{4}-\d{2}-\d{2}$/.test(v) ? true : 'Format: YYYY-MM-DD'
        },
        {
            type: 'input',
            name: 'dateFin',
            message: c.primary('Date de fin (YYYY-MM-DD):'),
            validate: v => /^\d{4}-\d{2}-\d{2}$/.test(v) ? true : 'Format: YYYY-MM-DD'
        }
    ]);
    
    // Get available rooms
    const availableResult = await ChambreService.getAvailableRooms(dateDebut, dateFin);
    if (!availableResult.success || availableResult.data.length === 0) {
        displayWarning('Aucune chambre disponible pour cette période.');
        return;
    }
    
    const roomChoices = availableResult.data.map(ch => ({
        name: `Chambre ${ch.numero_chambre}`,
        value: ch.id
    }));
    
    const { chambreIds } = await inquirer.prompt([{
        type: 'checkbox',
        name: 'chambreIds',
        message: c.primary(`${THEME.icons.room} Sélectionnez les chambres:`),
        choices: roomChoices,
        validate: v => v.length > 0 ? true : 'Sélectionnez au moins une chambre'
    }]);
    
    const spinner = ora({
        text: c.info('Création de la réservation...'),
        spinner: 'dots12',
        color: 'cyan'
    }).start();
    
    const result = await ReservationService.create({
        clientId,
        dateDebut,
        dateFin,
        chambreIds
    });
    
    spinner.stop();
    
    if (result.success) {
        displaySuccess(`Réservation créée! Code: ${result.data.code}`);
    } else {
        displayError(`Erreur: ${result.message}`);
    }
}

async function showReservationDetails() {
    const { id } = await inquirer.prompt([{
        type: 'input',
        name: 'id',
        message: c.primary(`${THEME.icons.search} ID de la réservation:`)
    }]);
    
    const spinner = ora({
        text: c.info('Chargement...'),
        spinner: 'dots12',
        color: 'cyan'
    }).start();
    
    const result = await ReservationService.getById(parseInt(id));
    spinner.stop();
    
    if (!result.success) {
        displayError('Réservation non trouvée.');
        return;
    }
    
    const r = result.data;
    const duration = await ReservationService.calculateDuration(r.dateDebut, r.dateFin);
    
    console.log('\n');
    console.log(c.muted('  ═'.repeat(35)));
    console.log(c.gold(`  ${THEME.icons.reservation} DÉTAILS RÉSERVATION #${r.id}`));
    console.log(c.muted('  ═'.repeat(35)));
    console.log();
    
    displayStatusLine(THEME.icons.key, 'Code', r.code || '—', 'primary');
    displayStatusLine(THEME.icons.client, 'Client', r.client ? `${r.client.nom} ${r.client.prenom}` : '—', 'info');
    displayStatusLine(THEME.icons.calendar, 'Début', new Date(r.dateDebut).toLocaleDateString('fr-FR'), 'success');
    displayStatusLine(THEME.icons.calendar, 'Fin', new Date(r.dateFin).toLocaleDateString('fr-FR'), 'success');
    displayStatusLine(THEME.icons.time, 'Durée', `${duration.data || 0} nuit(s)`, 'gold');
    console.log(`  ${THEME.icons.check} ${c.muted('État:')} ${getStatusBadge(r.etat)}`);
    
    if (r.chambres && r.chambres.length > 0) {
        console.log(`\n  ${THEME.icons.room} ${c.muted('Chambres réservées:')}`);
        r.chambres.forEach(ch => {
            console.log(`     ${c.primary('•')} Chambre ${c.success(ch.numero_chambre)}`);
        });
    }
    
    console.log('\n' + c.muted('  ═'.repeat(35)));
}

async function validateReservation() {
    const { id } = await inquirer.prompt([{
        type: 'input',
        name: 'id',
        message: c.success(`${THEME.icons.valid} ID de la réservation à valider:`)
    }]);
    
    const result = await ReservationService.validate(parseInt(id));
    if (result.success) {
        displaySuccess('Réservation validée avec succès!');
    } else {
        displayError(`Erreur: ${result.message}`);
    }
}

async function cancelReservation() {
    const { id } = await inquirer.prompt([{
        type: 'input',
        name: 'id',
        message: c.warning(`${THEME.icons.cancel} ID de la réservation à annuler:`)
    }]);
    
    const { confirm } = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: c.warning('Confirmer l\'annulation?'),
        default: false
    }]);
    
    if (!confirm) {
        displayInfo('Annulation abandonnée.');
        return;
    }
    
    const result = await ReservationService.cancel(parseInt(id));
    if (result.success) {
        displaySuccess('Réservation annulée avec succès!');
    } else {
        displayError(`Erreur: ${result.message}`);
    }
}

async function closeReservation() {
    const { id } = await inquirer.prompt([{
        type: 'input',
        name: 'id',
        message: c.muted(`${THEME.icons.close} ID de la réservation à clôturer:`)
    }]);
    
    const result = await ReservationService.close(parseInt(id));
    if (result.success) {
        displaySuccess('Réservation clôturée avec succès!');
    } else {
        displayError(`Erreur: ${result.message}`);
    }
}

async function addRoomToReservation() {
    const { reservationId, chambreId } = await inquirer.prompt([
        { type: 'input', name: 'reservationId', message: c.primary('ID de la réservation:') },
        { type: 'input', name: 'chambreId', message: c.primary('ID de la chambre à ajouter:') }
    ]);
    
    const result = await ReservationService.addRoom(parseInt(reservationId), parseInt(chambreId));
    if (result.success) {
        displaySuccess('Chambre ajoutée à la réservation!');
    } else {
        displayError(`Erreur: ${result.message}`);
    }
}

async function removeRoomFromReservation() {
    const { reservationId, chambreId } = await inquirer.prompt([
        { type: 'input', name: 'reservationId', message: c.primary('ID de la réservation:') },
        { type: 'input', name: 'chambreId', message: c.primary('ID de la chambre à retirer:') }
    ]);
    
    const result = await ReservationService.removeRoom(parseInt(reservationId), parseInt(chambreId));
    if (result.success) {
        displaySuccess('Chambre retirée de la réservation!');
    } else {
        displayError(`Erreur: ${result.message}`);
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════

async function showDashboard() {
    showHeader(`${THEME.icons.dashboard} DASHBOARD & STATISTIQUES`);
    
    const spinner = ora({
        text: c.info('Chargement des statistiques...'),
        spinner: 'dots12',
        color: 'cyan'
    }).start();
    
    const stats = await ReservationService.getStatistics();
    spinner.stop();
    
    if (!stats.success) {
        displayError('Impossible de charger les statistiques.');
        await pauseAndReturn(mainMenu);
        return;
    }
    
    const data = stats.data;
    
    // Main stats box
    console.log('\n');
    console.log(c.muted('  ╔' + '═'.repeat(70) + '╗'));
    console.log(c.muted('  ║') + c.gold.bold('                    📊 STATISTIQUES GLOBALES                        ') + c.muted('║'));
    console.log(c.muted('  ╠' + '═'.repeat(70) + '╣'));
    
    console.log(c.muted('  ║') + `  ${THEME.icons.clients}  Clients enregistrés:      `.padEnd(40) + c.success.bold((data.totalClients || 0).toString().padStart(8)) + '                      ' + c.muted('║'));
    console.log(c.muted('  ║') + `  ${THEME.icons.rooms}  Chambres dans l'hôtel:    `.padEnd(40) + c.info.bold((data.totalChambres || 0).toString().padStart(8)) + ' / 80                 ' + c.muted('║'));
    console.log(c.muted('  ║') + `  ${THEME.icons.calendar}  Total réservations:       `.padEnd(40) + c.accent.bold((data.totalReservations || 0).toString().padStart(8)) + '                      ' + c.muted('║'));
    
    console.log(c.muted('  ╠' + '═'.repeat(70) + '╣'));
    console.log(c.muted('  ║') + c.info.bold('                    📈 RÉPARTITION PAR ÉTAT                         ') + c.muted('║'));
    console.log(c.muted('  ╠' + '═'.repeat(70) + '╣'));
    
    const byStatus = data.byStatus || {};
    console.log(c.muted('  ║') + `  ${THEME.icons.pending}  En attente (Pending):     `.padEnd(40) + c.warning.bold((byStatus.Pending || 0).toString().padStart(8)) + '                      ' + c.muted('║'));
    console.log(c.muted('  ║') + `  ${THEME.icons.valid}  Validées:                 `.padEnd(40) + c.success.bold((byStatus.Validated || 0).toString().padStart(8)) + '                      ' + c.muted('║'));
    console.log(c.muted('  ║') + `  ${THEME.icons.cancel}  Annulées:                 `.padEnd(40) + c.secondary.bold((byStatus.Canceled || 0).toString().padStart(8)) + '                      ' + c.muted('║'));
    console.log(c.muted('  ║') + `  ${THEME.icons.close}  Clôturées:                `.padEnd(40) + c.muted.bold((byStatus.Closed || 0).toString().padStart(8)) + '                      ' + c.muted('║'));
    
    console.log(c.muted('  ╚' + '═'.repeat(70) + '╝'));
    
    // Visual bar chart
    console.log('\n' + c.gold('  📊 Visualisation:'));
    console.log(c.muted('  ─'.repeat(35)));
    
    const maxVal = Math.max(byStatus.Pending || 0, byStatus.Validated || 0, byStatus.Canceled || 0, byStatus.Closed || 0, 1);
    
    const drawBar = (label, value, color, icon) => {
        const barLength = Math.round((value / maxVal) * 30);
        const bar = '█'.repeat(barLength) + '░'.repeat(30 - barLength);
        console.log(`  ${icon} ${c.muted(label.padEnd(12))} ${c[color](bar)} ${c[color](value)}`);
    };
    
    drawBar('En attente', byStatus.Pending || 0, 'warning', THEME.icons.pending);
    drawBar('Validées', byStatus.Validated || 0, 'success', THEME.icons.valid);
    drawBar('Annulées', byStatus.Canceled || 0, 'secondary', THEME.icons.cancel);
    drawBar('Clôturées', byStatus.Closed || 0, 'muted', THEME.icons.close);
    
    console.log('\n');
    
    await pauseAndReturn(mainMenu);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔧 UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

async function pauseAndReturn(menuFunc) {
    await inquirer.prompt([{
        type: 'input',
        name: 'continue',
        message: c.muted('\n  Appuyez sur Entrée pour continuer...')
    }]);
    await menuFunc();
}

async function exitApp() {
    showHeader();
    
    console.log(c.gold(`\n  ${THEME.icons.star} Merci d'avoir utilisé le système de gestion hôtelière!`));
    console.log(c.info(`\n  ${THEME.icons.sparkle} Développé par: ${c.accent.bold('Oussama SAJJI')}`));
    console.log(c.muted(`  ${THEME.icons.hotel} EMSI - École Marocaine des Sciences de l'Ingénieur\n`));
    
    await sequelize.close();
    process.exit(0);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
    try {
        // Database connection
        const spinner = ora({
            text: c.info('Connexion à la base de données...'),
            spinner: 'dots12',
            color: 'cyan'
        }).start();
        
        await sequelize.authenticate();
        spinner.succeed(c.success('Connecté à la base de données MySQL'));
        
        // Start menu
        await mainMenu();
    } catch (error) {
        console.log(c.secondary(`\n  ${THEME.icons.cross} Erreur de connexion à la base de données`));
        console.log(c.muted(`  ${error.message}`));
        console.log(c.warning(`\n  ${THEME.icons.warning} Vérifiez que MySQL est en cours d'exécution`));
        console.log(c.info(`  ${THEME.icons.info} Utilisez 'npm run db:setup' pour configurer la base de données\n`));
        process.exit(1);
    }
}

// Handle graceful exit
process.on('SIGINT', async () => {
    console.log(c.warning(`\n\n  ${THEME.icons.warning} Fermeture en cours...`));
    await sequelize.close();
    process.exit(0);
});

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { main, mainMenu };
