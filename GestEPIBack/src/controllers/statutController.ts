import { Request, Response } from 'express';
import { StatutModel } from '../models/statutModel';

export class StatutController {
  private statutModel: StatutModel;

  constructor() {
    this.statutModel = new StatutModel();
  }

  // Récupérer tous les statuts
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const statuts = await this.statutModel.findAll();
      res.status(200).json({
        message: 'Statuts récupérés avec succès',
        data: statuts
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des statuts:', error);
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération des statuts',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  };
}

// Exporter une instance du contrôleur
export const statutController = new StatutController(); 