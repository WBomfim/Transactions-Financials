import React, { useState } from 'react';
import { setToken, requestData } from '../../helpers/handleRequests';
import { getLogin } from '../../helpers/handleStorage';
import { Transaction } from '../StatementTable/StatementTable'
import './FilterByDate.css';

export default function FilterByDate(
  { setTransactions }: { setTransactions: React.Dispatch<React.SetStateAction<Transaction[] | []>> }
): JSX.Element {
  const [date, setDate] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const getTransactions = async (): Promise<void> => {
    const { account } = getLogin() as { account: number };
    setToken();
    const transactions = await requestData<Transaction[]>(`/transactions/date?q=${date}`);
    if (typeFilter === 'credit') {
      const transactionsCredit = transactions
        .filter(({ creditedAccountId }) => creditedAccountId === account);
      return setTransactions(transactionsCredit);
    }
    if (typeFilter === 'debit') {
      const transactionsDebit = transactions
        .filter(({ debitedAccountId }) => debitedAccountId === account);
      return setTransactions(transactionsDebit);
    }
    return setTransactions(transactions);
  };

  return (
    <div className="filterByDate">
      <h2>Informe a data desejada</h2>
      <div className="filterInputs">
        <input
          className='dateInput'
          type="date"
          value={ date }
          onChange={ (e) => setDate(e.target.value) }
        />
        <div className='typeTransaction'>
          <label htmlFor="all">
            <input
              id="all"
              type="radio"
              name='typeTransaction'
              checked={ typeFilter === 'all' }
              onChange={ () => setTypeFilter('all') }
            />
            Todas
          </label>
          <label htmlFor="credit">
            <input
              id="credit"
              type="radio"
              name='typeTransaction'
              checked={ typeFilter === 'credit' }
              onChange={ () => setTypeFilter('credit') }
            />
            Crédito
          </label>
          <label htmlFor="debit">
            <input
              id="debit"
              type="radio"
              name='typeTransaction'
              checked={ typeFilter === 'debit' }
              onChange={ () => setTypeFilter('debit') }
            />
            Débito
          </label>
        </div>
        <button
          className='btnFilter'
          type="button"
          onClick={ getTransactions }
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};
