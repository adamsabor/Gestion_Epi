//********** Imports **********//
import app from './app';
import dotenv from 'dotenv';
import { testConnection } from './config/database';

// Charger les variables d'environnement
dotenv.config();

// Tester la connexion à la base de données
testConnection()
  .then(() => {
    // Démarrer le serveur
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT} 🚀`);
    });
  })
  .catch((error) => {
    console.error('Erreur de connexion à la base de données:', error);
  });
