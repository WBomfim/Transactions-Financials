import StatusHttp from './StatusHttp';

type ErrorObject = { 
  statusHttp: number
  message: string;
};

export enum ErrorsTypes {
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  INVALID_TOKEN = 'INVALID_TOKEN',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
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
  USER_ALREADY_EXISTS: {
    statusHttp: StatusHttp.CONFLICT,
    message: 'User already exists',
  },
};
