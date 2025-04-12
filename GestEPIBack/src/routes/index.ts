// ********** IMPORTS **********
// Express est le framework qui nous permet de créer notre API
// Il gère les routes, les requêtes HTTP, etc.
import express from 'express';

// On importe tous les contrôleurs dont on a besoin
// Les contrôleurs contiennent la logique métier (que faire quand une route est appelée)
// Par exemple : récupérer des données en base, les modifier, etc.
import { epiController } from '../controllers/epiController';
import { epiTypeController } from '../controllers/epiTypeController';
import { controleController } from '../controllers/controleController';
import { statutController } from '../controllers/statutController';
import { gestionnaireController } from '../controllers/gestionnaireController';
import { alerteController } from '../controllers/alerteController';

// On crée un routeur Express qui va contenir toutes nos routes
// C'est comme un "standard téléphonique" central qui va rediriger les appels
export const router = express.Router();

// ********** ROUTES POUR LES EPIs **********
// Ces routes permettent de gérer les EPIs (Équipements de Protection Individuelle)
// GET /epis : Récupère la liste de tous les EPIs
router.get('/epis', epiController.getAll);
// GET /epis/123 : Récupère l'EPI qui a l'ID 123
router.get('/epis/:id', epiController.getById);
// POST /epis : Crée un nouvel EPI avec les données envoyées
router.post('/epis', epiController.create);
// PUT /epis/123 : Modifie l'EPI qui a l'ID 123
router.put('/epis/:id', epiController.update);
// DELETE /epis/123 : Supprime l'EPI qui a l'ID 123
router.delete('/epis/:id', epiController.delete);

// ********** ROUTES POUR LES TYPES D'EPI **********
// GET /epi-types : Récupère la liste des différents types d'EPI possibles
// Par exemple : Casque, Harnais, Gants, etc.
router.get('/epi-types', epiTypeController.getAll);

// ********** ROUTES POUR LES CONTRÔLES **********
// Ces routes gèrent les contrôles périodiques des EPIs
// GET /controles : Liste tous les contrôles effectués
router.get('/controles', controleController.getAll);
// GET /controles/123 : Détails du contrôle avec l'ID 123
router.get('/controles/:id', controleController.getById);
// GET /controles/epi/456 : Liste tous les contrôles de l'EPI 456
router.get('/controles/epi/:epiId', controleController.getByEpiId);
// POST /controles : Enregistre un nouveau contrôle
router.post('/controles', controleController.create);

// ********** ROUTES POUR LES STATUTS **********
// GET /statuts : Liste les différents statuts possibles pour un EPI
// Par exemple : En service, Hors service, En contrôle, etc.
router.get('/statuts', statutController.getAll);

// ********** ROUTES POUR LES GESTIONNAIRES **********
// GET /gestionnaires : Liste tous les gestionnaires d'EPIs
// Ce sont les personnes responsables du suivi des équipements
router.get('/gestionnaires', gestionnaireController.getAll);

// ********** ROUTES POUR LES ALERTES **********
// GET /alertes : Récupère toutes les alertes
// Par exemple : EPIs dont le contrôle arrive à échéance
router.get('/alertes', alerteController.getAlertes);

/*
RÉSUMÉ DU FICHIER index.ts :
Ce fichier est le "point d'entrée" de toutes les routes de l'API.
Il joue un rôle central dans l'architecture du projet en :
1. Regroupant toutes les routes au même endroit
2. Organisant les routes par catégorie (EPIs, contrôles, etc.)
3. Faisant le lien entre les URLs et les contrôleurs

Quand le front-end fait une requête, par exemple GET /api/epis :
1. La requête arrive d'abord ici
2. Le routeur trouve la bonne route (/epis)
3. Il appelle la bonne fonction du contrôleur (epiController.getAll)
4. Le contrôleur fait le traitement et renvoie la réponse

C'est comme le "standard téléphonique" principal de l'application !
*/