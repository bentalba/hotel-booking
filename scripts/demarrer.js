#!/usr/bin/env node
/**
 * Script "1 clic" :
 * - Installe les dépendances si besoin
 * - Prépare .env.local si manquant (copie depuis .env.example)
 * - Lance Next.js en développement
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = process.cwd();

function log(msg) {
  process.stdout.write(msg + "\n");
}

function run(cmd, args, options = {}) {
  const res = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: "inherit",
    shell: process.platform === "win32",
    ...options,
  });
  if (res.status !== 0) process.exit(res.status || 1);
}

function ensureEnv() {
  const envLocal = path.join(ROOT, ".env.local");
  const envExample = path.join(ROOT, ".env.example");

  if (!fs.existsSync(envLocal) && fs.existsSync(envExample)) {
    fs.copyFileSync(envExample, envLocal);
    log("✅ Fichier .env.local créé depuis .env.example");
    log("ℹ️  Pense à remplacer les valeurs (Clerk/Mapbox/DB) si nécessaire.");
  }
}

function ensureNodeModules() {
  const nm = path.join(ROOT, "node_modules");
  if (!fs.existsSync(nm)) {
    log("📦 Installation des dépendances (npm install)...");
    run("npm", ["install"]);
  }
}

function main() {
  log("\n🏁 Démarrage Atlas (mode 1 clic)\n");
  ensureNodeModules();
  ensureEnv();

  // Prisma est présent dans le repo, mais l'app peut fonctionner en mock.
  // On n'exécute pas prisma generate automatiquement pour éviter les erreurs DB.
  log("🚀 Lancement du serveur (npm run dev)...\n");
  run("npm", ["run", "dev"]);
}

main();
