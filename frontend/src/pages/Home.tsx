import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import { requestData, setToken } from '../helpers/handleRequests';

type Balance = {
  balance: number;
};

export default function Home(): JSX.Element {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const getBalance = async (): Promise<void> => {
      setToken();
      const { balance } = await requestData('/accounts/balance') as Balance;
      setBalance(balance);
    };
    getBalance();
  }, []);

  return (
    <>
      <Header balance={ balance } />
      <h1>Home Aquii!!</h1>
    </>
  );
}
