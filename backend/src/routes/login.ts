import { Router } from 'express';
import loginController from '../controllers/login';

const router = Router();

router.post('/', loginController.login);

export default router;
