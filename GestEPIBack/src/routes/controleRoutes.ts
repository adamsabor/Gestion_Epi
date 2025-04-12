// ********** IMPORTS **********
// Express est le framework Node.js qu'on utilise pour créer notre API
// Il nous fournit les outils pour gérer les routes, requêtes, etc.
import express from 'express';

// On importe le contrôleur des contrôles depuis son fichier
// Le contrôleur contient toute la logique métier : que faire quand une route est appelée ?
// Par exemple : récupérer des données en BDD, les traiter, les renvoyer...
import { controleController } from '../controllers/controleController';

// On crée un nouveau routeur Express qui va contenir toutes nos routes
// C'est comme créer un nouveau "standard téléphonique" pour gérer les appels
const router = express.Router();

// ********** DÉFINITION DES ROUTES **********
// Chaque route est comme un numéro de téléphone qui, quand on l'appelle,
// déclenche une action spécifique dans le contrôleur

// GET / : Récupère TOUS les contrôles
// Exemple d'URL : /api/controles/
router.get('/', controleController.getAll);

// GET /:id : Récupère UN contrôle spécifique via son ID
// Le :id est un paramètre dynamique, remplacé par un vrai ID dans l'URL
// Exemple d'URL : /api/controles/123
router.get('/:id', controleController.getById);

// GET /epi/:epiId : Récupère tous les contrôles d'un EPI spécifique
// Exemple d'URL : /api/controles/epi/456
router.get('/epi/:epiId', controleController.getByEpiId);

// POST / : Crée un nouveau contrôle
// Cette route attend des données dans le corps de la requête (body)
// Le front-end enverra les infos du nouveau contrôle à créer
router.post('/', controleController.create);

// On exporte le routeur pour pouvoir l'utiliser dans app.ts
// Le 'as controleRoutes' permet de le renommer pour plus de clarté
export { router as controleRoutes }; 

/*
RÉSUMÉ DU FICHIER controleRoutes.ts :
Ce fichier est un "aiguilleur" pour toutes les requêtes concernant les contrôles.
Il fait partie de l'architecture MVC (Model-View-Controller) et :
1. Définit les URLs (endpoints) disponibles pour gérer les contrôles
2. Fait le lien entre ces URLs et les fonctions du contrôleur
3. Permet au front-end de :
   - Lister tous les contrôles
   - Voir un contrôle spécifique
   - Voir tous les contrôles d'un EPI
   - Créer un nouveau contrôle

C'est un élément clé qui structure notre API et permet au front-end 
de communiquer proprement avec le back-end !
*/