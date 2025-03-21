import { Request, Response } from 'express';
import { ControleModel } from '../models/controleModel';
import { Controle } from '../types';

export class ControleController {
  private controleModel: ControleModel;

  constructor() {
    this.controleModel = new ControleModel();
  }

  // Récupérer tous les contrôles
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const controles = await this.controleModel.findAll();
      res.status(200).json({ message: 'Contrôles récupérés avec succès', data: controles });
    } catch (error) {
      console.error('Erreur lors de la récupération des contrôles:', error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des contrôles' });
    }
  };

  // Récupérer un contrôle par son ID
  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const controle = await this.controleModel.findById(id);
      
      if (!controle) {
        res.status(404).json({ message: 'Contrôle non trouvé' });
        return;
      }
      
      res.status(200).json({ message: 'Contrôle récupéré avec succès', data: controle });
    } catch (error) {
      console.error(`Erreur lors de la récupération du contrôle avec l'ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération du contrôle' });
    }
  };

  // Récupérer les contrôles d'un EPI spécifique
  getByEpiId = async (req: Request, res: Response): Promise<void> => {
    try {
      const epiId = parseInt(req.params.epiId);
      const controles = await this.controleModel.findByEpiId(epiId);
      
      res.status(200).json({ message: 'Contrôles récupérés avec succès', data: controles });
    } catch (error) {
      console.error(`Erreur lors de la récupération des contrôles pour l'EPI avec l'ID ${req.params.epiId}:`, error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des contrôles' });
    }
  };

  // Créer un nouveau contrôle
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const controleData = req.body as Controle;
      
      // Validation des données
      if (!controleData.date_controle || !controleData.gestionnaire_id || !controleData.epi_id || !controleData.statut_id) {
        res.status(400).json({ message: 'Données de contrôle incomplètes' });
        return;
      }
      
      const createdControle = await this.controleModel.create(controleData);
      res.status(201).json({ message: 'Contrôle créé avec succès', data: createdControle });
    } catch (error) {
      console.error('Erreur lors de la création du contrôle:', error);
      res.status(500).json({ message: 'Erreur serveur lors de la création du contrôle' });
    }
  };
}

// Exporter une instance du contrôleur
export const controleController = new ControleController(); 