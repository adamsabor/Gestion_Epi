// ************************************************************************
// 🎓 CONTRÔLEUR DES TYPES D'EPI - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// Request et Response sont des types TypeScript fournis par Express
// Ils permettent de typer les paramètres des fonctions du contrôleur
import { Request, Response } from 'express';

// On importe le modèle qui gère les requêtes SQL pour les types d'EPI
// Le modèle fait le lien entre le contrôleur et la base de données
import { TypeEpiModel } from '../models/typeEpiModel';

// 🎯 CLASSE CONTRÔLEUR
// Cette classe suit le pattern MVC (Modèle-Vue-Contrôleur)
// Elle reçoit les requêtes HTTP et coordonne les actions avec le modèle
export class EpiTypeController {
  // Propriété privée qui stocke une instance du modèle
  // private = accessible uniquement dans cette classe
  private typeEpiModel: TypeEpiModel;

  // Constructeur = fonction appelée à la création de la classe
  // Il initialise le modèle pour pouvoir l'utiliser dans les méthodes
  constructor() {
    this.typeEpiModel = new TypeEpiModel();
  }

  // 📥 MÉTHODE PRINCIPALE : RÉCUPÉRATION DES TYPES D'EPI
  // async/await = gestion asynchrone pour les requêtes SQL
  // Promise<void> = la fonction ne retourne rien mais est asynchrone
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      // On appelle la méthode du modèle qui exécute : SELECT * FROM types_epi
      const types = await this.typeEpiModel.findAll();
      
      // Réponse HTTP 200 (succès) avec les données au format JSON
      // Le front-end recevra un objet avec message + données
      res.status(200).json({
        message: 'Types d\'EPI récupérés avec succès',
        data: types
      });

    } catch (error) {
      // En cas d'erreur (ex: problème BDD)
      // On log l'erreur côté serveur pour le debug
      console.error('Erreur lors de la récupération des types d\'EPI:', error);
      
      // On renvoie une erreur 500 (erreur serveur) au client
      // avec un message explicatif
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération des types d\'EPI',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  };
}

// 📤 EXPORT
// On crée et exporte directement une instance du contrôleur
// Cette instance sera importée et utilisée par les routes
export const epiTypeController = new EpiTypeController();

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce contrôleur est responsable de la gestion des types d'EPI dans l'application.
// Points techniques à souligner :
// 1. Architecture MVC avec séparation des responsabilités
// 2. Utilisation de TypeScript pour la sécurité du typage
// 3. Gestion des erreurs avec try/catch
// 4. Programmation asynchrone avec async/await
// 5. Communication avec la base de données via le modèle