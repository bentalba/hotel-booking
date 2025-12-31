/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                              ║
 * ║    🏨  SYSTÈME DE GESTION HÔTELIÈRE - SERVEUR EXPRESS                        ║
 * ║                                                                              ║
 * ║    API REST complète pour la gestion des réservations hôtelières            ║
 * ║    Architecture en couches: Controllers → Services → Models (Sequelize)     ║
 * ║                                                                              ║
 * ║    Développé par: Oussama SAJJI                                              ║
 * ║    EMSI - École Marocaine des Sciences de l'Ingénieur                        ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const chalk = require('chalk');
const figlet = require('figlet');
const swaggerSpec = require('./config/swagger');
const apiRoutes = require('./routes/api');
const { sequelize, testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 CONSOLE STYLING
// ═══════════════════════════════════════════════════════════════════════════════

const c = {
    primary: chalk.hex('#00D4FF'),
    secondary: chalk.hex('#FF6B6B'),
    success: chalk.hex('#00FF88'),
    warning: chalk.hex('#FFD93D'),
    info: chalk.hex('#6C5CE7'),
    accent: chalk.hex('#FD79A8'),
    muted: chalk.hex('#636E72'),
    gold: chalk.hex('#F1C40F')
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🛠️ MIDDLEWARES
// ═══════════════════════════════════════════════════════════════════════════════

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger with colors
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        const statusColor = status >= 500 ? c.secondary : status >= 400 ? c.warning : c.success;
        const methodColors = {
            GET: c.info,
            POST: c.success,
            PUT: c.warning,
            DELETE: c.secondary,
            PATCH: c.accent
        };
        const methodColor = methodColors[req.method] || c.muted;
        
        console.log(
            c.muted(`  ${new Date().toLocaleTimeString('fr-FR')}`) +
            methodColor(` ${req.method.padEnd(7)}`) +
            c.primary(req.path.substring(0, 40).padEnd(40)) +
            statusColor(` ${status}`) +
            c.muted(` ${duration}ms`)
        );
    });
    next();
});

// ═══════════════════════════════════════════════════════════════════════════════
// 🛤️ ROUTES
// ═══════════════════════════════════════════════════════════════════════════════

// Swagger Documentation with custom styling
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .info .title { color: #00D4FF }
    `,
    customSiteTitle: '🏨 API Gestion Hôtel - Documentation',
}));

// API Routes
app.use('/api/v1', apiRoutes);

// Root route - Beautiful JSON response
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🏨 Bienvenue sur l\'API de Gestion Hôtelière',
        version: '2.0.0',
        author: {
            name: 'Oussama SAJJI',
            school: 'EMSI - École Marocaine des Sciences de l\'Ingénieur'
        },
        links: {
            documentation: `http://localhost:${PORT}/api-docs`,
            health: `http://localhost:${PORT}/health`,
            api: `http://localhost:${PORT}/api/v1`
        },
        endpoints: {
            clients: 'GET /api/v1/clients',
            chambres: 'GET /api/v1/chambres',
            reservations: 'GET /api/v1/reservations',
            stats: 'GET /api/v1/reservations/dashboard/stats'
        },
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/health', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({
            status: 'healthy',
            database: 'connected',
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(503).json({
            status: 'unhealthy',
            database: 'disconnected',
            error: error.message
        });
    }
});

// ═══════════════════════════════════════════════════════════════════════════════
// ⚠️ ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════════════════

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route non trouvée',
        path: req.path,
        suggestion: 'Consultez /api-docs pour la documentation'
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(c.secondary(`  ❌ Erreur: ${err.message}`));
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Erreur serveur interne'
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 SERVER STARTUP
// ═══════════════════════════════════════════════════════════════════════════════

const displayBanner = () => {
    console.clear();
    console.log('\n');
    
    try {
        const banner = figlet.textSync('HOTEL API', {
            font: 'ANSI Shadow',
            horizontalLayout: 'fitted'
        });
        const lines = banner.split('\n');
        lines.forEach((line, i) => {
            const colors = [c.primary, c.info, c.accent, c.accent, c.info, c.primary];
            console.log(colors[i % colors.length](line));
        });
    } catch (e) {
        console.log(c.primary.bold('\n  🏨 HOTEL RESERVATION API'));
    }
    
    console.log(c.muted('═'.repeat(78)));
    console.log(c.gold('    ⭐ ') + chalk.white.bold('Système de Gestion de Réservations Hôtelières') + c.gold(' ⭐'));
    console.log(c.info('    ✨ ') + c.muted('Développé par: ') + c.accent.bold('Oussama SAJJI') + c.muted(' - EMSI') + c.info(' ✨'));
    console.log(c.muted('═'.repeat(78)));
    console.log();
};

const displayServerInfo = (dbConnected) => {
    console.log(c.muted('  ╔' + '═'.repeat(70) + '╗'));
    console.log(c.muted('  ║') + c.gold.bold('                       📊 STATUS SERVEUR                               ') + c.muted('║'));
    console.log(c.muted('  ╠' + '═'.repeat(70) + '╣'));
    
    const dbStatus = dbConnected ? c.success('✅ CONNECTÉ') : c.secondary('❌ DÉCONNECTÉ');
    console.log(c.muted('  ║') + `  🚀 Serveur:         ${c.success('EN LIGNE')}  │  Port: ${c.primary(PORT)}`.padEnd(78) + c.muted('║'));
    console.log(c.muted('  ║') + `  🗄️  Base de données: ${dbStatus}`.padEnd(79) + c.muted('║'));
    
    console.log(c.muted('  ╠' + '═'.repeat(70) + '╣'));
    console.log(c.muted('  ║') + `  📚 Documentation:   ${c.primary.underline(`http://localhost:${PORT}/api-docs`)}`.padEnd(79) + c.muted('║'));
    console.log(c.muted('  ║') + `  🔗 API Base:        ${c.primary.underline(`http://localhost:${PORT}/api/v1`)}`.padEnd(79) + c.muted('║'));
    console.log(c.muted('  ║') + `  💚 Health Check:    ${c.primary.underline(`http://localhost:${PORT}/health`)}`.padEnd(79) + c.muted('║'));
    console.log(c.muted('  ╚' + '═'.repeat(70) + '╝'));
    console.log();
    
    console.log(c.gold('  📝 Journal des requêtes:'));
    console.log(c.muted('  ─'.repeat(35)));
};

const startServer = async () => {
    displayBanner();
    
    console.log(c.info('  ⏳ Connexion à la base de données...'));
    const dbConnected = await testConnection();
    
    if (dbConnected) {
        console.log(c.success('  ✅ Base de données MySQL connectée!\n'));
    } else {
        console.log(c.warning('  ⚠️  Base de données non disponible'));
        console.log(c.muted('     Exécutez: npm run db:setup\n'));
    }
    
    app.listen(PORT, () => {
        displayServerInfo(dbConnected);
    });
};

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log(c.warning('\n\n  ⚠️  Arrêt du serveur...'));
    try { await sequelize.close(); } catch (e) { }
    console.log(c.info('  👋 Au revoir!\n'));
    process.exit(0);
});

startServer();

module.exports = app;
