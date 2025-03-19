import express from 'express';
import { EpiController } from '../controllers/epiController';

const router = express.Router();
const epiController = new EpiController();

// Routes pour les EPIs
router.get('/', epiController.getAllEpis);
router.get('/:id', epiController.getEpiById);
router.post('/', epiController.createEpi);
router.put('/:id', epiController.updateEpi);
router.delete('/:id', epiController.deleteEpi);

export { router as epiRoutes }; 