import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLogin, UserToken, removeLogin } from '../helpers/handleStorage';

type Saldo = {
  saldo: number;
};

export default function Header({saldo}: Saldo): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [userAccount, setUserAccount] = useState<string>('');
  const [showSaldo, setShowSaldo] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = () => {
    const { username, account } = getLogin() as UserToken;
    setUsername(username || '');
    setUserAccount(account || '');
    }
    getUserData();
  }, []);

  const logout = () => {
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
          >{ showSaldo ? saldo.toFixed(2).replace('.', ',') : 'Olho' }</p>
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
