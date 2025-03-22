import express from 'express';
import { statutController } from '../controllers/statutController';

const router = express.Router();

// Routes pour les statuts
router.get('/', statutController.getAll);

export { router as statutRoutes }; 