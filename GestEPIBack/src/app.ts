//********** Imports **********//
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { router as apiRoutes } from './routes/index';
import * as middlewares from './middlewares';

// Charger les variables d'environnement
dotenv.config();

// Création de l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour gérer les CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes API
app.use('/api', apiRoutes);

// Route de base pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.json({ message: 'API GestEPI fonctionnelle' });
});

// Middleware de gestion des erreurs
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Supprimer ou commenter ces lignes si elles existent
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Serveur démarré sur http://localhost:${PORT} 🚀`);
// });

export default app;