import { db } from '../config/database';

export class GestionnaireModel {
  // Récupérer tous les gestionnaires
  async findAll(): Promise<any[]> {
    try {
      const [rows] = await db.query('SELECT * FROM Utilisateur WHERE user_type_id = 1');
      return rows as any[];
    } catch (error) {
      console.error('Erreur lors de la récupération des gestionnaires:', error);
      throw error;
    }
  }
} 