import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestRegister } from '../../helpers/handleRequests';
import { getLogin, saveLogin, UserToken } from '../../helpers/handleStorage';
import './Login.css';

export default function Login(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [failedTryRegister, setFailedTryRegister] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyUserLoged = (): void => {
      const userInfos = getLogin();
      if (!userInfos?.token) return;
      return navigate('/home');
    };
    verifyUserLoged();
  }, [navigate]);

  useEffect(() => {
    const verifyRegisterData = (): void => {
      const nameLengthMin = 3;
      const passwordLengthMin = 8;
      const errors = [
        !username || username.length < nameLengthMin,
        !password || password.length < passwordLengthMin,
        !password || !password.match(/(?=.*[A-Z])(?=.*[0-9]).*$/),
      ];
      const hasErrors = errors.some((error) => error);
      setDisabledButton(hasErrors);
    };
    verifyRegisterData();
  }, [username, password]);

  const login = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    setFailedTryRegister(false);
    try {
      const response = await requestRegister<UserToken>('/login', { username, password });
      saveLogin(response);
      return navigate('/home');
    } catch (error) {
      setFailedTryRegister(true);
    }
  };

  return (
    <main>
      <section className='containerlogin'>
        <h1>Bem Vindo!</h1>
        <form>
          <label htmlFor='name-input'>
            Nome:
            <input
              id='name-input'
              type='text'
              onChange={({ target: { value } }) => {
                setUsername(value);
              }}
              placeholder='Marcelo da Silva'
            />
          </label>
          <label htmlFor='password-input'>
            Senha:
            <input
              id='password-input'
              type='password'
              onChange={({ target: { value } }) => {
                setPassword(value);
              }}
              placeholder='**********'
            />
          </label>
          <button
           className='btnlogin'
            type='submit'
            disabled={disabledButton}
            onClick={(event) => login(event)}
          >
            ENTRAR
          </button>
          <button
            className='btnGoRegister'
            type="button"
            onClick={ () => navigate('/registration') }
          >
            Ainda n??o tenho conta
          </button>
          <div className='failedLogin'>
            {failedTryRegister && (
              <p>Usu??rio ou senha invalido</p>
            )}
          </div>
        </form>
      </section>
    </main>
  );
};
