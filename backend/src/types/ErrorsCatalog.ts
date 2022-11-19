import StatusHttp from './StatusHttp';

type ErrorObject = { 
  statusHttp: number
  message: string;
};

export enum ErrorsTypes {
  INVALID_PASSWORD = 'INVALID_PASSWORD',
}

export type ErrorsCatalog = {
  [key in ErrorsTypes]: ErrorObject
};

export const errorCatalog: ErrorsCatalog = {
  INVALID_PASSWORD: {
    statusHttp: StatusHttp.UNAUTHORIZED,
    message: 'Invalid password',
  }
};
