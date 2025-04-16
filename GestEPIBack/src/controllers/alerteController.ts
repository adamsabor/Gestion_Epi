// ************************************************************************
// 🎓 CONTRÔLEUR DES ALERTES - PROJET GESTEPI
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS
// Request et Response sont des types TypeScript fournis par Express
// Ils permettent de typer les paramètres des fonctions du contrôleur
import { Request, Response } from 'express';

// On importe le modèle qui gère les requêtes SQL pour les alertes
// Le modèle fait le lien entre le contrôleur et la base de données
import { AlerteModel } from '../models/alerteModel';

// 🎯 CLASSE CONTRÔLEUR
// Cette classe suit le pattern MVC (Modèle-Vue-Contrôleur)
// Elle reçoit les requêtes HTTP et coordonne les actions avec le modèle
export class AlerteController {
  // Propriété privée qui stocke une instance du modèle
  // private = accessible uniquement dans cette classe
  private alerteModel: AlerteModel;

  // Constructeur = fonction appelée à la création de la classe
  // Il initialise le modèle pour pouvoir l'utiliser dans les méthodes
  constructor() {
    this.alerteModel = new AlerteModel();
  }

  // 📥 MÉTHODE PRINCIPALE : RÉCUPÉRATION DES ALERTES
  // async/await = gestion asynchrone pour les requêtes SQL
  // Promise<void> = la fonction ne retourne rien mais est asynchrone
  getAlertes = async (req: Request, res: Response): Promise<void> => {
    try {
      // On extrait le paramètre 'statut' de l'URL s'il existe
      // Exemple: /api/alertes?statut=urgent
      const statut = req.query.statut as string | undefined;
      
      // On appelle la méthode du modèle qui exécute la requête SQL
      // SELECT * FROM alertes WHERE statut = ? (si statut fourni)
      const alertes = await this.alerteModel.getAlertes(statut);
      
      // Réponse HTTP 200 (succès) avec les données au format JSON
      // Le front-end recevra un objet avec message + données
      res.status(200).json({
        message: 'Alertes récupérées avec succès',
        data: alertes
      });

    } catch (error) {
      // En cas d'erreur (ex: problème BDD)
      // On log l'erreur côté serveur pour le debug
      console.error('Erreur lors de la récupération des alertes:', error);
      
      // On renvoie une erreur 500 (erreur serveur) au client
      // avec un message explicatif
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération des alertes',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  };
}

// 📤 EXPORT
// On crée et exporte directement une instance du contrôleur
// Cette instance sera importée et utilisée par les routes
export const alerteController = new AlerteController();

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce contrôleur est responsable de la gestion des alertes dans l'application.
// Points importants à retenir :
// 1. Architecture MVC avec séparation des responsabilités
// 2. Utilisation de TypeScript pour la sécurité du code
// 3. Gestion asynchrone avec async/await
// 4. Gestion des erreurs avec try/catch
// 5. Réponses HTTP formatées (status + JSON)
//
// Pour l'oral :
// - Expliquer le rôle du contrôleur dans l'architecture
// - Montrer la gestion des requêtes HTTP
// - Parler de la sécurité (typage, gestion d'erreurs)
// - Faire le lien avec le modèle et la BDD