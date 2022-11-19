import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/handleToken';
import { ErrorsTypes } from '../types/ErrorsCatalog';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) throw new Error(ErrorsTypes.NOT_FOUND_TOKEN);

  try {
    const payload = verifyToken(token);
    req.body.user = payload;
    next();
  } catch (error) {
    throw new Error(ErrorsTypes.INVALID_TOKEN);
  }
}

export default auth;
