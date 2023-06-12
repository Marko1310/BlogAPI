import { Request, Response, NextFunction } from 'express';
import AppError from '../services/appErrorServices';

const globallErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  const sendErrorDev = (err: AppError, res: Response) => {
    res
      .status(err.statusCode)
      .json({ status: err.status, error: err, message: err.message });
  };

  const sendErrorProd = (err: AppError, res: Response) => {
    // Operational error
    if (err.isOperational) {
      res
        .status(err.statusCode)
        .json({ status: err.status, message: err.message });
    } else {
      // Programming error
      console.error('Error', err);
      res
        .status(500)
        .json({ status: 'error', message: 'Something went wrong' });
    }
  };

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};

export default globallErrorHandler;
