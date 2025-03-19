import { db as mysqlPool } from '../config/database';

/**
 * Utilitaire pour exécuter des requêtes SQL
 */
export const db = {
  /**
   * Exécute une requête SQL avec des paramètres optionnels
   * @param sql La requête SQL à exécuter
   * @param params Les paramètres de la requête (optionnels)
   * @returns Les résultats de la requête
   */
  query: async (sql: string, params?: any[]): Promise<any> => {
    try {
      const [rows] = await mysqlPool.query(sql, params);
      return rows;
    } catch (error) {
      console.error('Erreur lors de l\'exécution de la requête SQL:', error);
      throw error;
    }
  }
}; 