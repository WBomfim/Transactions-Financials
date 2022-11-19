import UserModel from '../database/models/User';
import AccountModel from '../database/models/Account';
import sequelizeInstance from '../database/models';
import { User } from '../types/User';
import { validateUserData } from './../helpers/validateUserData';
import { hashPassword } from '../helpers/passwordCrypto';

const createUser = async (userObj: User): Promise<User> => {  
  validateUserData(userObj);
  
  const newUser = await sequelizeInstance.transaction(async (transaction) => {
    const INITIAL_BALANCE = 100.00;
    const { id: accountId } = await AccountModel.create(
      { balance: INITIAL_BALANCE },{ transaction }
    );
    const { username, password } = userObj;
    const hash = hashPassword(password);
    const user = await UserModel.create(
      { username, password: hash, accountId }, { transaction }
    );
    return user;
  });
  
  return newUser;
};

const findAllUsers = async (): Promise<User[]> => {
  return UserModel.findAll({ attributes: { exclude: ['id', 'password'] }});
};

export default {
  createUser,
  findAllUsers,
}
