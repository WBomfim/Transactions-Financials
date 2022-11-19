import { Request, Response } from 'express';
import loginService from '../services/login';
import StatusHttp from '../types/StatusHttp';
import { User } from '../types/User';
import { TokenReturn } from '../types/TokenReturn';

const login = async (req: Request, res: Response<TokenReturn>) => {
  const loginObj: User = req.body;
  const tokenData = await loginService.login(loginObj);
  return res.status(StatusHttp.OK).json(tokenData);
}

export default { login };
