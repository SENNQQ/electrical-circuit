import {Router} from 'express';
import exportRoutes from './export.routes.js';

const router = new Router();

router.use('/export', exportRoutes);

export default router;