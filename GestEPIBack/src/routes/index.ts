import express from 'express';
import { EpiController } from '../controllers/epiController';
import { controleController } from '../controllers/controleController';
import { epiTypeController } from '../controllers/epiTypeController';
import { epiRoutes } from './epiRoutes';
import { controleRoutes } from './controleRoutes';
import { alerteRoutes } from './alerteRoutes';

const router = express.Router();
const epiController = new EpiController();

// Routes pour les EPIs
router.get('/api/epis', epiController.getAll);
router.get('/api/epis/:id', epiController.getById);
router.post('/api/epis', epiController.create);
router.put('/api/epis/:id', epiController.update);
router.delete('/api/epis/:id', epiController.delete);

// Routes pour les contrôles
router.get('/controles', controleController.getAll);
router.get('/controles/epi/:epiId', controleController.getByEpiId);
router.post('/controles', controleController.create);
router.get('/controles/:id', controleController.getById);

// Routes pour les types d'EPI
router.get('/api/epi-types', epiTypeController.getAll);

// Ajouter cette route pour la compatibilité avec le frontend
router.get('/table/epi', epiController.getAll);

router.use('/epis', epiRoutes);
router.use('/controles', controleRoutes);
router.use('/alertes', alerteRoutes);

export { router }; 