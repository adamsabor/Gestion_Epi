//********** Imports **********//
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { epiRoutes } from './routes/epiRoutes';
import { controleRoutes } from './routes/controleRoutes';
import { typeEpiRoutes } from './routes/typeEpiRoutes';

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

// Routes
app.use('/api/epis', epiRoutes);
app.use('/api/controles', controleRoutes);
app.use('/api/epi-types', typeEpiRoutes);

// Route de base pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.json({ message: 'API GestEPI fonctionnelle' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT} 🚀`);
});

export default app;