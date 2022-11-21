import { useState, useEffect } from 'react';
import { getLogin } from '../../helpers/handleStorage';
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
  const [userAccount, setUserAccount] = useState<number>();

  useEffect(() => {
    const getUserData = (): void => {
      const { account } = getLogin() as { account: number };
      setUserAccount(account);
    };
    getUserData();
  }, []);

  if (transactions.length === 0) {
    return (
      <div className="notFound">
        <p>Nenhuma trasação encontrada.</p>
      </div>
    )
  }

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
              <td>{ userAccount === debitedAccountId ? 'Débito' : 'Crédito' }</td>
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
