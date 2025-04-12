//********** Imports **********//
// Express : Framework Node.js qui simplifie la création d'API web
import express from "express";
// CORS : Permet à notre API de communiquer avec le front-end React de manière sécurisée
import cors from "cors";
// dotenv : Charge les variables d'environnement depuis un fichier .env (ex: ports, URLs...)
import dotenv from 'dotenv';
// Importe toutes nos routes API définies dans le dossier routes
import { router as apiRoutes } from './routes/index';
// Importe les middlewares personnalisés pour gérer les erreurs
import * as middlewares from './middlewares';

// Charge les variables du fichier .env dans process.env
// Exemple : process.env.PORT pour le port du serveur
dotenv.config();

// Crée une nouvelle application Express - C'est le point de départ de notre serveur
const app = express();

// Permet à l'API de comprendre les données JSON envoyées par le front
// Sans ce middleware, on ne pourrait pas lire les données POST/PUT
app.use(express.json());

// Configuration de la sécurité CORS pour autoriser les requêtes du front-end
// CORS est crucial car le front et le back sont sur des ports différents
app.use(cors({
  // Autorise uniquement les requêtes venant de notre front React
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  // Définit les méthodes HTTP autorisées (GET pour lire, POST pour créer, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // Autorise ces en-têtes dans les requêtes
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connecte toutes nos routes d'API sous le préfixe '/api'
// Exemple: /api/controles, /api/epis, etc.
app.use('/api', apiRoutes);

// Route simple pour vérifier que l'API fonctionne
// Utile pour les tests ou la surveillance du serveur
app.get('/', (req, res) => {
  res.json({ message: 'API GestEPI fonctionnelle' });
});

// Gestion des erreurs avec nos middlewares personnalisés
// notFound : Gère les routes qui n'existent pas (404)
// errorHandler : Gère toutes les autres erreurs de manière propre
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Ces lignes sont commentées car le serveur est démarré ailleurs (probablement dans index.ts)
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Serveur démarré sur http://localhost:${PORT} 🚀`);
// });

// Exporte l'application pour pouvoir la démarrer depuis un autre fichier
export default app;

/*
RÉSUMÉ DU FICHIER app.ts :
Ce fichier est le cœur de notre API GestEPI. Il :
1. Configure le serveur Express et ses fonctionnalités essentielles
2. Gère la sécurité avec CORS pour communiquer avec le front React
3. Connecte toutes nos routes d'API (/api/controles, /api/epis, etc.)
4. Met en place la gestion des erreurs

C'est comme le "chef d'orchestre" qui coordonne tous les composants 
de notre back-end (routes, contrôleurs, modèles) pour servir les 
demandes du front-end React.
*/