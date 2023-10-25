import { Request, Response } from "express";
import {
  userAuthSchema,
  userRegistrationSchema,
} from "../validationSchemas/userSchema";
import { PrismaClient } from "@prisma/client";
import sendResponse from "../helpers/responseHelper";
import { compareData, encryptData } from "../helpers/encryptionHelpers";
import { issueToken } from '../helpers/jwtHelper';
import RESPONSE_CODES from "../constants/responseCodes";

const prisma = new PrismaClient();

export const handleSignup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  await userRegistrationSchema.validate(req.body);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return sendResponse(
      res,
      null,
      "User already exists",
      RESPONSE_CODES.conflictError
    );
  }
  const encryptedPassword = encryptData(password);

  await prisma.user.create({
    data: {
      name,
      email,
      password: encryptedPassword,
    },
  });
  return sendResponse(res);
};

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  await userAuthSchema.validate(req.body);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    const isAuth = compareData(password, user.password);
    if (isAuth) {
      const token = issueToken(user.id);
      return sendResponse(res, { authtoken: token, userId: user.id });
    }
  }
  return sendResponse(
    res,
    null,
    "Invalid email/password",
    RESPONSE_CODES.authorizationError
  );
};
