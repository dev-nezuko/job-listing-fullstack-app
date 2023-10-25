import { PrismaClient } from '@prisma/client';
import { compareData } from './encryptionHelpers';
import { issueToken } from './jwtHelper';

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
    if (isAuth) {
      token = issueToken(user.id);
    }
  }
  return token;
};
