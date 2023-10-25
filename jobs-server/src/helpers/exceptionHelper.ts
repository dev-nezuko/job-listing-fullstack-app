import { Request, Response, NextFunction } from 'express';

import sendResponse from './responseHelper';

const exceptionHandler = (executable: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await executable(req, res, next);
    return result;
  } catch (error: any) {
    const errorCode = error.name === 'ValidationError' ? 400 : 500;
    sendResponse(res, {}, errorCode === 400 ? 'Invalid request' : 'Request could not be completed', errorCode);
  }
};

export default exceptionHandler;
