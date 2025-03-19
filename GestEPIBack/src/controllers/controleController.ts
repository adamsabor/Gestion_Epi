import { Request, Response } from 'express';
import { db } from '../db';
import { Controle } from '../types';

export const controleController = {
  // Récupérer tous les contrôles
  getAll: async (req: Request, res: Response) => {
    try {
      const controles = await db.query(`
        SELECT c.*, e.identifiant_custom, e.marque, e.modèle 
        FROM controles c
        JOIN epis e ON c.epi_id = e.id
        ORDER BY c.date_controle DESC
      `);
      
      return res.status(200).json({
        message: 'Contrôles récupérés avec succès',
        data: controles
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des contrôles:', error);
      return res.status(500).json({
        message: 'Erreur serveur lors de la récupération des contrôles',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  },

  // Récupérer les contrôles d'un EPI spécifique
  getByEpiId: async (req: Request, res: Response) => {
    try {
      const { epiId } = req.params;
      
      const controles = await db.query(`
        SELECT * FROM controles 
        WHERE epi_id = ? 
        ORDER BY date_controle DESC
      `, [epiId]);
      
      return res.status(200).json({
        message: `Contrôles récupérés avec succès pour l'EPI ${epiId}`,
        data: controles
      });
    } catch (error) {
      console.error(`Erreur lors de la récupération des contrôles pour l'EPI ${req.params.epiId}:`, error);
      return res.status(500).json({
        message: `Erreur serveur lors de la récupération des contrôles pour l'EPI ${req.params.epiId}`,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  },

  // Créer un nouveau contrôle
  create: async (req: Request, res: Response) => {
    try {
      const controleData: Controle = req.body;
      
      // Validation des données
      if (!controleData.date_controle || !controleData.gestionnaire || !controleData.epi_id || !controleData.statut) {
        return res.status(400).json({
          message: 'Données invalides. Veuillez fournir toutes les informations requises.'
        });
      }
      
      // Vérifier si l'EPI existe
      const epi = await db.query('SELECT * FROM epis WHERE id = ?', [controleData.epi_id]);
      
      if (!epi || epi.length === 0) {
        return res.status(404).json({
          message: `Aucun EPI trouvé avec l'ID ${controleData.epi_id}`
        });
      }
      
      const result = await db.query('INSERT INTO controles SET ?', [controleData]);
      
      return res.status(201).json({
        message: 'Contrôle créé avec succès',
        data: { id: result.insertId, ...controleData }
      });
    } catch (error) {
      console.error('Erreur lors de la création du contrôle:', error);
      return res.status(500).json({
        message: 'Erreur serveur lors de la création du contrôle',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  },

  // Récupérer un contrôle par son ID
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const controle = await db.query('SELECT * FROM controles WHERE id = ?', [id]);
      
      if (!controle || controle.length === 0) {
        return res.status(404).json({ 
          message: 'Contrôle non trouvé' 
        });
      }
      
      return res.status(200).json({
        message: 'Contrôle récupéré avec succès',
        data: controle[0]
      });
    } catch (error) {
      console.error(`Erreur lors de la récupération du contrôle ${req.params.id}:`, error);
      return res.status(500).json({
        message: 'Erreur serveur lors de la récupération du contrôle',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }
}; 