// ********** IMPORTS **********
// On importe les types Request et Response depuis Express
// Request : contient toutes les infos de la requête reçue (URL, paramètres, etc.)
// Response : permet d'envoyer une réponse au client (succès ou erreur)
import { Request, Response } from 'express';

// On importe notre modèle StatutModel qui gère l'accès à la base de données
// C'est lui qui contient les requêtes SQL pour les statuts des EPIs
// (ex: "En service", "Hors service", "En contrôle", etc.)
import { StatutModel } from '../models/statutModel';

// ********** DÉFINITION DU CONTRÔLEUR **********
// Cette classe fait le lien entre :
// 1. Les routes (URLs comme /api/statuts)
// 2. Le modèle (qui accède à la base de données)
export class StatutController {
  // On déclare une propriété privée pour stocker notre modèle
  // Private = accessible uniquement dans cette classe
  private statutModel: StatutModel;

  // Le constructeur est appelé quand on crée une nouvelle instance du contrôleur
  // Il initialise le modèle qu'on utilisera pour accéder aux données
  constructor() {
    this.statutModel = new StatutModel();
  }

  // ********** MÉTHODES DU CONTRÔLEUR **********
  // Cette méthode récupère TOUS les statuts possibles pour un EPI
  // async/await car on fait des opérations qui prennent du temps (accès base de données)
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      // On demande au modèle de nous donner tous les statuts
      const statuts = await this.statutModel.findAll();
      
      // Tout s'est bien passé : on renvoie les statuts avec un code 200 (succès)
      res.status(200).json({
        message: 'Statuts récupérés avec succès',
        data: statuts
      });
    } catch (error) {
      // En cas d'erreur :
      // 1. On log l'erreur dans la console du serveur pour le debugging
      console.error('Erreur lors de la récupération des statuts:', error);
      
      // 2. On renvoie un code 500 (erreur serveur) avec un message d'erreur
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération des statuts',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  };
}

// On crée une instance du contrôleur qu'on exporte
// Cette instance sera utilisée par les routes dans routes/statutRoutes.ts
export const statutController = new StatutController();

/*
RÉSUMÉ DU FICHIER statutController.ts :
Ce fichier fait partie de la couche "Controller" de l'architecture MVC.
Son rôle est de :
1. Recevoir les requêtes HTTP venant des routes
2. Utiliser le modèle (StatutModel) pour accéder aux données
3. Renvoyer une réponse appropriée au front-end

Pour l'instant, il ne gère qu'une seule fonctionnalité :
- Récupérer la liste de tous les statuts possibles pour un EPI
  (comme "En service", "Hors service", "En contrôle", etc.)

C'est comme un chef d'orchestre qui coordonne les demandes du front-end 
avec les opérations sur la base de données !
*/