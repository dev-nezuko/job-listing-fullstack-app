import { Response } from 'express';
import RESPONSE_CODES from '../constants/responseCodes';

const sendResponse = (res: Response, data?: any, error?: string | null, responseCode?: number | null) => {
  if (error) {
    res.status(responseCode || RESPONSE_CODES.serverError).json({
      payload: {},
      message: error,
    });
  } else {
    res.send({ payload: data || {} });
  }
};

export default sendResponse;
