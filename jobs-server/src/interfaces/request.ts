import { Request } from 'express';

export interface CustomRequest extends Request {
  userId?: string;
}

export interface ResponseCodes {
  ok: number;
  serverError: number;
  authorizationError: number;
  conflictError: number;
}
