import express from 'express';
import { alerteController } from '../controllers/alerteController';

const router = express.Router();

// Routes pour les alertes
router.get('/', alerteController.getAlertes);

export { router as alerteRoutes }; 