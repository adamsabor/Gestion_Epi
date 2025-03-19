import dotenv from 'dotenv';
import app from './app';

// Charger les variables d'environnement
dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
}); 