import { Request, Response, NextFunction } from 'express';
import log from "../utils/logger";
import ApiError from "../error/apiError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    log.error(`Error in ${err.className}.${err.methodName}: ${err.message}`);
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors
    })
  }

  log.error(`Unhandled Error.${err.message ? ` Error message: ${err.message}.` : ''}`)
  res.status(500).json({ message: err.message || 'Internal Server Error' });
};
