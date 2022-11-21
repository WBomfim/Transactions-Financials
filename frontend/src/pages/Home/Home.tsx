import { useState, useEffect } from 'react';
import Header, { Balance } from '../../components/Header/Header';
import StatementTable, { Transaction } from '../../components/StatementTable/StatementTable';
import Modal from '../../components/Modal/Modal';
import FilterByDate from '../../components/FilterByDate/FilterByDate';
import DoTransfer from '../../components/DoTransfer/DoTransfer';
import { requestData, setToken } from '../../helpers/handleRequests';
import './Home.css';

export default function Home(): JSX.Element {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[] | []>([]);
  const [showFilterData, setShowFilterData] = useState<boolean>(false);
  const [showTransfer, setShowTransfer] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const closeModal = (): void => {
      setShowFilterData(false);
    };
    closeModal();
  }, [transactions]);

  useEffect(() => {
    const loadingPage = async (): Promise<void> => {
      setLoading(true);
      await getBalance();
      await getTransactions();
      setLoading(false);
    };
    loadingPage();
  }, []);

  const getBalance = async (): Promise<void> => {
    setToken();
    const { balance } = await requestData<Balance>('/accounts/balance');
    setBalance(balance);
  };

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

  if (loading) {
    return (
      <div className="notFound">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <>
      <Header balance={ balance } />
      <main>
        <nav>
          <div className='containerFilter'>
            <p>Filtros:</p>
            <div className='divBtnFilter'>
              <button
                type="button"
                onClick={ getTransactions }
              >
                Todas
              </button>
              <button
                type="button"
                onClick={ getTrasactionsCashIn }
              >
                Crédito
              </button>
              <button
                type="button"
                onClick={ getTrasactionsCashOut }
              >
                Débito
              </button>
              <button
                type="button"
                onClick={ () => setShowFilterData(!showFilterData) }
              >
                Data
              </button>
            </div>
          </div>
          <div className='divBtnNewTrans'>
            <button
              className='btnNewTransaction'
              type="button"
              onClick={ () => setShowTransfer(!showTransfer) }
            >
              Nova Transferência
            </button>
          </div>
        </nav>
        <StatementTable transactions={transactions} />
        <section>
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
          { showTransfer && (
            <Modal
              show={ showTransfer }
              setShow={ setShowTransfer }
              children={ (
                <DoTransfer
                  setShowTransfer={ setShowTransfer }
                  updateBalance={ getBalance }
                />
              )}
            />
          )}
        </section>
      </main>
    </>
  );
};
