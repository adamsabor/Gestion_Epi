// ********** IMPORTS **********
// mysql2/promise : Module qui permet de se connecter à MySQL de façon asynchrone (avec async/await)
// C'est la bibliothèque principale pour interagir avec notre base de données
import mysql from 'mysql2/promise';

// dotenv : Module qui permet de charger les variables d'environnement depuis un fichier .env
// Ces variables contiennent les informations sensibles comme les mots de passe
import dotenv from 'dotenv';

// ********** CONFIGURATION **********
// On charge les variables du fichier .env dans process.env
// Ça nous permet d'accéder aux variables comme process.env.DB_HOST
dotenv.config();

// On affiche la configuration dans la console pour vérifier
// SÉCURITÉ : On masque le mot de passe avec des étoiles
console.log('Configuration de la base de données:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? '******' : '(vide)',
  database: process.env.DB_NAME
});

// ********** CRÉATION DU POOL DE CONNEXIONS **********
// Un "pool" est un groupe de connexions réutilisables à la base de données
// C'est plus efficace que de créer une nouvelle connexion à chaque requête
export const db = mysql.createPool({
  // Configuration de la connexion avec valeurs par défaut si non définies dans .env
  host: process.env.DB_HOST || 'localhost',     // Adresse du serveur MySQL
  port: parseInt(process.env.DB_PORT || '8889'), // Port MySQL (MAMP utilise 8889)
  user: process.env.DB_USER || 'root',          // Nom d'utilisateur MySQL
  password: process.env.DB_PASSWORD || '',       // Mot de passe MySQL
  database: process.env.DB_NAME || 'gestepi',   // Nom de la base de données

  // Paramètres du pool de connexions
  waitForConnections: true,     // Attendre si toutes les connexions sont utilisées
  connectionLimit: 10,          // Nombre maximum de connexions simultanées
  queueLimit: 0                 // Pas de limite dans la file d'attente
});

// ********** FONCTION DE TEST DE CONNEXION **********
// Cette fonction permet de vérifier si on peut se connecter à la base
// Elle est utilisée au démarrage du serveur pour s'assurer que tout fonctionne
export const testConnection = async (): Promise<void> => {
  try {
    // On essaie d'obtenir une connexion du pool
    const connection = await db.getConnection();
    console.log('Connexion à la base de données établie avec succès');
    // On libère la connexion pour qu'elle soit réutilisable
    connection.release();
  } catch (error) {
    // Si la connexion échoue, on affiche l'erreur
    console.error('Erreur lors de la connexion à la base de données:', error);
    throw error;
  }
};

/*
RÉSUMÉ DU FICHIER database.ts :
Ce fichier est CRUCIAL car il configure la connexion à la base de données MySQL.
Il est utilisé par TOUS les modèles (epiModel.ts, controleModel.ts, etc.) pour :
1. Se connecter à la base de données de façon sécurisée
2. Exécuter les requêtes SQL
3. Gérer efficacement les connexions grâce au pool

C'est comme le "pont" entre notre application Node.js et la base de données MySQL !
*/