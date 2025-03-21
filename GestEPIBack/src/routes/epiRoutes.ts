import express from 'express';
import { EpiController } from '../controllers/epiController';

const router = express.Router();
const epiController = new EpiController();

// Routes pour les EPIs
router.get('/', epiController.getAll);
router.get('/:id', epiController.getById);
router.post('/', epiController.create);
router.put('/:id', epiController.update);
router.delete('/:id', epiController.delete);

export { router as epiRoutes }; 