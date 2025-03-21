import { db as database } from '../config/database';

/**
 * Utilitaire pour exécuter des requêtes SQL
 * Ce module sert d'abstraction pour interagir avec la base de données
 * et centralise la gestion des erreurs lors des requêtes
 */
export const db = {
  /**
   * Exécute une requête SQL avec des paramètres optionnels
   * 
   * @param sql La requête SQL à exécuter (ex: 'SELECT * FROM users WHERE id = $1')
   * @param params Les paramètres de la requête (optionnels) qui seront injectés de façon sécurisée
   *               pour éviter les injections SQL (ex: [1] pour remplacer $1)
   * @returns Une Promise contenant les résultats de la requête sous forme d'objet
   * @throws Propage l'erreur après l'avoir enregistrée dans la console
   * 
   * Exemple d'utilisation:
   * const users = await db.query('SELECT * FROM users WHERE role = $1', ['admin']);
   */
  query: async (sql: string, params?: any[]): Promise<any> => {
    try {
      // Délègue l'exécution à l'instance de base de données configurée
      return await database.query(sql, params);
    } catch (error) {
      // Journalisation de l'erreur pour faciliter le débogage
      console.error('Erreur lors de l\'exécution de la requête SQL:', error);
      // Propagation de l'erreur pour permettre sa gestion au niveau supérieur
      throw error;
    }
  }
}; 