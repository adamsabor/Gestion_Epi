// ********** IMPORTS **********
// On importe les types Request et Response depuis Express
// Request : contient toutes les infos de la requête reçue (URL, paramètres, etc.)
// Response : permet d'envoyer une réponse au client (succès ou erreur)
import { Request, Response } from 'express';

// On importe notre modèle TypeEpiModel qui gère l'accès à la base de données
// C'est lui qui contient les requêtes SQL pour les types d'EPI (casque, harnais, etc.)
import { TypeEpiModel } from '../models/typeEpiModel';

// ********** DÉFINITION DU CONTRÔLEUR **********
// Cette classe fait le lien entre :
// 1. Les routes (URLs comme /api/epi-types)
// 2. Le modèle (qui accède à la base de données)
export class EpiTypeController {
  // On déclare une propriété privée pour stocker notre modèle
  // Private = accessible uniquement dans cette classe
  private typeEpiModel: TypeEpiModel;

  // Le constructeur est appelé quand on crée une nouvelle instance du contrôleur
  // Il initialise le modèle qu'on utilisera pour accéder aux données
  constructor() {
    this.typeEpiModel = new TypeEpiModel();
  }

  // ********** MÉTHODES DU CONTRÔLEUR **********
  // Cette méthode récupère TOUS les types d'EPI existants (casque, harnais, etc.)
  // async/await car on fait des opérations qui prennent du temps (accès base de données)
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      // On demande au modèle de nous donner tous les types d'EPI
      const types = await this.typeEpiModel.findAll();
      
      // Tout s'est bien passé : on renvoie les types avec un code 200 (succès)
      res.status(200).json({
        message: 'Types d\'EPI récupérés avec succès',
        data: types
      });
    } catch (error) {
      // En cas d'erreur :
      // 1. On log l'erreur dans la console du serveur pour le debugging
      console.error('Erreur lors de la récupération des types d\'EPI:', error);
      
      // 2. On renvoie un code 500 (erreur serveur) avec un message d'erreur
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération des types d\'EPI',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  };
}

// On crée une instance du contrôleur qu'on exporte
// Cette instance sera utilisée par les routes dans routes/typeEpiRoutes.ts
export const epiTypeController = new EpiTypeController();

/*
RÉSUMÉ DU FICHIER epiTypeController.ts :
Ce fichier fait partie de la couche "Controller" de l'architecture MVC.
Son rôle est de :
1. Recevoir les requêtes HTTP venant des routes
2. Utiliser le modèle (TypeEpiModel) pour accéder aux données
3. Renvoyer une réponse appropriée au front-end

Pour l'instant, il ne gère qu'une seule fonctionnalité :
- Récupérer la liste de tous les types d'EPI possibles
  (comme casque, harnais, gants, etc.)

C'est comme un chef d'orchestre qui coordonne les demandes du front-end 
avec les opérations sur la base de données !
*/