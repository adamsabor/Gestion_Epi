import { Request, Response } from 'express';
import { GestionnaireModel } from '../models/gestionnaireModel';

export class GestionnaireController {
  private gestionnaireModel: GestionnaireModel;

  constructor() {
    this.gestionnaireModel = new GestionnaireModel();
  }

  // Récupérer tous les gestionnaires
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const gestionnaires = await this.gestionnaireModel.findAll();
      res.status(200).json({
        message: 'Gestionnaires récupérés avec succès',
        data: gestionnaires
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des gestionnaires:', error);
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération des gestionnaires',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  };
}

// Exporter une instance du contrôleur
export const gestionnaireController = new GestionnaireController();