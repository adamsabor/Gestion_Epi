// ********** IMPORTS **********
// On importe les types Request et Response d'Express
// Ces types nous permettent d'avoir l'auto-complétion et la vérification des types
// pour les objets req (la requête reçue) et res (la réponse à envoyer)
import { Request, Response } from 'express';

// On importe le modèle AlerteModel qui gère l'accès aux données des alertes
// C'est lui qui va communiquer avec la base de données
import { AlerteModel } from '../models/alerteModel';

// ********** DÉFINITION DU CONTRÔLEUR **********
// Cette classe gère toute la logique des alertes
// Elle fait le lien entre les routes (URLs) et le modèle (base de données)
export class AlerteController {
  // On déclare une propriété privée qui contiendra notre modèle
  // Le modèle nous permettra d'accéder aux données des alertes
  private alerteModel: AlerteModel;

  // Le constructeur est appelé quand on crée une nouvelle instance du contrôleur
  // Il initialise le modèle qu'on utilisera pour accéder aux données
  constructor() {
    this.alerteModel = new AlerteModel();
  }

  // Cette méthode récupère les alertes concernant les EPIs à contrôler
  // Elle est async car elle fait des opérations qui prennent du temps (accès base de données)
  getAlertes = async (req: Request, res: Response): Promise<void> => {
    try {
      // On récupère le paramètre 'statut' de l'URL s'il existe
      // Exemple : /api/alertes?statut=urgent
      const statut = req.query.statut as string | undefined;
      
      // On demande au modèle de nous donner les alertes
      // Si un statut est fourni, on ne récupère que les alertes de ce statut
      const alertes = await this.alerteModel.getAlertes(statut);
      
      // Tout s'est bien passé : on renvoie les alertes avec un code 200 (succès)
      res.status(200).json({
        message: 'Alertes récupérées avec succès',
        data: alertes
      });
    } catch (error) {
      // En cas d'erreur :
      // 1. On log l'erreur dans la console du serveur pour le debugging
      console.error('Erreur lors de la récupération des alertes:', error);
      
      // 2. On renvoie un code 500 (erreur serveur) avec un message d'erreur
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération des alertes',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  };
}

// On crée une instance du contrôleur qu'on exporte
// Cette instance sera utilisée par les routes dans routes/index.ts
export const alerteController = new AlerteController();

/*
RÉSUMÉ DU FICHIER alerteController.ts :
Ce fichier fait partie de la couche "Controller" de l'architecture MVC.
Son rôle est de :
1. Recevoir les requêtes HTTP venant des routes
2. Utiliser le modèle (AlerteModel) pour accéder aux données
3. Renvoyer une réponse appropriée au front-end

Pour l'instant, il ne gère qu'une seule fonctionnalité :
- Récupérer les alertes concernant les EPIs à contrôler
- Avec possibilité de filtrer par statut

C'est comme un chef d'orchestre qui coordonne les demandes du front-end 
avec les opérations sur la base de données !
*/