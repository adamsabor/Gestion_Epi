// ************************************************************************
// 🎓 FICHIER PRINCIPAL DES ROUTES - PROJET GESTEPI
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// Express est le framework Node.js qu'on utilise pour créer notre API
import express from 'express';

// On importe tous les contrôleurs qui gèrent la logique métier
// Chaque contrôleur est responsable d'une fonctionnalité spécifique
import { epiRoutes } from './epiRoutes';               // Gestion des EPI
import { epiTypeController } from '../controllers/epiTypeController';         // Types d'EPI
import { controleController } from '../controllers/controleController';       // Contrôles
import { statutController } from '../controllers/statutController';           // Statuts
import { gestionnaireController } from '../controllers/gestionnaireController'; // Gestionnaires
import { alerteController } from '../controllers/alerteController';          // Alertes
import { login } from '../controllers/loginController';                      // Authentification
import { checkIsGestionnaire } from '../middlewares/checkIsGestionnaire';    // Middleware de sécurité

// 🛠️ CRÉATION DU ROUTER PRINCIPAL
// Ce router va regrouper toutes nos routes et servir de point d'entrée
const router = express.Router();

// 🔐 AUTHENTIFICATION
// Route POST /login pour se connecter
// - Reçoit email/mot de passe dans le body
// - Renvoie un token JWT si authentification réussie
router.post('/login', login);

// 📦 GESTION DES EPI
// On utilise un sous-router dédié aux EPI
// Toutes les routes commençant par /epis seront gérées par epiRoutes
console.log("🔌 Montage du sous-routeur /epis effectué");
router.use('/epis', epiRoutes);

// 📋 TYPES D'EPI
// Route GET pour lister tous les types d'EPI disponibles
// Utilisée dans les formulaires de création/modification d'EPI
router.get('/epi-types', epiTypeController.getAll);

// 🔍 CONTRÔLES
// Ensemble des routes pour gérer les contrôles des EPI
// - GET /controles : Liste tous les contrôles
// - GET /controles/:id : Détails d'un contrôle spécifique
// - GET /controles/epi/:epiId : Historique des contrôles d'un EPI
// - POST /controles : Crée un nouveau contrôle
router.get('/controles', controleController.getAll);
router.get('/controles/:id', controleController.getById);
router.get('/controles/epi/:epiId', controleController.getByEpiId);
router.post('/controles', controleController.create);

// 🔄 ROUTES DIVERSES
// Routes utilitaires pour récupérer des données de référence
// - Statuts possibles des EPI
// - Liste des gestionnaires
// - Alertes en cours
router.get('/statuts', statutController.getAll);
router.get('/gestionnaires', gestionnaireController.getAll);
router.get('/alertes', alerteController.getAlertes);

// 📤 EXPORT DU ROUTER
export default router;

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est le point d'entrée principal de l'API. Il :
// 1. Centralise toutes les routes de l'application
// 2. Organise les endpoints par fonctionnalité
// 3. Fait le lien avec les contrôleurs appropriés
//
// Points techniques à souligner :
// - Architecture REST API
// - Pattern MVC (Routes -> Contrôleurs -> Modèles)
// - Sécurité (authentification)
// - Organisation modulaire du code
