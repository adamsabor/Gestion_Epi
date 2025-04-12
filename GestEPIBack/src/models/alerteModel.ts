// ********** IMPORTS **********
// On importe l'objet 'db' qui nous permet de nous connecter à la base de données MySQL
// Il vient du fichier database.ts qui configure la connexion
import { db } from '../config/database';

// On importe des fonctions utiles pour manipuler les dates depuis la librairie date-fns
// - addMonths : ajoute X mois à une date
// - format : convertit une date en chaîne de caractères (ex: "2024-01-25")
// - parseISO : convertit une chaîne en objet Date
import { addMonths, format, parseISO } from 'date-fns';

// ********** DÉFINITION DU MODÈLE **********
// Cette classe gère tout ce qui concerne les alertes pour les contrôles d'EPI
// Elle fait partie de la couche "Model" qui s'occupe des données
export class AlerteModel {

  // Cette méthode récupère tous les EPIs avec leur statut d'alerte
  // - Si on lui passe un statut en paramètre, elle filtre les résultats
  // - Elle renvoie un tableau d'objets contenant les infos des EPIs
  async getAlertes(statut?: string): Promise<any[]> {
    try {
      // On récupère la date d'aujourd'hui au format YYYY-MM-DD
      const today = format(new Date(), 'yyyy-MM-dd');
      
      // ********** REQUÊTE SQL **********
      // Cette requête complexe fait plusieurs choses :
      // 1. Récupère les infos de base des EPIs (table EPI)
      // 2. Joint avec la table Type_EPI pour avoir le nom du type
      // 3. Joint avec la table Controle_EPI pour avoir la date du dernier contrôle
      // 4. Groupe les résultats par EPI pour n'avoir qu'une ligne par EPI
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
      
      // ********** TRAITEMENT DES RÉSULTATS **********
      // Pour chaque EPI récupéré, on va :
      // 1. Calculer la date du prochain contrôle
      // 2. Déterminer son statut d'alerte
      const alertes = (epis as any[]).map((epi: any) => {
        // On détermine la date du dernier contrôle :
        // - Soit la date du dernier contrôle si elle existe
        // - Sinon la date de mise en service
        // - En dernier recours la date d'aujourd'hui
        let dernierControle;
        
        try {
          if (epi.dernier_controle && typeof epi.dernier_controle === 'string') {
            dernierControle = parseISO(epi.dernier_controle);
          } else if (epi.date_mise_en_service && typeof epi.date_mise_en_service === 'string') {
            dernierControle = parseISO(epi.date_mise_en_service);
          } else {
            dernierControle = new Date();
          }
        } catch (error) {
          // En cas d'erreur dans le format des dates, on utilise aujourd'hui
          console.error('Erreur lors du parsing de la date:', error);
          dernierControle = new Date();
        }
        
        // On calcule la date du prochain contrôle en ajoutant la périodicité
        // Par défaut, la périodicité est de 12 mois si non spécifiée
        const prochainControle = addMonths(dernierControle, epi.périodicité_controle || 12);
        const prochainControleStr = format(prochainControle, 'yyyy-MM-dd');
        
        // On détermine le statut de l'alerte :
        // - "En retard" si la date est dépassée (urgence haute)
        // - "À venir" si c'est dans moins d'un mois (urgence moyenne)
        // - "À jour" sinon (urgence normale)
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
        
        // On retourne l'EPI enrichi avec les nouvelles infos calculées
        return {
          ...epi,
          dernier_controle: epi.dernier_controle || epi.date_mise_en_service,
          prochain_controle: prochainControleStr,
          statut: statutEpi,
          urgence
        };
      });
      
      // Si un statut est demandé, on filtre les résultats
      // Sinon on renvoie tous les EPIs
      return statut 
        ? alertes.filter((alerte: any) => alerte.statut === statut)
        : alertes;
    } catch (error) {
      // En cas d'erreur, on la log et on la propage
      console.error('Erreur lors de la récupération des alertes:', error);
      throw error;
    }
  }
}

/*
RÉSUMÉ DU FICHIER alerteModel.ts :

Ce fichier est crucial pour la gestion des alertes de contrôle des EPIs.
Il fait partie de la couche "Model" et s'occupe de :

1. Récupérer les EPIs depuis la base de données avec leurs infos
2. Calculer pour chaque EPI :
   - La date du prochain contrôle
   - Son statut (En retard, À venir, À jour)
   - Le niveau d'urgence (haute, moyenne, normale)

C'est ce modèle qui permet d'afficher les alertes dans l'interface
et d'aider les gestionnaires à suivre les contrôles à effectuer.

Il interagit avec :
- La base de données (via l'objet db)
- Les tables : EPI, Type_EPI, Controle_EPI
- Le contrôleur qui l'utilise pour répondre aux requêtes HTTP
*/