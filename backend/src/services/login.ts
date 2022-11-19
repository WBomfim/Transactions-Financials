import UserModel from '../database/models/User';
import { User } from '../types/User';
import { TokenReturn } from '../types/TokenReturn';
import { ErrorsTypes } from '../types/ErrorsCatalog';
import { verifyPassword } from '../helpers/passwordCrypto';
import { generateToken } from '../helpers/handleToken';

const login = async (loginObj: User): Promise<TokenReturn> => {
  const { username, password } = loginObj;

  const user = await UserModel.findOne({ where: { username } });
  if (!user) throw new Error(ErrorsTypes.INVALID_USERNAME);
  
  verifyPassword(password, user.password);

  return {
    username: user.username,
    token: generateToken(user),
  };
};

export default { login };
