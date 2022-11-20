import { useState, useEffect } from 'react';
import Header, { Balance } from '../components/Header/Header';
import StatementTable, { Transaction } from '../components/StatementTable/StatementTable';
import { requestData, setToken } from '../helpers/handleRequests';

export default function Home(): JSX.Element {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[] | []>([]);

  useEffect(() => {
    const getBalance = async (): Promise<void> => {
      setToken();
      const { balance } = await requestData('/accounts/balance') as Balance;
      setBalance(balance);
    };

    const getTransactions = async (): Promise<void> => {
      setToken();
      const transactions = await requestData('/transactions') as Transaction[];
      setTransactions(transactions);
    };

    getBalance();
    getTransactions();
  }, []);

  if (transactions.length === 0) return <span>Carregando...</span>;

  return (
    <>
      <Header balance={ balance } />
      <StatementTable transactions={transactions} />
    </>
  );
};
