// ************************************************************************
// 🎓 FICHIER PRINCIPAL - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// Express est le framework Node.js qu'on utilise pour créer notre API
import express from "express";
// CORS permet de sécuriser les appels HTTP entre le front et le back
import cors from "cors";
// dotenv permet de charger les variables d'environnement du fichier .env
import dotenv from 'dotenv';
// On importe nos routes définies dans le dossier routes
import apiRoutes from './routes/index';

// ⚙️ CONFIGURATION
// On charge les variables d'environnement (API_PORT, DB_HOST, etc.)
dotenv.config();

// 🔒 SÉCURITÉ CORS
// On définit quelles origines (URLs) peuvent appeler notre API
// En développement c'est localhost:3000, en prod c'est l'URL du front
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3000'];
// On configure les options CORS avec TypeScript
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// 🚀 CRÉATION DU SERVEUR EXPRESS
// Express facilite la création d'API REST
const app = express();
// On active CORS avec nos options de sécurité
app.use(cors(options));

// 📨 MIDDLEWARES
// Ces fonctions traitent les requêtes avant qu'elles n'atteignent nos routes
// express.json() permet de lire le corps des requêtes au format JSON
app.use(express.json());
// urlencoded permet de lire les données des formulaires
app.use(express.urlencoded({ extended: true }));

// 🛣️ ROUTES
// Toutes nos routes d'API commenceront par /api
// Exemple : /api/epis, /api/controles, etc.
app.use('/api', apiRoutes);

// 🏠 ROUTE RACINE
// Route simple pour vérifier que l'API fonctionne
// Utile pour les tests de connexion
app.get('/', (req, res) => {
  console.log("API en ligne");
  res.json({ message: 'API GestEPI fonctionnelle' });
});

// 📤 EXPORT
// On exporte l'app pour pouvoir la démarrer dans server.ts
export default app;

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est crucial car il :
// 1. Configure le serveur Express et ses middlewares
// 2. Gère la sécurité CORS pour les appels front-end
// 3. Définit les routes principales de l'API
// 4. Utilise les variables d'environnement pour la configuration
//
// Points techniques à souligner :
// - Architecture REST API
// - Sécurité (CORS)
// - Configuration modulaire
// - Gestion des environnements (dev/prod)
