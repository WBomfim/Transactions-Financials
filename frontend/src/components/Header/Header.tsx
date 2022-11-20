import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLogin, UserToken, removeLogin } from '../../helpers/handleStorage';
import './Header.css';

export type Balance = {
  balance: number;
};

export default function Header({ balance }: Balance): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [userAccount, setUserAccount] = useState<number>(0);
  const [showSaldo, setShowSaldo] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = (): void => {
    const { username, account } = getLogin() as UserToken;
    setUsername(username || '');
    setUserAccount(account || 0);
    }
    getUserData();
  }, []);

  const logout = (): void => {
    removeLogin();
    navigate('/login');
  }
    
  return (
    <>
      <header>
        <div>
          <h1>{ `Olá, ${username}` }</h1>
        </div>
        <div>
          <p>{ `Cc: ${userAccount}` }</p>
        </div>
        <div>
          <p>Saldo</p>
          <p
            role='button'
            onClick={ () => setShowSaldo(!showSaldo) }
          >{ showSaldo ? `R$ ${balance.toString().replace('.', ',')}` : 'Olho' }</p>
        </div>
        <div
          role='button'
          onClick={ logout }
        >
          <p>SAIR</p>
        </div>
      </header>
    </>
  );
};
