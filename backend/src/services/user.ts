import UserModel from '../database/models/User';
import AccountModel from '../database/models/Account';
import sequelizeInstance from '../database/models';
import { User } from '../types/User';

const createUser = async (userObj: User): Promise<User> => {
  const INITIAL_BALANCE = 100.00;
  const newUser = await sequelizeInstance.transaction(async (transaction) => {
    const { id: accountId } = await AccountModel.create(
      { balance: INITIAL_BALANCE },{ transaction }
    );
    const user = await UserModel.create(
      { ...userObj, accountId }, { transaction }
    );
    return user;
  });

  return newUser;
};

const findAllUsers = async (): Promise<User[]> => {
  return UserModel.findAll({ attributes: { exclude: ['id', 'password'] }});
};

const findUserByName = async (username: string): Promise<User | null> => {
  return UserModel.findOne({ where: { username } });
};

export default {
  createUser,
  findAllUsers,
  findUserByName,
}
