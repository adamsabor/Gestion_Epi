import mariadb from 'mariadb';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Créer un pool de connexions à la base de données
const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'gestepi',
    connectionLimit: 5
});

// Exporter le pool pour l'utiliser dans d'autres fichiers
export default pool; 