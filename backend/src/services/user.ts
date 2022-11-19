import UserModel from '../database/models/User';
import AccountModel from '../database/models/Account';
import sequelizeInstance from '../database/models';
import { User } from '../types/User';
import { TokenReturn } from './../types/TokenReturn';
import { validateUserData } from './../helpers/validateUserData';
import { hashPassword } from '../helpers/passwordCrypto';
import { generateToken } from '../helpers/handleToken';
import { ErrorsTypes } from '../types/ErrorsCatalog';

const createUser = async (userObj: User): Promise<TokenReturn> => {  
  const { username, password } = userObj;
  validateUserData(userObj);

  const userExists = await UserModel.findOne({ where: { username } });
  if (userExists) throw new Error(ErrorsTypes.USER_ALREADY_EXISTS);
  
  const newUser = await sequelizeInstance.transaction(async (transaction) => {
    const INITIAL_BALANCE = 100.00;
    const { id: accountId } = await AccountModel.create(
      { balance: INITIAL_BALANCE },{ transaction }
    );
    const hash = hashPassword(password);
    const user = await UserModel.create(
      { username, password: hash, accountId }, { transaction }
    );
    return user;
  });

  return {
    username: newUser.username,
    token: generateToken(newUser),
  };
};

const findAllUsers = async (): Promise<Partial<User>[]> => {
  return UserModel.findAll({ attributes: { exclude: ['password'] }});
};

export default {
  createUser,
  findAllUsers,
}
