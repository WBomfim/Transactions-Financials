import { Router } from 'express';
import accountController from '../controllers/account';
import auth from '../middlewares/auth';

const router = Router();

router.get('/balance', auth, accountController.findBalanceById);

export default router;
