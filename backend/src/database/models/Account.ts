import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from '.';

export default class AccountModel extends Model {
  public id!: number;
  public balance: number;
};

AccountModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  balance: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Account',
  tableName: 'Accounts',
  timestamps: false,
});
