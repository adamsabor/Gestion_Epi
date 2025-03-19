import { Request, Response } from 'express';
import { EpiModel } from '../models/epiModel';

export class EpiController {
  private epiModel: EpiModel;

  constructor() {
    this.epiModel = new EpiModel();
  }

  // Récupérer tous les EPIs
  getAllEpis = async (req: Request, res: Response): Promise<void> => {
    try {
      const epis = await this.epiModel.findAll();
      res.status(200).json({ message: 'EPIs récupérés avec succès', data: epis });
    } catch (error) {
      console.error('Erreur lors de la récupération des EPIs:', error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des EPIs' });
    }
  };

  // Récupérer un EPI par son ID
  getEpiById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const epi = await this.epiModel.findById(id);
      
      if (!epi) {
        res.status(404).json({ message: 'EPI non trouvé' });
        return;
      }
      
      res.status(200).json({ message: 'EPI récupéré avec succès', data: epi });
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'EPI avec l'ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'EPI' });
    }
  };

  // Créer un nouvel EPI
  createEpi = async (req: Request, res: Response): Promise<void> => {
    try {
      const newEpi = req.body;
      const createdEpi = await this.epiModel.create(newEpi);
      res.status(201).json({ message: 'EPI créé avec succès', data: createdEpi });
    } catch (error) {
      console.error('Erreur lors de la création de l\'EPI:', error);
      res.status(500).json({ message: 'Erreur serveur lors de la création de l\'EPI' });
    }
  };

  // Mettre à jour un EPI
  updateEpi = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const epiData = req.body;
      const updatedEpi = await this.epiModel.update(id, epiData);
      
      if (!updatedEpi) {
        res.status(404).json({ message: 'EPI non trouvé' });
        return;
      }
      
      res.status(200).json({ message: 'EPI mis à jour avec succès', data: updatedEpi });
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'EPI avec l'ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de l\'EPI' });
    }
  };

  // Supprimer un EPI
  deleteEpi = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.epiModel.delete(id);
      
      if (!deleted) {
        res.status(404).json({ message: 'EPI non trouvé' });
        return;
      }
      
      res.status(200).json({ message: 'EPI supprimé avec succès' });
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'EPI avec l'ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'EPI' });
    }
  };
} 