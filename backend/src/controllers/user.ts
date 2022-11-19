import { Response, Request } from 'express';
import userService from '../services/user';
import { User } from '../types/User';
import { TokenReturn } from './../types/TokenReturn';
import StatusHttp from '../types/StatusHttp';

const createUser = async (req: Request, res: Response<TokenReturn>) => {
  const userObj: User = req.body;
  const user = await userService.createUser(userObj);
  return res.status(StatusHttp.CREATED).json(user);
};

const findAllUsers = async (req: Request, res: Response<Partial<User>[]>) => {
  const { id } = req.body.user;
  const accounts = await userService.findAllUsers(id);
  return res.status(StatusHttp.OK).json(accounts);
}

export default {
  createUser,
  findAllUsers,
};
