// ************************************************************************
// 🎓 FICHIER DE CONFIGURATION DE LA BASE DE DONNÉES - PROJET GESTEPI
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📌 IMPORTS NÉCESSAIRES
// mysql2/promise : Module qui permet de se connecter à MySQL et d'exécuter des requêtes SQL
// Le mode "promise" permet d'utiliser async/await pour gérer l'asynchrone plus facilement
import mysql from 'mysql2/promise';

// dotenv : Module qui charge les variables d'environnement depuis un fichier .env
// Ces variables contiennent les informations sensibles comme les mots de passe
import dotenv from 'dotenv';

// ⚙️ CONFIGURATION DES VARIABLES D'ENVIRONNEMENT
// On charge le fichier .env qui contient nos variables de configuration
// Exemple de contenu du .env :
// DB_HOST=localhost
// DB_USER=root
// DB_PASSWORD=motdepasse
dotenv.config();

// 🔍 VÉRIFICATION DE LA CONFIGURATION (DEBUG)
// On affiche les paramètres de connexion dans la console
// Le mot de passe est masqué pour la sécurité
console.log('Configuration de la base de données:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? '******' : '(vide)',
  database: process.env.DB_NAME
});

// 🌊 CRÉATION DU POOL DE CONNEXIONS
// Un pool de connexions permet de réutiliser les connexions plutôt que d'en créer
// de nouvelles à chaque requête, ce qui améliore les performances
export const db = mysql.createPool({
  // Paramètres de connexion avec valeurs par défaut si non définies dans .env
  host: process.env.DB_HOST || 'localhost',      // Adresse du serveur MySQL
  port: parseInt(process.env.DB_PORT || '8889'), // Port MySQL (8889 pour MAMP)
  user: process.env.DB_USER || 'root',          // Nom d'utilisateur MySQL
  password: process.env.DB_PASSWORD || '',       // Mot de passe MySQL
  database: process.env.DB_NAME || 'gestepi',   // Nom de la base de données

  // Configuration du pool de connexions
  waitForConnections: true,     // Met en attente les connexions si pool plein
  connectionLimit: 10,          // Nombre maximum de connexions simultanées
  queueLimit: 0                 // Nombre illimité de connexions en attente
});

// 🔌 FONCTION DE TEST DE CONNEXION
// Fonction asynchrone qui vérifie si la connexion à la BDD fonctionne
// Promise<void> signifie que la fonction ne renvoie rien mais est asynchrone
export const testConnection = async (): Promise<void> => {
  try {
    // On tente d'obtenir une connexion du pool
    const connection = await db.getConnection();
    console.log('Connexion à la base de données établie avec succès');
    // On libère la connexion pour qu'elle retourne dans le pool
    connection.release();
  } catch (error) {
    // En cas d'erreur, on l'affiche et on la propage
    console.error('Erreur lors de la connexion à la base de données:', error);
    throw error;
  }
};

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est crucial car il gère la connexion à la base de données MySQL.
// Points importants à retenir :
// 1. Utilisation des variables d'environnement pour la sécurité
// 2. Pool de connexions pour optimiser les performances
// 3. Gestion des erreurs avec try/catch
// 4. Fonction de test pour vérifier la connexion
//
// Pour l'oral :
// - Expliquer l'importance de la sécurité (variables d'environnement)
// - Parler de l'optimisation (pool de connexions)
// - Mentionner la gestion des erreurs
// - Souligner l'importance des logs pour le debug