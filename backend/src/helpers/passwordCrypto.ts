import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { ErrorsTypes } from '../types/ErrorsCatalog';

export const hashPassword = (password: string): string => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
}

export const verifyPassword = (password: string, hash: string): void => {
  const isValid = compareSync(password, hash);
  if (!isValid) throw new Error(ErrorsTypes.INVALID_PASSWORD);
}
