import express from 'express';
import { epiRoutes } from './epiRoutes';
import { controleRoutes } from './controleRoutes';
import { alerteRoutes } from './alerteRoutes';
import { typeEpiRoutes } from './typeEpiRoutes';
import { statutRoutes } from './statutRoutes';
import { gestionnaireRoutes } from './gestionnaireRoutes';

const router = express.Router();

// Montage des routes
router.use('/epis', epiRoutes);
router.use('/controles', controleRoutes);
router.use('/alertes', alerteRoutes);
router.use('/types', typeEpiRoutes);
router.use('/statuts', statutRoutes);
router.use('/gestionnaires', gestionnaireRoutes);

export { router };