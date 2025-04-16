// ************************************************************************
// 🎓 ROUTES DES GESTIONNAIRES - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// Express est le framework Node.js qu'on utilise pour créer notre API
// Il nous permet de définir facilement nos routes et de gérer les requêtes HTTP
import express from 'express';

// On importe notre contrôleur qui contient toute la logique métier
// C'est lui qui va traiter les requêtes et renvoyer les réponses
// Il gère l'authentification et les droits d'accès des gestionnaires
import { gestionnaireController } from '../controllers/gestionnaireController';

// 🛠️ CRÉATION DU ROUTER
// Le Router d'Express permet de regrouper les routes par fonctionnalité
// Ici on regroupe toutes les routes liées aux gestionnaires (admins)
const router = express.Router();

// 🔄 DÉFINITION DES ROUTES
// Route GET pour récupérer tous les gestionnaires
// - Méthode HTTP : GET car on veut lire des données
// - URL : '/' qui devient '/api/gestionnaires' avec le préfixe global
// - Fonction : gestionnaireController.getAll qui sera exécutée
// Cette route permet au front-end de récupérer la liste des gestionnaires
router.get('/', gestionnaireController.getAll);

// 📤 EXPORT DU ROUTER
// On exporte notre router pour pouvoir l'utiliser dans app.ts
// Le 'as gestionnaireRoutes' permet de donner un nom explicite à l'export
export { router as gestionnaireRoutes };

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier de routes est responsable de :
// 1. Définir les endpoints API pour la gestion des administrateurs
// 2. Faire le lien entre les URLs et les fonctions du contrôleur
// 3. Structurer l'API de façon professionnelle avec Express Router
//
// Points techniques à souligner :
// - Architecture REST API
// - Pattern MVC (ce fichier est la partie "Route")
// - Utilisation d'Express.js
// - Organisation modulaire du code
// - Sécurité des accès administrateurs