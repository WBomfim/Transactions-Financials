import { useState, useEffect } from 'react';
import { getLogin } from '../../helpers/handleStorage';
import { UserToken } from '../../helpers/handleStorage';
import './StatementeTable.css';

export type Transaction = {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt: string;
};

export default function StatementTable(
  { transactions }: { transactions: Transaction[] }
): JSX.Element {
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    const getUserData = (): void => {
      const { account } = getLogin() as UserToken;
      setUserId(account || 0);
    };
    getUserData();
  }, []);

  if (transactions.length === 0) return <span>Carregando...</span>;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Tipo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          { transactions.map(({id, debitedAccountId, value, createdAt}) => (
            <tr key={ id }>
              <td>{ new Date(createdAt).toLocaleDateString('pt-BR') }</td>
              <td>{ userId === debitedAccountId ? 'Débito' : 'Crédito' }</td>
              <td className='valueTransactions'>
                <p>R$</p>
                <p>{ value.toString().replace('.', ',') }</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
