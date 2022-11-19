import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ErrorsTypes, errorCatalog } from '../types/ErrorsCatalog';
import StatusHttp from '../types/StatusHttp';

const errorHandler: ErrorRequestHandler = ( 
  err: Error | ZodError, 
  _req,
  res,
  _next,
) => {
  if (err instanceof ZodError) { 
    const { issues: [error] } = err;
    return res.status(StatusHttp.BAD_REQUEST).json({ message: error.message });
  }

  const messageByErrorsType = err.message as keyof typeof ErrorsTypes;

  const mappedError = errorCatalog[messageByErrorsType];

  if (mappedError) {
    const { statusHttp, message } = mappedError;
    return res.status(statusHttp).json({ message });
  }

  return res.status(StatusHttp.INTERNAL_ERROR).json({ message: 'Internal server error' });
};

export default errorHandler;
