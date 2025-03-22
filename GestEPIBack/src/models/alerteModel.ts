import { db } from '../config/database';
import { addMonths, format, parseISO } from 'date-fns';

export class AlerteModel {
  // Récupérer les EPIs avec leur statut d'alerte
  async getAlertes(statut?: string): Promise<any[]> {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      
      // Récupérer les EPIs avec leur dernier contrôle
      const [epis] = await db.query(`
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
      const alertes = (epis as any[]).map((epi: any) => {
        // Vérifier si dernier_controle est null et utiliser date_mise_en_service comme fallback
        let dernierControle;
        
        try {
          if (epi.dernier_controle && typeof epi.dernier_controle === 'string') {
            dernierControle = parseISO(epi.dernier_controle);
          } else if (epi.date_mise_en_service && typeof epi.date_mise_en_service === 'string') {
            dernierControle = parseISO(epi.date_mise_en_service);
          } else {
            // Si aucune date n'est disponible ou si le format n'est pas valide, utiliser la date actuelle
            dernierControle = new Date();
          }
        } catch (error) {
          console.error('Erreur lors du parsing de la date:', error);
          dernierControle = new Date(); // Utiliser la date actuelle en cas d'erreur
        }
        
        const prochainControle = addMonths(dernierControle, epi.périodicité_controle || 12);
        const prochainControleStr = format(prochainControle, 'yyyy-MM-dd');
        
        // Déterminer le statut (à venir, en retard, etc.)
        let statutEpi = 'À jour';
        let urgence = 'normale';
        
        if (prochainControleStr < today) {
          statutEpi = 'En retard';
          urgence = 'haute';
        } else {
          // Contrôle dans moins d'un mois
          const unMoisAvant = format(addMonths(prochainControle, -1), 'yyyy-MM-dd');
          if (today >= unMoisAvant) {
            statutEpi = 'À venir';
            urgence = 'moyenne';
          }
        }
        
        return {
          ...epi,
          dernier_controle: epi.dernier_controle || epi.date_mise_en_service,
          prochain_controle: prochainControleStr,
          statut: statutEpi,
          urgence
        };
      });
      
      // Filtrer selon le statut demandé
      return statut 
        ? alertes.filter((alerte: any) => alerte.statut === statut)
        : alertes;
    } catch (error) {
      console.error('Erreur lors de la récupération des alertes:', error);
      throw error;
    }
  }
}