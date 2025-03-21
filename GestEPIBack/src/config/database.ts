import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Après dotenv.config()
console.log('Configuration de la base de données:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? '******' : '(vide)',
  database: process.env.DB_NAME
});

// Créer un pool de connexions
export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '8889'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'GESTEPI',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Fonction pour tester la connexion à la base de données
export const testConnection = async (): Promise<void> => {
  try {
    const connection = await db.getConnection();
    console.log('Connexion à la base de données établie avec succès');
    connection.release();
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données:', error);
    throw error;
  }
}; 