// ************************************************************************
// 🎓 ROUTES DES CONTRÔLES - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// Express est le framework Node.js qu'on utilise pour créer notre API
// Il nous permet de définir facilement nos routes et de gérer les requêtes HTTP
import express from 'express';

// On importe notre contrôleur qui contient toute la logique métier
// C'est lui qui va traiter les requêtes et renvoyer les réponses
import { controleController } from '../controllers/controleController';

// 🛠️ CRÉATION DU ROUTER
// Le Router d'Express permet de regrouper les routes par fonctionnalité
// Ici on regroupe toutes les routes liées aux contrôles d'EPI
const router = express.Router();

// 🔄 DÉFINITION DES ROUTES
// Chaque route est un endpoint API qui peut être appelé par le front-end

// Route GET pour récupérer tous les contrôles
// - Méthode HTTP : GET car on veut lire des données
// - URL : '/' qui devient '/api/controles' avec le préfixe global
// - Fonction : controleController.getAll qui sera exécutée
router.get('/', controleController.getAll);

// Route GET pour récupérer un contrôle spécifique par son ID
// - :id est un paramètre dynamique dans l'URL (ex: /api/controles/123)
// - Le contrôleur va utiliser cet ID pour chercher le bon contrôle en BDD
router.get('/:id', controleController.getById);

// Route GET pour récupérer tous les contrôles d'un EPI spécifique
// - :epiId permet d'identifier l'EPI dont on veut l'historique des contrôles
// - Très utile pour suivre les vérifications d'un équipement dans le temps
router.get('/epi/:epiId', controleController.getByEpiId);

// Route POST pour créer un nouveau contrôle
// - Méthode HTTP : POST car on veut créer une nouvelle ressource
// - Les données du contrôle sont envoyées dans le corps (body) de la requête
// - Le contrôleur va valider ces données avant de les sauvegarder en BDD
router.post('/', controleController.create);

// 📤 EXPORT DU ROUTER
// On exporte notre router pour pouvoir l'utiliser dans app.ts
// Le 'as controleRoutes' permet de donner un nom explicite à l'export
export { router as controleRoutes };

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier de routes est responsable de :
// 1. Définir les endpoints API pour la gestion des contrôles d'EPI
// 2. Faire le lien entre les URLs et les fonctions du contrôleur
// 3. Structurer l'API de façon professionnelle avec Express Router
//
// Points techniques à souligner :
// - Architecture REST API
// - Pattern MVC (ce fichier est la partie "Route")
// - Utilisation d'Express.js
// - Organisation modulaire du code
// - Gestion des paramètres d'URL