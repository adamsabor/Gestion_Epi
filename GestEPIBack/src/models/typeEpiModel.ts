import { db } from '../config/database';
import { TypeEPI } from '../types';

export class TypeEpiModel {
  // Récupérer tous les types d'EPI
  async findAll(): Promise<TypeEPI[]> {
    try {
      const [rows] = await db.query('SELECT * FROM Type_EPI');
      return rows as TypeEPI[];
    } catch (error) {
      console.error('Erreur lors de la récupération des types d\'EPI:', error);
      throw error;
    }
  }

  // Récupérer un type d'EPI par son ID
  async findById(id: number): Promise<TypeEPI | null> {
    try {
      const [rows] = await db.query('SELECT * FROM Type_EPI WHERE id = ?', [id]);
      const types = rows as TypeEPI[];
      return types.length > 0 ? types[0] : null;
    } catch (error) {
      console.error(`Erreur lors de la récupération du type d'EPI avec l'ID ${id}:`, error);
      throw error;
    }
  }
} 