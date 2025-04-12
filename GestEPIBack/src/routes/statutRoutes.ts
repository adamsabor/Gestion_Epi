// ********** IMPORTS **********
// Express est le framework Node.js qu'on utilise pour créer notre API
// Il nous fournit les outils pour gérer les routes, les requêtes HTTP, etc.
import express from 'express';

// On importe le contrôleur des statuts depuis son fichier
// Le contrôleur contient toute la logique : que faire quand une route est appelée ?
// Par exemple : récupérer la liste des statuts en base de données
import { statutController } from '../controllers/statutController';

// On crée un nouveau routeur Express qui va contenir toutes nos routes
// C'est comme créer un "standard téléphonique" pour gérer les appels
const router = express.Router();

// ********** DÉFINITION DES ROUTES **********
// Cette route répond aux requêtes GET sur l'URL /api/statuts
// Quand le front fait une requête à cette URL, la fonction getAll du contrôleur est appelée
// Elle va récupérer tous les statuts possibles dans la base de données
// Par exemple : En service, Hors service, En contrôle, etc.
router.get('/', statutController.getAll);

// On exporte le routeur pour pouvoir l'utiliser dans app.ts
// Le 'as statutRoutes' permet de le renommer pour plus de clarté
export { router as statutRoutes }; 

/*
RÉSUMÉ DU FICHIER statutRoutes.ts :
Ce fichier fait partie de la couche "Routes" de notre architecture MVC (Model-View-Controller).
Son rôle est de :
1. Définir les URLs (endpoints) disponibles pour gérer les statuts des EPIs
2. Faire le lien entre ces URLs et les fonctions du contrôleur qui traitent les requêtes

Pour l'instant, il ne gère qu'une seule route :
- GET / : Pour récupérer la liste de tous les statuts possibles d'un EPI

C'est comme un standard téléphonique qui dirige les appels (requêtes) 
vers le bon interlocuteur (contrôleur) !
*/