import express from 'express';
import { epiTypeController } from '../controllers/epiTypeController';

const router = express.Router();

// Routes pour les types d'EPI
router.get('/', epiTypeController.getAll);

export { router as typeEpiRoutes }; 