import StatusHttp from './StatusHttp';

type ErrorObject = { 
  statusHttp: number
  message: string;
};

export enum ErrorsTypes {
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  INVALID_TOKEN = 'INVALID_TOKEN',
  NOT_FOUND_TOKEN = 'NOT_FOUND_TOKEN',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INVALID_USERNAME = 'INVALID_USERNAME',
  INVALID_ACCOUNT = 'INVALID_ACCOUNT',
}

export type ErrorsCatalog = {
  [key in ErrorsTypes]: ErrorObject
};

export const errorCatalog: ErrorsCatalog = {
  INVALID_PASSWORD: {
    statusHttp: StatusHttp.UNAUTHORIZED,
    message: 'Invalid password',
  },
  INVALID_TOKEN: {
    statusHttp: StatusHttp.UNAUTHORIZED,
    message: 'Invalid token',
  },
  NOT_FOUND_TOKEN: {
    statusHttp: StatusHttp.UNAUTHORIZED,
    message: 'Not found token',
  },
  USER_ALREADY_EXISTS: {
    statusHttp: StatusHttp.CONFLICT,
    message: 'User already exists',
  },
  INVALID_USERNAME: {
    statusHttp: StatusHttp.BAD_REQUEST,
    message: 'Invalid username',
  },
  INVALID_ACCOUNT: {
    statusHttp: StatusHttp.BAD_REQUEST,
    message: 'Invalid account',
  },
};
