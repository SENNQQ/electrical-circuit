import {Router} from 'express';
import exportRoutes from './export.routes.js';
import studentRoutes from './student.routes.js';

const router = new Router();

router.use('/export', exportRoutes);
router.use('/student', studentRoutes);

export default router;
