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
        <div className='userInfo'>
            <h1>{ `Olá, ${username}` }</h1>
            <p>{ `Cc: ${userAccount}` }</p>
        </div>
        <div className='containerLogout'>
          <div
            className='showBalance'
            role='button'
            onClick={ () => setShowSaldo(!showSaldo) }
          >
            <p>Saldo</p>
            <p>
              { showSaldo ? `R$ ${balance.toString().replace('.', ',')}` : '👀' }
            </p>
          </div>
          <div
            className='btnLogout'
            role='button'
            onClick={ logout }
          >
            <p>Sair</p>
          </div>
        </div>
      </header>
    </>
  );
};
