// ********** IMPORTS **********
// On importe les types Request et Response d'Express
// Request : contient toutes les infos de la requête reçue (URL, paramètres, etc.)
// Response : permet d'envoyer une réponse au client (succès ou erreur)
import { Request, Response } from 'express';

// On importe notre modèle qui gère l'accès à la base de données pour les gestionnaires
// C'est lui qui contient les requêtes SQL pour créer, lire, modifier et supprimer des gestionnaires
import { GestionnaireModel } from '../models/gestionnaireModel';

// ********** DÉFINITION DU CONTRÔLEUR **********
// Cette classe est le "chef d'orchestre" qui gère toute la logique des gestionnaires
// Elle fait le lien entre les routes (URLs) et le modèle (base de données)
export class GestionnaireController {
  // On déclare une propriété privée qui contiendra notre modèle
  // Private = accessible uniquement dans cette classe
  private gestionnaireModel: GestionnaireModel;

  // Le constructeur est appelé quand on crée une nouvelle instance du contrôleur
  // Il initialise le modèle qu'on utilisera pour accéder aux données
  constructor() {
    this.gestionnaireModel = new GestionnaireModel();
  }

  // ********** MÉTHODES DU CONTRÔLEUR **********
  // Cette méthode récupère TOUS les gestionnaires de la base de données
  // Elle est appelée quand on fait une requête GET sur /api/gestionnaires
  // async/await car on fait des opérations qui prennent du temps (accès base de données)
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      // On demande au modèle de nous donner tous les gestionnaires
      const gestionnaires = await this.gestionnaireModel.findAll();
      
      // Tout s'est bien passé : on renvoie les gestionnaires avec un code 200 (succès)
      res.status(200).json({
        message: 'Gestionnaires récupérés avec succès',
        data: gestionnaires
      });
    } catch (error) {
      // En cas d'erreur :
      // 1. On log l'erreur dans la console du serveur pour le debugging
      console.error('Erreur lors de la récupération des gestionnaires:', error);
      
      // 2. On renvoie un code 500 (erreur serveur) avec un message d'erreur
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération des gestionnaires',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  };
}

// On crée une instance du contrôleur qu'on exporte
// Cette instance sera utilisée par les routes dans routes/gestionnaireRoutes.ts
export const gestionnaireController = new GestionnaireController();

/*
RÉSUMÉ DU FICHIER gestionnaireController.ts :
Ce fichier fait partie de la couche "Controller" de l'architecture MVC.
Son rôle est de :
1. Recevoir les requêtes HTTP venant des routes
2. Utiliser le modèle (GestionnaireModel) pour accéder aux données
3. Renvoyer une réponse appropriée au front-end

Pour l'instant, il ne gère qu'une seule fonctionnalité :
- Récupérer la liste de tous les gestionnaires

C'est comme un chef d'orchestre qui coordonne les demandes du front-end 
avec les opérations sur la base de données !
*/