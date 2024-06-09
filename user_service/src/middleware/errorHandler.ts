import { Request, Response, NextFunction } from 'express';
import log from "../utils/logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  log.error({
    message: 'Unhandled Error',
    error: {
      message: err.message,
      stack: err.stack,
      name: err.name,
    },
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
    },
  });

  res.status(500).json({ error: 'Internal Server Error' });
};
