import { Model, INTEGER, DECIMAL, DATE } from 'sequelize';
import db from '.';

export default class TransactionModel extends Model {
  id!: number;
  debitedAccountId: number;
  creditedAccountId: number;
  amount: number;
  createdAt: Date;
};

TransactionModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  value: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Transaction',
  tableName: 'Transactions',
  timestamps: false,
});
