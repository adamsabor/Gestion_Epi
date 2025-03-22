import express from 'express';
import { gestionnaireController } from '../controllers/gestionnaireController';

const router = express.Router();

// Routes pour les gestionnaires
router.get('/', gestionnaireController.getAll);

export { router as gestionnaireRoutes }; 