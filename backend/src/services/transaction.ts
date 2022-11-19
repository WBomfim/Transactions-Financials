import TransactionModel from '../database/models/Transaction';
import AccountModel from '../database/models/Account';
import sequelizeInstance from '../database/models';
import { Op } from 'sequelize';
import { User } from './../types/User';
import { TransactionRequest, Transaction } from '../types/Transaction';
import { ErrorsTypes } from '../types/ErrorsCatalog';
import { getAccountByUsername } from './account';
import { calcOfTransfer } from '../helpers/calcTrasaction';

const createTransaction = async (userObj: User, transactionObj: TransactionRequest) => {
  const { usernameCredited, value } = transactionObj;
  const { accountId: debitAccount, username: debitUsername } = userObj;

  const { accountId: creditAccount, balance: balanceforCredit } = (
    await getAccountByUsername(usernameCredited)
  );
  const { balance: balanceforDebit } = (
    await getAccountByUsername(debitUsername)
  );

  if (debitAccount === creditAccount) throw new Error(ErrorsTypes.INVALID_CREDIT_ACCOUNT);
  if (balanceforDebit < value) throw new Error(ErrorsTypes.INSUFFICIENT_BALANCE);
  if (value <= 0) throw new Error(ErrorsTypes.INVALID_VALUE);
  
  const { newAmountDebit, newAmountCredit } = calcOfTransfer(
    value, Number(balanceforDebit), Number(balanceforCredit),
  );

  const transaction = await sequelizeInstance.transaction( async (transaction) => {    
    await AccountModel.update(
      { balance: newAmountDebit },
      { where: { id: debitAccount }, transaction },
    );
    await AccountModel.update(
      { balance: newAmountCredit },
      { where: { id: creditAccount }, transaction },
    );
    const createTransaction = await TransactionModel.create(
      {
        debitedAccountId: debitAccount,
        creditedAccountId: creditAccount,
        value,
        createdAt: new Date()
      },
      { transaction }
    );
    return createTransaction;
  });

  return transaction;
};

const getAllTransactions = async (accountId: number): Promise<Transaction[]> => {
  return await TransactionModel.findAll({
    where: {
      [Op.or]: [
        { debitedAccountId: accountId },
        { creditedAccountId: accountId },
      ],
    },
  });
};


export default {
  createTransaction,
  getAllTransactions,
};
