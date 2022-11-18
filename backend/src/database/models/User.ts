import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import AccountModel from './Account';

export default class UserModel extends Model {
  id!: number;
  username: string;
  password!: string;
  accountId: number;
};

UserModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  accountId: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'User',
  tableName: 'Users',
  timestamps: false,
});

UserModel.belongsTo(AccountModel, { foreignKey: 'accountId', as: 'account' });
