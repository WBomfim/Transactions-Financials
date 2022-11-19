import { Request, Response } from 'express';
import accountSevice from '../services/account';
import StatusHttp from '../types/StatusHttp';
import { Account } from '../types/Account';

const findBalanceById = async (req: Request, res: Response<Partial<Account>>) => {
  const { id } = req.body.user;
  const balance = await accountSevice.findBalanceById(id);
  return res.status(StatusHttp.OK).json(balance);
};

export default { findBalanceById };
