import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/jwtHelper';
import { CustomRequest } from '../interfaces/request';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authtoken;
  if (typeof token !== 'string') return res.status(401).json({ message: 'Unauthorized user' });
  try {
    (req as CustomRequest).userId = verifyToken(token);
  } catch {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  return next();
};
export default authenticateToken;
