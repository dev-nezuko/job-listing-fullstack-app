import jwt from 'jsonwebtoken';

const signingKey = (): string => {
  const key = process.env.JWT_KEY;
  if (!key || key.length < 32) throw new Error('JWT_KEY must contain at least 32 characters');
  return key;
};
export const issueToken = (userId: string): string =>
  jwt.sign({ user: userId }, signingKey(), { algorithm: 'HS256', expiresIn: '1h' });
export const verifyToken = (token: string): string => {
  const value = jwt.verify(token, signingKey(), { algorithms: ['HS256'] });
  if (typeof value === 'string' || typeof value.user !== 'string' || !value.user) {
    throw new Error('Invalid token identity');
  }
  return value.user;
};
