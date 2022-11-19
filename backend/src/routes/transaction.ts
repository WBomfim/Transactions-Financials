import { Router } from 'express';
import transactionController from '../controllers/transaction';
import auth from '../middlewares/auth';

const router = Router();

router.post('/', auth, transactionController.createTransaction);

router.get('/', auth, transactionController.getAllTransactions);

export default router;
