import express from 'express';
import { controleController } from '../controllers/controleController';

const router = express.Router();

// Routes pour les contrôles
router.get('/', controleController.getAll);
router.get('/epi/:epiId', controleController.getByEpiId);
router.post('/', controleController.create);
router.get('/:id', controleController.getById);

export { router as controleRoutes }; 