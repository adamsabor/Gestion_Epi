import { Request, Response } from 'express';
import { db } from '../db';

export const epiTypeController = {
  // Récupérer tous les types d'EPI
  getAll: async (req: Request, res: Response) => {
    try {
      const types = await db.query('SELECT * FROM epi_types');
      return res.status(200).json({
        message: 'Types d\'EPI récupérés avec succès',
        data: types
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des types d\'EPI:', error);
      return res.status(500).json({
        message: 'Erreur serveur lors de la récupération des types d\'EPI',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }
}; 