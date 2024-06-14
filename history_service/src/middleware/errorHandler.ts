import { Request, Response, NextFunction } from 'express';
import log from "../utils/logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  log.error(`Unhandled Error.${err.message ? ` Error message: ${err.message}.` : ''}.`)
  res.status(500).json({ message: err.message || 'Internal Server Error' });
};
