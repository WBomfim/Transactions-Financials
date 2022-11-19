import { Router } from 'express';
import userController from '../controllers/user';
import auth from '../middlewares/auth';

const router = Router();

router.post('/', userController.createUser);

router.get('/', auth, userController.findAllUsers);

export default router;
