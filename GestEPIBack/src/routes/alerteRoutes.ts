// ************************************************************************
// 🎓 ROUTES DES ALERTES - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// Express est le framework Node.js qu'on utilise pour créer notre API
// Il nous permet de définir facilement nos routes et de gérer les requêtes HTTP
import express from 'express';

// On importe notre contrôleur qui contient toute la logique métier
// C'est lui qui va traiter les requêtes et renvoyer les réponses
import { alerteController } from '../controllers/alerteController';

// 🛠️ CRÉATION DU ROUTER
// Le Router d'Express permet de regrouper les routes par fonctionnalité
// Ici on regroupe toutes les routes liées aux alertes
const router = express.Router();

// 🔄 DÉFINITION DES ROUTES
// Route GET pour récupérer toutes les alertes
// - Méthode HTTP : GET car on veut lire des données
// - URL : '/' qui devient '/api/alertes' avec le préfixe global
// - Fonction : alerteController.getAlertes qui sera exécutée
router.get('/', alerteController.getAlertes);

// 📤 EXPORT DU ROUTER
// On exporte notre router pour pouvoir l'utiliser dans app.ts
// Le 'as alerteRoutes' permet de donner un nom explicite à l'export
export { router as alerteRoutes };

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier de routes est responsable de :
// 1. Définir les endpoints API pour la gestion des alertes
// 2. Faire le lien entre les URLs et les fonctions du contrôleur
// 3. Structurer l'API de façon professionnelle avec Express Router
//
// Points techniques à souligner :
// - Architecture REST API
// - Pattern MVC (ce fichier est la partie "Route")
// - Utilisation d'Express.js
// - Organisation modulaire du code