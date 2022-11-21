import { useState, useEffect } from "react";
import { setToken, requestData, requestRegister } from '../../helpers/handleRequests';
import './DoTransfer.css'

type Recipient = {
  id: number;
  username: string;
  accountId: number;
};

export default function DoTransfer(
  { setShowTransfer }: { setShowTransfer: (show: boolean) => void }
): JSX.Element {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [recipientSelected, setRecipientSelected] = useState<string>('');
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [amount, setAmount] = useState<string>('');

  useEffect(() => {
    const getRecipients = async (): Promise<void> => {
      setToken();
      const recipients = await requestData<Recipient[]>('/users');
      setRecipients(recipients);
    };
    getRecipients();
  }, []);

  useEffect(() => {
    const verifyTranferData = (): void => {
      const errors = [
        !recipientSelected,
        !(Number(amount) > 0),
      ];
      const hasErrors = errors.some((error) => error);
      setDisabledButton(hasErrors);
    };
    verifyTranferData();
  }, [recipientSelected, amount]);

  const verifyAmount = (value: string): void => {
    if (Number(value) >= 0) {
      setAmount(value);
    }
  };

  const handleTransfer = async (): Promise<void> => {
    setToken();
    await requestRegister(
      '/transactions', {usernameCredited: recipientSelected, value: Number(amount)}
    );
    setShowTransfer(false);
  };

  return (
    <div className="transaction">
      <h2>Transferência</h2>
      <div className="selectInputs">
        <select
          value={ recipientSelected }
          onChange={ ({ target: { value } }) => setRecipientSelected(value) }
        >
          <option value="">Selecione o favorecido</option>
          {recipients.map(({ id, username }) => (
            <option key={ id } value={ username }>
              {username}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Digite o valor"
          value={ amount }
          onChange={ ({ target: { value } }) => verifyAmount(value) }
        />
        <button
          type="button"
          disabled={ disabledButton }
          onClick={ handleTransfer }
        >
          TRANSFERIR
        </button>
      </div>
    </div>
  );
};
