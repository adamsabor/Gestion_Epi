import { Request, Response } from 'express';
import { AlerteModel } from '../models/alerteModel';

export class AlerteController {
  private alerteModel: AlerteModel;

  constructor() {
    this.alerteModel = new AlerteModel();
  }

  // Récupérer les EPIs dont le contrôle est à venir ou en retard
  getAlertes = async (req: Request, res: Response): Promise<void> => {
    try {
      const statut = req.query.statut as string | undefined;
      const alertes = await this.alerteModel.getAlertes(statut);
      
      res.status(200).json({
        message: 'Alertes récupérées avec succès',
        data: alertes
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des alertes:', error);
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération des alertes',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  };
}

// Exporter une instance du contrôleur
export const alerteController = new AlerteController();