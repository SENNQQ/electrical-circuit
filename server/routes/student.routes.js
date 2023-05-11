import {Router} from 'express';
import studentController from '../controllers/StudentController.js';

const router = new Router();

router.post('/get', studentController.getStudent);
router.post('', studentController.addStudent);


export default router
