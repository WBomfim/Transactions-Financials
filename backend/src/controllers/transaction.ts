import { Request, Response } from 'express';
import transactionService from '../services/transaction';
import { Transaction } from '../types/Transaction';
import StatusHttp from '../types/StatusHttp';

const createTransaction = async (req: Request, res: Response<Transaction>) => {
  const { user } = req.body;
  const { usernameCredited, value } = req.body;

  const transaction = await transactionService.createTransaction(
    user,
    { usernameCredited, value },
  );

  return res.status(StatusHttp.CREATED).json(transaction);
}

export default { createTransaction };
