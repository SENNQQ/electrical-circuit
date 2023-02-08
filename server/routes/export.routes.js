import {Router} from 'express';
import exportController from '../controllers/ExportController.js';

const router = new Router();
router.post('/pdf', exportController.getPDFSchema);

export default router;