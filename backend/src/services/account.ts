import AccountModel from '../database/models/Account';
import { Account } from '../types/Account';
import { ErrorsTypes } from '../types/ErrorsCatalog';

const findBalanceById = async (id: string): Promise<Partial<Account>> => {
  const balance = await AccountModel.findOne(
    { where: { id }, attributes: ['balance'] },
  );
  if (!balance) throw new Error(ErrorsTypes.INVALID_ACCOUNT);
  return balance;
};

export default { findBalanceById };
