// ********** IMPORTS **********
// On importe les types Request et Response d'Express pour pouvoir typer nos paramètres
// Cela nous permet d'avoir l'auto-complétion et de détecter les erreurs
import { Request, Response } from 'express';

// On importe le modèle ControleModel qui va gérer toutes les interactions avec la base de données
// C'est lui qui contient les requêtes SQL pour les contrôles d'EPI
import { ControleModel } from '../models/controleModel';

// On importe le type Controle qui définit la structure d'un contrôle d'EPI
// Il contient tous les champs obligatoires comme la date, l'EPI concerné, etc.
import { Controle } from '../types';

// ********** DÉFINITION DU CONTRÔLEUR **********
// Cette classe gère toute la logique des contrôles d'EPI
// Elle fait le lien entre les routes (URLs) et le modèle (base de données)
export class ControleController {
  // On déclare une propriété privée qui contiendra notre modèle
  // Le modèle nous permettra d'accéder aux données des contrôles
  private controleModel: ControleModel;

  // Le constructeur est appelé quand on crée une nouvelle instance du contrôleur
  // Il initialise le modèle qu'on utilisera pour accéder aux données
  constructor() {
    this.controleModel = new ControleModel();
  }

  // ********** MÉTHODES DU CONTRÔLEUR **********

  // Cette méthode récupère TOUS les contrôles existants dans la base
  // Elle est appelée quand on fait une requête GET sur /api/controles
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      // On demande au modèle de nous donner tous les contrôles
      const controles = await this.controleModel.findAll();
      // On renvoie les contrôles avec un message de succès
      res.status(200).json({ message: 'Contrôles récupérés avec succès', data: controles });
    } catch (error) {
      // Si une erreur survient, on la log dans la console pour le debugging
      console.error('Erreur lors de la récupération des contrôles:', error);
      // Et on renvoie une erreur 500 (erreur serveur) au front
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des contrôles' });
    }
  };

  // Cette méthode récupère UN SEUL contrôle grâce à son ID
  // Elle est appelée quand on fait une requête GET sur /api/controles/123 par exemple
  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      // On récupère l'ID depuis l'URL et on le convertit en nombre
      const id = parseInt(req.params.id);
      // On demande au modèle de nous donner le contrôle avec cet ID
      const controle = await this.controleModel.findById(id);
      
      // Si aucun contrôle n'est trouvé avec cet ID
      if (!controle) {
        // On renvoie une erreur 404 (non trouvé)
        res.status(404).json({ message: 'Contrôle non trouvé' });
        return;
      }
      
      // Si on trouve le contrôle, on le renvoie avec un message de succès
      res.status(200).json({ message: 'Contrôle récupéré avec succès', data: controle });
    } catch (error) {
      console.error(`Erreur lors de la récupération du contrôle avec l'ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération du contrôle' });
    }
  };

  // Cette méthode récupère TOUS les contrôles d'un EPI spécifique
  // Elle est appelée quand on fait une requête GET sur /api/controles/epi/456 par exemple
  getByEpiId = async (req: Request, res: Response): Promise<void> => {
    try {
      // On récupère l'ID de l'EPI depuis l'URL
      const epiId = parseInt(req.params.epiId);
      // On demande au modèle tous les contrôles de cet EPI
      const controles = await this.controleModel.findByEpiId(epiId);
      
      // On renvoie les contrôles trouvés
      res.status(200).json({ message: 'Contrôles récupérés avec succès', data: controles });
    } catch (error) {
      console.error(`Erreur lors de la récupération des contrôles pour l'EPI avec l'ID ${req.params.epiId}:`, error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des contrôles' });
    }
  };

  // Cette méthode crée un nouveau contrôle dans la base de données
  // Elle est appelée quand on fait une requête POST sur /api/controles
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      // On récupère les données du contrôle envoyées dans la requête
      const controleData = req.body as Controle;
      
      // On vérifie que toutes les données obligatoires sont présentes
      if (!controleData.date_controle || !controleData.gestionnaire_id || !controleData.epi_id || !controleData.statut_id) {
        // Si il manque des données, on renvoie une erreur 400 (mauvaise requête)
        res.status(400).json({ message: 'Données de contrôle incomplètes' });
        return;
      }
      
      // On demande au modèle de créer le nouveau contrôle
      const createdControle = await this.controleModel.create(controleData);
      // On renvoie le contrôle créé avec un code 201 (création réussie)
      res.status(201).json({ message: 'Contrôle créé avec succès', data: createdControle });
    } catch (error) {
      console.error('Erreur lors de la création du contrôle:', error);
      res.status(500).json({ message: 'Erreur serveur lors de la création du contrôle' });
    }
  };
}

// On crée une instance du contrôleur qu'on exporte
// Cette instance sera utilisée par les routes dans routes/index.ts
export const controleController = new ControleController(); 

/*
RÉSUMÉ DU FICHIER controleController.ts :

Ce fichier est un contrôleur qui gère toute la logique des contrôles d'EPI.
Il fait partie de l'architecture MVC (Model-View-Controller) et sert d'intermédiaire entre :
- Les routes (qui reçoivent les requêtes HTTP)
- Le modèle (qui gère la base de données)

Il propose 4 fonctionnalités principales :
1. Récupérer tous les contrôles
2. Récupérer un contrôle spécifique par son ID
3. Récupérer tous les contrôles d'un EPI
4. Créer un nouveau contrôle

Chaque méthode :
- Reçoit une requête du front-end
- Utilise le modèle pour interagir avec la base de données
- Gère les erreurs possibles
- Renvoie une réponse appropriée au front-end

C'est comme un chef d'orchestre qui coordonne les opérations entre 
l'interface utilisateur et la base de données !
*/