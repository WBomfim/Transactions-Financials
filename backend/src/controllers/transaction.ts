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
};

const getAllTransactions = async (req: Request, res: Response<Transaction[] | []>) => {
  const { accountId } = req.body.user;
  const transactions = await transactionService.getAllTransactions(accountId);
  return res.status(StatusHttp.OK).json(transactions);
};

const getCreditTransactions = async (req: Request, res: Response<Transaction[] | []>) => {
  const { accountId } = req.body.user;
  const transactions = await transactionService.getCreditTransactions(accountId);
  return res.status(StatusHttp.OK).json(transactions);
};

const getDebitTransactions = async (req: Request, res: Response<Transaction[] | []>) => {
  const { accountId } = req.body.user;
  const transactions = await transactionService.getDebitTransactions(accountId);
  return res.status(StatusHttp.OK).json(transactions);
};

const getTransactionsByDate = async (req: Request, res: Response<Transaction[] | []>) => {
  const { accountId } = req.body.user;
  const { date } = req.body;
  const transactions = await transactionService.getTransactionsByDate(accountId, date);
  return res.status(StatusHttp.OK).json(transactions);
};

export default {
  createTransaction,
  getAllTransactions,
  getCreditTransactions,
  getDebitTransactions,
  getTransactionsByDate,
};
