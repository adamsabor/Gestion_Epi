// ************************************************************************
// 🎓 ROUTES DES STATUTS - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// Express est le framework Node.js qu'on utilise pour créer notre API
// Il nous permet de définir facilement nos routes et de gérer les requêtes HTTP
import express from 'express';

// On importe notre contrôleur qui contient toute la logique métier
// C'est lui qui va traiter les requêtes et renvoyer les réponses
// Il gère les différents statuts possibles des EPI (en service, hors service, etc.)
import { statutController } from '../controllers/statutController';

// 🛠️ CRÉATION DU ROUTER
// Le Router d'Express permet de regrouper les routes par fonctionnalité
// Ici on regroupe toutes les routes liées aux statuts des EPI
const router = express.Router();

// 🔄 DÉFINITION DES ROUTES
// Route GET pour récupérer tous les statuts possibles
// - Méthode HTTP : GET car on veut lire des données
// - URL : '/' qui devient '/api/statuts' avec le préfixe global
// - Fonction : statutController.getAll qui sera exécutée
// Cette route permet au front-end de récupérer la liste des statuts pour les menus déroulants
router.get('/', statutController.getAll);

// 📤 EXPORT DU ROUTER
// On exporte notre router pour pouvoir l'utiliser dans app.ts
// Le 'as statutRoutes' permet de donner un nom explicite à l'export
export { router as statutRoutes };

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier de routes est responsable de :
// 1. Définir les endpoints API pour la gestion des statuts d'EPI
// 2. Faire le lien entre les URLs et les fonctions du contrôleur
// 3. Structurer l'API de façon professionnelle avec Express Router
//
// Points techniques à souligner :
// - Architecture REST API
// - Pattern MVC (ce fichier est la partie "Route")
// - Utilisation d'Express.js
// - Organisation modulaire du code
// - Gestion des données de référence (statuts)