import express from 'express';
import { epiController } from '../controllers/epiController';
import { controleController } from '../controllers/controleController';
import { epiTypeController } from '../controllers/epiTypeController';

export const router = express.Router();

// Routes pour les EPIs
router.get('/epis', epiController.getAll);
router.get('/epis/:id', epiController.getById);
router.post('/epis', epiController.create);
router.put('/epis/:id', epiController.update);
router.delete('/epis/:id', epiController.delete);

// Routes pour les contrôles
router.get('/controles', controleController.getAll);
router.get('/controles/epi/:epiId', controleController.getByEpiId);
router.post('/controles', controleController.create);
router.get('/controles/:id', controleController.getById);

// Routes pour les types d'EPI
router.get('/epi-types', epiTypeController.getAll);

// Ajouter cette route pour la compatibilité avec le frontend
router.get('/table/epi', epiController.getAll); 