import { Request, Response, NextFunction } from 'express';
import historyService from "../service/historyService";

export const getHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const history = await historyService.getHistory(req.query)
    console.log(history)
    res.json(history);
  } catch (error) {
    next(error);
  }
};
