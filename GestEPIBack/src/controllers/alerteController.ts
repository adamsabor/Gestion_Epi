import { Request, Response } from 'express';
import { db } from '../db';
import { addMonths, format, parseISO } from 'date-fns';

export const alerteController = {
  // Récupérer les EPIs dont le contrôle est à venir ou en retard
  getAlertes: async (req: Request, res: Response) => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      
      // Récupérer les EPIs avec leur dernier contrôle
      const epis = await db.query(`
        SELECT e.*, 
               t.nom as type_nom,
               MAX(c.date_controle) as dernier_controle,
               e.périodicité_controle
        FROM EPI e
        JOIN Type_EPI t ON e.epi_type_id = t.id
        LEFT JOIN Controle_EPI c ON e.id = c.epi_id
        GROUP BY e.id
      `);
      
      // Calculer la date du prochain contrôle et déterminer le statut
      const alertes = epis.map((epi: any) => {
        const dernierControle = epi.dernier_controle 
          ? parseISO(epi.dernier_controle) 
          : parseISO(epi.date_mise_en_service);
        
        const prochainControle = addMonths(dernierControle, epi.périodicité_controle);
        const prochainControleStr = format(prochainControle, 'yyyy-MM-dd');
        
        // Déterminer le statut (à venir, en retard, etc.)
        let statut = 'À jour';
        let urgence = 'normale';
        
        if (prochainControleStr < today) {
          statut = 'En retard';
          urgence = 'haute';
        } else {
          // Contrôle dans moins d'un mois
          const unMoisAvant = format(addMonths(prochainControle, -1), 'yyyy-MM-dd');
          if (today >= unMoisAvant) {
            statut = 'À venir';
            urgence = 'moyenne';
          }
        }
        
        return {
          ...epi,
          dernier_controle: epi.dernier_controle || epi.date_mise_en_service,
          prochain_controle: prochainControleStr,
          statut,
          urgence
        };
      });
      
      // Filtrer selon les paramètres de requête
      const { statut } = req.query;
      const filteredAlertes = statut 
        ? alertes.filter((alerte: any) => alerte.statut === statut)
        : alertes;
      
      return res.status(200).json({
        message: 'Alertes récupérées avec succès',
        data: filteredAlertes
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des alertes:', error);
      return res.status(500).json({
        message: 'Erreur serveur lors de la récupération des alertes',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }
}; 