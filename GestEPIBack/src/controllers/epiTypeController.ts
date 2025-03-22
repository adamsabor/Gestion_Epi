import { Request, Response } from 'express';
import { TypeEpiModel } from '../models/typeEpiModel';

export class EpiTypeController {
  private typeEpiModel: TypeEpiModel;

  constructor() {
    this.typeEpiModel = new TypeEpiModel();
  }

  // Récupérer tous les types d'EPI
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const types = await this.typeEpiModel.findAll();
      res.status(200).json({
        message: 'Types d\'EPI récupérés avec succès',
        data: types
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des types d\'EPI:', error);
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération des types d\'EPI',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  };
}

// Exporter une instance du contrôleur
export const epiTypeController = new EpiTypeController();