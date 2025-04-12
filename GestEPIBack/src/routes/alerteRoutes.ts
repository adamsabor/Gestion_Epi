// ********** IMPORTS **********
// Express est le framework Node.js qu'on utilise pour créer notre API
// Il nous fournit les outils pour gérer les routes, requêtes, etc.
import express from 'express';

// On importe le contrôleur des alertes depuis son fichier
// Le contrôleur contient la logique métier (que faire quand on appelle une route)
import { alerteController } from '../controllers/alerteController';

// On crée un nouveau routeur Express
// Le routeur permet de regrouper toutes les routes liées aux alertes
const router = express.Router();

// ********** DÉFINITION DES ROUTES **********
// Cette route répond aux requêtes GET sur l'URL /api/alertes
// Quand le front fait une requête à cette URL, la fonction getAlertes du contrôleur est appelée
// Elle va récupérer toutes les alertes dans la base de données
router.get('/', alerteController.getAlertes);

// On exporte le routeur pour pouvoir l'utiliser dans app.ts
// Le 'as alerteRoutes' permet de le renommer pour plus de clarté
export { router as alerteRoutes }; 

/*
RÉSUMÉ DU FICHIER alerteRoutes.ts :
Ce fichier fait partie de la couche "Routes" de notre architecture MVC (Model-View-Controller).
Son rôle est de :
1. Définir les URLs (endpoints) disponibles pour gérer les alertes
2. Faire le lien entre ces URLs et les fonctions du contrôleur qui traitent les requêtes

C'est comme un standard téléphonique qui dirige les appels (requêtes) 
vers le bon interlocuteur (contrôleur) !
*/