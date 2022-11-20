import { useState, useEffect } from 'react';

export default function Registration(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [failedTryRegister, setFailedTryRegister] = useState<boolean>(false);

  useEffect(() => {
    const verifyRegisterData = () => {
      const nameLengthMin = 3;
      const passwordLengthMin = 8;
      const errors = [
        !username || username.length < nameLengthMin,
        !password || password.length < passwordLengthMin,
        !password ||
          !password.match(/(?=.*[A-Z])(?=.*[0-9]).*$/),
      ];
      const hasErrors = errors.some((error) => error);
      setDisabledButton(hasErrors);
    };
    verifyRegisterData();
  }, [username, password]);

  return (
    <main>
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
            type='text'
            onChange={({ target: { value } }) => {
              setPassword(value);
            }}
            placeholder='**********'
          />
        </label>
        <button
          type='submit'
          disabled={disabledButton}
        >
          CADASTRAR
        </button>
      </form>
      <div>
        {failedTryRegister ? (
          <p>Você já está cadastrado em nosso banco de dados.</p>
        ) : null}
      </div>
    </main>
  );
}
