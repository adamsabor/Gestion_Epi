import express from 'express';
import { epiController } from '../controllers/epiController';
import { epiTypeController } from '../controllers/epiTypeController';
import { controleController } from '../controllers/controleController';
import { statutController } from '../controllers/statutController';
import { gestionnaireController } from '../controllers/gestionnaireController';
import { alerteController } from '../controllers/alerteController';

export const router = express.Router();

// Routes pour les EPIs
router.get('/epis', epiController.getAll);
router.get('/epis/:id', epiController.getById);
router.post('/epis', epiController.create);
router.put('/epis/:id', epiController.update);
router.delete('/epis/:id', epiController.delete);

// Routes pour les types d'EPI
router.get('/epi-types', epiTypeController.getAll);

// Routes pour les contrôles
router.get('/controles', controleController.getAll);
router.get('/controles/:id', controleController.getById);
router.get('/controles/epi/:epiId', controleController.getByEpiId);
router.post('/controles', controleController.create);

// Routes pour les statuts
router.get('/statuts', statutController.getAll);

// Routes pour les gestionnaires
router.get('/gestionnaires', gestionnaireController.getAll);

// Routes pour les alertes
router.get('/alertes', alerteController.getAlertes);