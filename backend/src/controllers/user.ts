import { Response, Request } from "express";
import { User } from '../types/User';
import userService from '../services/user';

const createUser = async (req: Request, res: Response<User>) => {
  const userObj: User = req.body;
  const user = await userService.createUser(userObj);
  res.status(201).json(user);
};

const findAllUsers = async (_req: Request, res: Response<User[]>) => {
  const accounts = await userService.findAllUsers();
  res.status(200).json(accounts);
}

export default {
  createUser,
  findAllUsers,
};
