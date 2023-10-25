import { ResponseCodes } from '../interfaces/request';

const RESPONSE_CODES: ResponseCodes = {
  ok: 200,
  serverError: 500,
  authorizationError: 401,
  conflictError: 409,
};

export default RESPONSE_CODES;
