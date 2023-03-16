import {Router} from 'express';
import studentController from '../controllers/StudentController.js';

const router = new Router();

router.post('', studentController.addStudent);