import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';
import { User } from '../types/User';
import { ErrorsTypes } from '../types/ErrorsCatalog';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (user: User): string => {
  const { id, username, accountId } = user;
  return sign({ id, username, accountId }, JWT_SECRET, { expiresIn: '1d' });
}

export const verifyToken = (token: string): User => {
  try {
    const payload = verify(token, JWT_SECRET) as User;
    return payload;
  } catch (error) {
    throw new Error(ErrorsTypes.INVALID_TOKEN);
  }
}
