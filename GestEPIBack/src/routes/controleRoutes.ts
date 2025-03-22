import express from 'express';
import { controleController } from '../controllers/controleController';

const router = express.Router();

// Routes pour les contrôles
router.get('/', controleController.getAll);
router.get('/:id', controleController.getById);
router.get('/epi/:epiId', controleController.getByEpiId);
router.post('/', controleController.create);

export { router as controleRoutes }; 