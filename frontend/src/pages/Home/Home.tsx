import { useState, useEffect } from 'react';
import Header, { Balance } from '../../components/Header/Header';
import StatementTable, { Transaction } from '../../components/StatementTable/StatementTable';
import Modal from '../../components/Modal/Modal';
import FilterByDate from '../../components/FilterByDate/FilterByDate';
import { requestData, setToken } from '../../helpers/handleRequests';
import './Home.css';

export default function Home(): JSX.Element {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[] | []>([]);
  const [showFilterData, setShowFilterData] = useState<boolean>(false);

  useEffect(() => {
    const closeModal = (): void => {
      setShowFilterData(false);
    };
    closeModal();
  }, [transactions]);

  useEffect(() => {
    const getBalance = async (): Promise<void> => {
      setToken();
      const { balance } = await requestData<Balance>('/accounts/balance');
      setBalance(balance);
    };
    getBalance();
    getTransactions();
  }, []);

  const getTransactions = async (): Promise<void> => {
    setToken();
    const transactions = await requestData<Transaction[]>('/transactions');
    setTransactions(transactions);
  };

  const getTrasactionsCashIn = async (): Promise<void> => {
    setToken();
    const transactions = await requestData<Transaction[]>('/transactions/cash-in');
    setTransactions(transactions);
  };

  const getTrasactionsCashOut = async (): Promise<void> => {
    setToken();
    const transactions = await requestData<Transaction[]>('/transactions/cash-out')
    setTransactions(transactions);
  };

  return (
    <>
      <Header balance={ balance } />
      <main>
        { showFilterData && (
          <Modal
            show={ showFilterData }
            setShow={ setShowFilterData }
            children={ (
              <FilterByDate
                setTransactions={ setTransactions }
              />
            )}
          />
        )}
        <nav>
          <div>
            <p>Filtros</p>
            <div>
              <button
                onClick={ getTransactions }
              >
                Todas
              </button>
              <button
                onClick={ getTrasactionsCashIn }
              >
                Crédito
              </button>
              <button
                onClick={ getTrasactionsCashOut }
              >
                Débito
              </button>
              <button
                onClick={ () => setShowFilterData(!showFilterData) }
              >
                Data
              </button>
            </div>
          </div>
          <div>
            <button>
              Nova Transação
            </button>
          </div>
        </nav>
        <StatementTable transactions={transactions} />
      </main>
    </>
  );
};
