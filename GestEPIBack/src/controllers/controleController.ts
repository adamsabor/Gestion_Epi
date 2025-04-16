// ************************************************************************
// 🎓 CONTRÔLEUR DES CONTRÔLES D'EPI - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// Request et Response sont des types TypeScript fournis par Express
// Ils permettent de typer les paramètres des fonctions du contrôleur
import { Request, Response } from 'express';

// On importe le modèle qui gère les requêtes SQL pour les contrôles
// Le modèle fait le lien entre le contrôleur et la base de données
import { ControleModel } from '../models/controleModel';

// On importe l'interface Controle qui définit la structure exacte d'un contrôle
// Cette interface sert de "contrat" pour s'assurer qu'on manipule les bonnes données
import { Controle } from '../types';

// 🎯 CLASSE CONTRÔLEUR
// Cette classe suit le pattern MVC (Modèle-Vue-Contrôleur)
// Elle reçoit les requêtes HTTP et coordonne les actions avec le modèle
export class ControleController {
  // Propriété privée qui stocke une instance du modèle
  // private = accessible uniquement dans cette classe
  private controleModel: ControleModel;

  // Constructeur = fonction appelée à la création de la classe
  // Il initialise le modèle pour pouvoir l'utiliser dans les méthodes
  constructor() {
    this.controleModel = new ControleModel();
  }

  // 📥 MÉTHODE : RÉCUPÉRER TOUS LES CONTRÔLES
  // async/await = gestion asynchrone pour les requêtes SQL
  // Promise<void> = la fonction ne retourne rien mais est asynchrone
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      // On appelle la méthode du modèle qui exécute : SELECT * FROM controles
      const controles = await this.controleModel.findAll();
      
      // Réponse HTTP 200 (succès) avec les données au format JSON
      res.status(200).json({ 
        message: 'Contrôles récupérés avec succès', 
        data: controles 
      });
    } catch (error) {
      // En cas d'erreur (ex: problème BDD), on log et on renvoie une erreur 500
      console.error('Erreur lors de la récupération des contrôles:', error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des contrôles' });
    }
  };

  // 🔍 MÉTHODE : RÉCUPÉRER UN CONTRÔLE PAR SON ID
  // req.params.id = paramètre dans l'URL (ex: /controles/123)
  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      // On convertit l'ID de la chaîne en nombre
      const id = parseInt(req.params.id);
      
      // Requête SQL : SELECT * FROM controles WHERE id = ?
      const controle = await this.controleModel.findById(id);
      
      // Si aucun contrôle trouvé, erreur 404 (Not Found)
      if (!controle) {
        res.status(404).json({ message: 'Contrôle non trouvé' });
        return;
      }
      
      res.status(200).json({ message: 'Contrôle récupéré avec succès', data: controle });
    } catch (error) {
      console.error(`Erreur lors de la récupération du contrôle avec l'ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération du contrôle' });
    }
  };

  // 📚 MÉTHODE : RÉCUPÉRER LES CONTRÔLES D'UN EPI
  // Permet d'avoir l'historique des contrôles pour un EPI donné
  getByEpiId = async (req: Request, res: Response): Promise<void> => {
    try {
      const epiId = parseInt(req.params.epiId);
      
      // Requête SQL : SELECT * FROM controles WHERE epi_id = ?
      const controles = await this.controleModel.findByEpiId(epiId);
      
      res.status(200).json({ message: 'Contrôles récupérés avec succès', data: controles });
    } catch (error) {
      console.error(`Erreur lors de la récupération des contrôles pour l'EPI avec l'ID ${req.params.epiId}:`, error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des contrôles' });
    }
  };

  // ✨ MÉTHODE : CRÉER UN NOUVEAU CONTRÔLE
  // req.body contient les données envoyées par le client (formulaire)
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      // On type les données reçues avec l'interface Controle
      const controleData = req.body as Controle;
      
      // Validation des données obligatoires
      if (!controleData.date_controle || !controleData.gestionnaire_id || 
          !controleData.epi_id || !controleData.statut_id) {
        res.status(400).json({ message: 'Données de contrôle incomplètes' });
        return;
      }
      
      // Requête SQL : INSERT INTO controles (...) VALUES (...)
      const createdControle = await this.controleModel.create(controleData);
      
      // Status 201 = Created
      res.status(201).json({ message: 'Contrôle créé avec succès', data: createdControle });
    } catch (error) {
      console.error('Erreur lors de la création du contrôle:', error);
      res.status(500).json({ message: 'Erreur serveur lors de la création du contrôle' });
    }
  };
}

// 📤 EXPORT
// On crée et exporte directement une instance du contrôleur
export const controleController = new ControleController();

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce contrôleur est crucial car il gère toute la logique des contrôles d'EPI :
// 1. Structure en MVC (séparation des responsabilités)
// 2. Gestion des requêtes HTTP (GET, POST)
// 3. Validation des données
// 4. Gestion des erreurs
// 5. Communication avec la base de données via le modèle
//
// Points techniques à souligner :
// - Utilisation de TypeScript pour la sécurité du typage
// - Programmation asynchrone avec async/await
// - Pattern MVC
// - Gestion des erreurs avec try/catch