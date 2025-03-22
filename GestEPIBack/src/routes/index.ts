import express from 'express';
import { epiRoutes } from './epiRoutes';
import { controleRoutes } from './controleRoutes';
import { alerteRoutes } from './alerteRoutes';
import { typeEpiRoutes } from './typeEpiRoutes';

const router = express.Router();

// Montage des routes
router.use('/epis', epiRoutes);
router.use('/controles', controleRoutes);
router.use('/alertes', alerteRoutes);
router.use('/types', typeEpiRoutes);

export { router };