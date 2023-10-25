import { PrismaClient } from '@prisma/client';
import { compareData } from './encryptionHelpers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const generateAuthToken = async (email: string, password: string) => {
  let token = '';
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    const isAuth = compareData(password, user.password);
    const jwtKey = process.env.JWT_KEY || 'jwtsecret';
    if (isAuth) {
      token = jwt.sign({ user: user.id }, jwtKey);
    }
  }
  return token;
};
