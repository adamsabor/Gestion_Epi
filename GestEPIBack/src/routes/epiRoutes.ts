// ************************************************************************
// 🎓 ROUTES DES EPI - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// Express est le framework Node.js qu'on utilise pour créer notre API
// Il nous permet de définir facilement nos routes et de gérer les requêtes HTTP
import express from 'express';

// On importe notre contrôleur qui contient toute la logique métier
// C'est lui qui va traiter les requêtes et renvoyer les réponses
import { EpiController } from '../controllers/epiController';

// 🛠️ CRÉATION DU ROUTER
// Le Router d'Express permet de regrouper les routes par fonctionnalité
// Ici on regroupe toutes les routes liées aux EPI
const router = express.Router();

// On crée une instance de notre contrôleur
// Cette instance sera utilisée par toutes nos routes
const epiController = new EpiController();

// 🔄 DÉFINITION DES ROUTES
// Chaque route est un endpoint API qui peut être appelé par le front-end

// Route GET pour récupérer tous les EPI
// - Méthode HTTP : GET car on veut lire des données
// - URL : '/' qui devient '/api/epis' avec le préfixe global
// - Fonction : epiController.findAll qui sera exécutée
console.log("✅ Routes EPI initialisées");

router.get('/', (req, res) => {
  console.log('🔍 Requête GET reçue sur /api/epis');
  epiController.findAll(req, res);
});

// Route GET pour récupérer un EPI spécifique par son ID
// - :id est un paramètre dynamique dans l'URL (ex: /api/epis/123)
// - Le contrôleur va utiliser cet ID pour chercher le bon EPI en BDD
router.get('/:id', epiController.findById);

// Route POST pour créer un nouvel EPI
// - Méthode HTTP : POST car on veut créer une nouvelle ressource
// - Les données de l'EPI sont envoyées dans le corps (body) de la requête
// - Le contrôleur va valider ces données avant de les sauvegarder en BDD
router.post('/', epiController.create);

// Route PUT pour modifier un EPI existant
// - Méthode HTTP : PUT car on veut mettre à jour une ressource
// - Combine l'ID dans l'URL et les nouvelles données dans le body
// - Le contrôleur vérifie que l'EPI existe avant la modification
router.put('/:id', epiController.update);

// Route DELETE pour supprimer un EPI
// - Méthode HTTP : DELETE car on veut supprimer une ressource
// - L'ID dans l'URL identifie l'EPI à supprimer
// - Le contrôleur vérifie les dépendances avant la suppression
router.delete('/:id', epiController.delete);

// 📤 EXPORT DU ROUTER
// On exporte notre router pour pouvoir l'utiliser dans app.ts
// Le 'as epiRoutes' permet de donner un nom explicite à l'export
export { router as epiRoutes };

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier de routes est responsable de :
// 1. Définir les endpoints API pour la gestion des EPI
// 2. Faire le lien entre les URLs et les fonctions du contrôleur
// 3. Structurer l'API de façon professionnelle avec Express Router
//
// Points techniques à souligner :
// - Architecture REST API
// - Pattern MVC (ce fichier est la partie "Route")
// - Utilisation d'Express.js
// - Organisation modulaire du code
// - Gestion des paramètres d'URL