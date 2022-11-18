import { Router } from 'express';
import userController from '../controllers/user';

const router = Router();

router.post('/', userController.createUser);

router.get('/', userController.findAllUsers);

export default router;
