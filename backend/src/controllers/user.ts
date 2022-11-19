import { Response, Request } from 'express';
import userService from '../services/user';
import { User } from '../types/User';
import StatusHttp from '../types/StatusHttp';

const createUser = async (req: Request, res: Response<User>) => {
  const userObj: User = req.body;
  const user = await userService.createUser(userObj);
  return res.status(StatusHttp.CREATED).json(user);
};

const findAllUsers = async (_req: Request, res: Response<User[]>) => {
  const accounts = await userService.findAllUsers();
  return res.status(StatusHttp.OK).json(accounts);
}

export default {
  createUser,
  findAllUsers,
};
