import AccountModel from '../database/models/Account';
import UserModel from '../database/models/User';
import { Account } from '../types/Account';
import { ErrorsTypes } from '../types/ErrorsCatalog';
import { AccountAmount } from '../types/Account';

export const getAccountByUsername = async (username: string) => {
  const { accountId, account: { balance } } = await UserModel.findOne({
    where: { username }, attributes: ['accountId'],
    include: [{ model: AccountModel, as: 'account', attributes: ['balance'] }],
  }) as unknown as AccountAmount;
  return { accountId , balance };
};

const findBalanceById = async (id: string): Promise<Partial<Account>> => {
  const balance = await AccountModel.findOne(
    { where: { id }, attributes: ['balance'] },
  );
  if (!balance) throw new Error(ErrorsTypes.INVALID_ACCOUNT);
  return balance;
};

export default { findBalanceById };
