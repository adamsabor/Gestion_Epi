// ************************************************************************
// 🎓 MODÈLE DES ALERTES - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// On importe l'objet db qui contient notre connexion à MySQL
// Il nous permet d'exécuter des requêtes SQL de façon sécurisée
import { db } from '../config/database';

// On importe des fonctions utilitaires de date-fns pour manipuler les dates :
// - addMonths : ajoute X mois à une date
// - format : convertit une date en chaîne (ex: "2024-01-25") 
// - parseISO : convertit une chaîne en objet Date
import { addMonths, format, parseISO } from 'date-fns';

// 🎯 CLASSE MODÈLE
// Cette classe gère toute la logique métier des alertes de contrôle des EPI
// Elle suit le pattern MVC en séparant l'accès aux données de la logique métier
export class AlerteModel {

  // 📥 MÉTHODE PRINCIPALE : RÉCUPÉRATION DES ALERTES
  // async car on fait des requêtes SQL qui sont asynchrones
  // statut? est un paramètre optionnel (le ? le rend facultatif)
  // Promise<any[]> indique qu'on renvoie un tableau d'objets
  async getAlertes(statut?: string): Promise<any[]> {
    try {
      // On récupère la date du jour au format YYYY-MM-DD
      // Cette date servira de référence pour calculer les délais
      const today = format(new Date(), 'yyyy-MM-dd');
      
      // REQUÊTE SQL COMPLEXE
      // 1. SELECT e.* : sélectionne toutes les colonnes de la table EPI
      // 2. JOIN avec Type_EPI : récupère le nom du type d'EPI
      // 3. LEFT JOIN avec Controle_EPI : récupère le dernier contrôle
      // 4. GROUP BY : regroupe les résultats par EPI
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
      
      // TRAITEMENT DES DONNÉES
      // Pour chaque EPI, on calcule son statut d'alerte
      // map() transforme chaque EPI en y ajoutant des informations
      const alertes = (epis as any[]).map((epi: any) => {
        // On détermine la date de référence pour les calculs
        // Soit le dernier contrôle, soit la mise en service
        let dernierControle;
        
        try {
          // GESTION DES DATES
          // On vérifie dans l'ordre :
          // 1. Date du dernier contrôle
          // 2. Date de mise en service
          // 3. Date du jour en dernier recours
          if (epi.dernier_controle && typeof epi.dernier_controle === 'string') {
            dernierControle = parseISO(epi.dernier_controle);
          } else if (epi.date_mise_en_service && typeof epi.date_mise_en_service === 'string') {
            dernierControle = parseISO(epi.date_mise_en_service);
          } else {
            dernierControle = new Date();
          }
        } catch (error) {
          // En cas d'erreur de format de date
          console.error('Erreur lors du parsing de la date:', error);
          dernierControle = new Date();
        }
        
        // CALCUL DU PROCHAIN CONTRÔLE
        // On ajoute la périodicité (en mois) à la date de référence
        // Par défaut : 12 mois si non spécifié
        const prochainControle = addMonths(dernierControle, epi.périodicité_controle || 12);
        const prochainControleStr = format(prochainControle, 'yyyy-MM-dd');
        
        // DÉTERMINATION DU STATUT
        // On compare les dates pour définir l'urgence :
        // - En retard : date dépassée
        // - À venir : dans moins d'un mois
        // - À jour : RAS
        let statutEpi = 'À jour';
        let urgence = 'normale';
        
        if (prochainControleStr < today) {
          statutEpi = 'En retard';
          urgence = 'haute';
        } else {
          const unMoisAvant = format(addMonths(prochainControle, -1), 'yyyy-MM-dd');
          if (today >= unMoisAvant) {
            statutEpi = 'À venir';
            urgence = 'moyenne';
          }
        }
        
        // On retourne l'objet EPI enrichi avec les nouvelles infos
        return {
          ...epi, // spread operator : copie toutes les propriétés existantes
          dernier_controle: epi.dernier_controle || epi.date_mise_en_service,
          prochain_controle: prochainControleStr,
          statut: statutEpi,
          urgence
        };
      });
      
      // FILTRAGE FINAL
      // Si un statut est demandé, on filtre les résultats
      // Sinon on renvoie tout
      return statut 
        ? alertes.filter((alerte: any) => alerte.statut === statut)
        : alertes;
        
    } catch (error) {
      // GESTION DES ERREURS
      // On log l'erreur et on la propage
      console.error('Erreur lors de la récupération des alertes:', error);
      throw error;
    }
  }
}

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce modèle est crucial car il gère la sécurité des EPI en :
// 1. Surveillant les dates de contrôle
// 2. Calculant les délais et urgences
// 3. Alertant sur les retards
//
// Points techniques à souligner :
// - Architecture MVC
// - Requêtes SQL complexes (JOIN, GROUP BY)
// - Gestion des dates avec date-fns
// - Programmation orientée objet avec TypeScript
// - Gestion des erreurs