// ********** IMPORTS **********
// Express est le framework Node.js qu'on utilise pour créer notre API
// Il nous fournit les outils pour gérer les routes, les requêtes, etc.
import express from 'express';

// On importe le contrôleur des EPIs depuis son fichier
// Le contrôleur contient toute la logique : que faire quand une route est appelée ?
// Par exemple : récupérer des EPIs en base de données, les modifier, etc.
import { EpiController } from '../controllers/epiController';

// On crée un nouveau routeur Express qui va contenir toutes nos routes
// C'est comme créer un "standard téléphonique" pour gérer les appels
const router = express.Router();

// On crée une instance de notre contrôleur
// Cette instance contient toutes les méthodes pour gérer les EPIs
const epiController = new EpiController();

// ********** DÉFINITION DES ROUTES **********
// Chaque route est comme un numéro de téléphone qui déclenche une action spécifique

// GET / : Récupère TOUS les EPIs
// Exemple d'URL : /api/epis/
router.get('/', epiController.getAll);

// GET /:id : Récupère UN EPI spécifique via son ID
// Le :id est un paramètre dynamique, remplacé par un vrai ID dans l'URL
// Exemple d'URL : /api/epis/123
router.get('/:id', epiController.getById);

// POST / : Crée un nouvel EPI
// Cette route attend des données dans le corps de la requête (body)
// Le front-end enverra les infos du nouvel EPI à créer
router.post('/', epiController.create);

// PUT /:id : Modifie un EPI existant
// Combine un ID dans l'URL et des données dans le body
// Exemple : /api/epis/123 avec les nouvelles données dans le body
router.put('/:id', epiController.update);

// DELETE /:id : Supprime un EPI
// Exemple : /api/epis/123 supprimera l'EPI avec l'ID 123
router.delete('/:id', epiController.delete);

// On exporte le routeur pour pouvoir l'utiliser dans app.ts
// Le 'as epiRoutes' permet de le renommer pour plus de clarté
export { router as epiRoutes }; 

/*
RÉSUMÉ DU FICHIER epiRoutes.ts :
Ce fichier est un "aiguilleur" pour toutes les requêtes concernant les EPIs.
Il fait partie de l'architecture MVC (Model-View-Controller) et :
1. Définit les URLs (endpoints) disponibles pour gérer les EPIs
2. Fait le lien entre ces URLs et les fonctions du contrôleur
3. Permet au front-end de :
   - Lister tous les EPIs
   - Voir un EPI spécifique
   - Créer un nouvel EPI
   - Modifier un EPI
   - Supprimer un EPI

C'est un élément clé qui structure notre API et permet au front-end 
de communiquer proprement avec le back-end !
*/