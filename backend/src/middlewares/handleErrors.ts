import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
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

  return res.status(StatusHttp.INTERNAL_ERROR).json({ message: 'Internal server error' });
};

export default errorHandler;
