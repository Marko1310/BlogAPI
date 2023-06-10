// Express Router
import { Request, Response, NextFunction } from 'express';

//Error Middleware
import AppError from '../services/appErrorServices';

const notFound = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const err = new AppError(
      `Can't find ${req.originalUrl} on this server!`,
      404
    );
    next(err);
  } catch (err) {
    console.log(err);
  }
};

export default {
  notFound,
};
