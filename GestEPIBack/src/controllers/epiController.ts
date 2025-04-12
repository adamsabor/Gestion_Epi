// ********** IMPORTS **********
// On importe les types Request et Response d'Express
// Ce sont des "moules" qui nous permettent de bien typer les paramètres de nos fonctions
// - Request contient toutes les infos de la requête reçue (URL, paramètres, corps...)
// - Response nous permet d'envoyer une réponse au client (succès ou erreur)
import { Request, Response } from 'express';

// On importe notre modèle EPI qui gère toutes les opérations avec la base de données
// C'est lui qui contient les requêtes SQL pour créer, lire, modifier et supprimer des EPIs
import { EpiModel } from '../models/epiModel';

// ********** DÉFINITION DU CONTRÔLEUR **********
// Cette classe est le "chef d'orchestre" qui gère toute la logique des EPIs
// Elle reçoit les requêtes des routes et utilise le modèle pour accéder aux données
export class EpiController {
  // On déclare une propriété privée qui contiendra notre modèle
  // Le modèle nous permettra d'interagir avec la base de données
  private epiModel: EpiModel;

  // Le constructeur est appelé quand on crée une nouvelle instance du contrôleur
  // Il initialise le modèle qu'on utilisera pour accéder aux données
  constructor() {
    this.epiModel = new EpiModel();
  }

  // ********** MÉTHODES DU CONTRÔLEUR **********

  // Cette méthode récupère TOUS les EPIs de la base de données
  // Elle est appelée quand on fait une requête GET sur /api/epis
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      // On demande au modèle de nous donner tous les EPIs
      const epis = await this.epiModel.findAll();
      // Tout s'est bien passé : on renvoie les EPIs avec un code 200 (succès)
      res.status(200).json({ message: 'EPIs récupérés avec succès', data: epis });
    } catch (error) {
      // En cas d'erreur, on l'affiche dans la console pour le debugging
      console.error('Erreur lors de la récupération des EPIs:', error);
      // Et on renvoie une erreur 500 (erreur serveur) au client
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des EPIs' });
    }
  };

  // Cette méthode récupère UN SEUL EPI grâce à son ID
  // Elle est appelée quand on fait une requête GET sur /api/epis/123 par exemple
  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      // On récupère l'ID depuis l'URL et on le convertit en nombre
      const id = parseInt(req.params.id);
      // On demande au modèle de nous donner l'EPI avec cet ID
      const epi = await this.epiModel.findById(id);
      
      // Si aucun EPI n'est trouvé avec cet ID
      if (!epi) {
        // On renvoie une erreur 404 (non trouvé)
        res.status(404).json({ message: 'EPI non trouvé' });
        return;
      }
      
      // Si on trouve l'EPI, on le renvoie avec un message de succès
      res.status(200).json({ message: 'EPI récupéré avec succès', data: epi });
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'EPI avec l'ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'EPI' });
    }
  };

  // Cette méthode crée un nouvel EPI dans la base de données
  // Elle est appelée quand on fait une requête POST sur /api/epis
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      // On récupère les données du nouvel EPI depuis le corps de la requête
      const newEpi = req.body;
      // On demande au modèle de créer l'EPI en base de données
      const createdEpi = await this.epiModel.create(newEpi);
      // On renvoie l'EPI créé avec un code 201 (création réussie)
      res.status(201).json({ message: 'EPI créé avec succès', data: createdEpi });
    } catch (error) {
      console.error('Erreur lors de la création de l\'EPI:', error);
      res.status(500).json({ message: 'Erreur serveur lors de la création de l\'EPI' });
    }
  };

  // Cette méthode modifie un EPI existant
  // Elle est appelée quand on fait une requête PUT sur /api/epis/123
  update = async (req: Request, res: Response): Promise<void> => {
    try {
      // On récupère l'ID de l'EPI à modifier et ses nouvelles données
      const id = parseInt(req.params.id);
      const epiData = req.body;
      // On demande au modèle de mettre à jour l'EPI
      const updatedEpi = await this.epiModel.update(id, epiData);
      
      // Si l'EPI n'existe pas
      if (!updatedEpi) {
        res.status(404).json({ message: 'EPI non trouvé' });
        return;
      }
      
      // Si la mise à jour a réussi, on renvoie l'EPI modifié
      res.status(200).json({ message: 'EPI mis à jour avec succès', data: updatedEpi });
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'EPI avec l'ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de l\'EPI' });
    }
  };

  // Cette méthode supprime un EPI de la base de données
  // Elle est appelée quand on fait une requête DELETE sur /api/epis/123
  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      // On récupère l'ID de l'EPI à supprimer
      const id = parseInt(req.params.id);
      // On demande au modèle de supprimer l'EPI
      const deleted = await this.epiModel.delete(id);
      
      // Si l'EPI n'existe pas
      if (!deleted) {
        res.status(404).json({ message: 'EPI non trouvé' });
        return;
      }
      
      // Si la suppression a réussi, on envoie un message de confirmation
      res.status(200).json({ message: 'EPI supprimé avec succès' });
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'EPI avec l'ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'EPI' });
    }
  };
}

// On crée une instance du contrôleur qu'on exporte
// Cette instance sera utilisée par les routes dans routes/index.ts
export const epiController = new EpiController(); 

/*
RÉSUMÉ DU FICHIER epiController.ts :
Ce fichier est le "cerveau" qui gère les EPIs dans notre application.
Il fait partie de l'architecture MVC (Model-View-Controller) et son rôle est de :

1. Recevoir les requêtes HTTP venant des routes
2. Utiliser le modèle (EpiModel) pour accéder à la base de données
3. Renvoyer les réponses appropriées au front-end

Il gère 5 opérations principales (CRUD) :
- Lire tous les EPIs (GET /api/epis)
- Lire un EPI spécifique (GET /api/epis/123)
- Créer un nouvel EPI (POST /api/epis)
- Modifier un EPI (PUT /api/epis/123)
- Supprimer un EPI (DELETE /api/epis/123)

C'est comme un chef d'orchestre qui coordonne les demandes du front-end 
avec les opérations sur la base de données !
*/