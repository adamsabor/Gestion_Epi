//********** Imports **********//
import app from './app';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Démarrage du serveur
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT} 🚀`);
});
