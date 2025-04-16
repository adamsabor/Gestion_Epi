// ************************************************************************
// 🎓 ROUTES DES TYPES D'EPI - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// Express est le framework Node.js qu'on utilise pour créer notre API
// Il nous permet de définir facilement nos routes et de gérer les requêtes HTTP
import express from 'express';

// On importe notre contrôleur qui contient toute la logique métier
// C'est lui qui va traiter les requêtes et renvoyer les réponses
// Il gère les différents types d'EPI (casques, harnais, longes, etc.)
import { epiTypeController } from '../controllers/epiTypeController';

// 🛠️ CRÉATION DU ROUTER
// Le Router d'Express permet de regrouper les routes par fonctionnalité
// Ici on regroupe toutes les routes liées aux types d'EPI
const router = express.Router();

// 🔄 DÉFINITION DES ROUTES
// Route GET pour récupérer tous les types d'EPI
// - Méthode HTTP : GET car on veut lire des données
// - URL : '/' qui devient '/api/epi-types' avec le préfixe global
// - Fonction : epiTypeController.getAll qui sera exécutée
// Cette route permet au front-end de récupérer la liste des types pour les menus déroulants
router.get('/', epiTypeController.getAll);

// 📤 EXPORT DU ROUTER
// On exporte notre router pour pouvoir l'utiliser dans app.ts
// Le 'as typeEpiRoutes' permet de donner un nom explicite à l'export
export { router as typeEpiRoutes };

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier de routes est responsable de :
// 1. Définir les endpoints API pour la gestion des types d'EPI
// 2. Faire le lien entre les URLs et les fonctions du contrôleur
// 3. Structurer l'API de façon professionnelle avec Express Router
//
// Points techniques à souligner :
// - Architecture REST API
// - Pattern MVC (ce fichier est la partie "Route")
// - Utilisation d'Express.js
// - Organisation modulaire du code
// - Gestion des données de référence (types d'EPI)