import { db } from '../config/database';

export class StatutModel {
  // Récupérer tous les statuts
  async findAll(): Promise<any[]> {
    try {
      const [rows] = await db.query('SELECT * FROM Statut_EPI');
      return rows as any[];
    } catch (error) {
      console.error('Erreur lors de la récupération des statuts:', error);
      throw error;
    }
  }
} 