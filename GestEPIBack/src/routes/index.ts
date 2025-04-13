import express from 'express';
import { epiController } from '../controllers/epiController';
import { epiTypeController } from '../controllers/epiTypeController';
import { controleController } from '../controllers/controleController';
import { statutController } from '../controllers/statutController';
import { gestionnaireController } from '../controllers/gestionnaireController';
import { alerteController } from '../controllers/alerteController';
import { login } from '../controllers/loginController';
import { checkIsGestionnaire } from '../middlewares/checkIsGestionnaire';

const router = express.Router();

router.post('/login', login);

router.get('/epis', epiController.getAll);
router.get('/epis/:id', epiController.getById);
router.post('/epis', epiController.create);
router.put('/epis/:id', epiController.update);
router.delete('/epis/:id', epiController.delete);

router.get('/epi-types', epiTypeController.getAll);
router.get('/controles', controleController.getAll);
router.get('/controles/:id', controleController.getById);
router.get('/controles/epi/:epiId', controleController.getByEpiId);
router.post('/controles', controleController.create);
router.get('/statuts', statutController.getAll);
router.get('/gestionnaires', gestionnaireController.getAll);
router.get('/alertes', alerteController.getAlertes);

export default router;
