import { Request, Response, NextFunction } from 'express';
import AppError from '../services/appErrorServices';
import Sequelize, { ValidationError, UniqueConstraintError } from 'sequelize';

const globallErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  const handleSequelizeErrors = (
    err: ValidationError | UniqueConstraintError
  ) => {
    const errMessage = err.errors[0].message;
    return new AppError(errMessage, 400);
  };

  const sendErrorDev = (err: AppError, res: Response) => {
    if (err instanceof Sequelize.ValidationError) {
      res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.errors[0].message,
      });
    } else {
      res
        .status(err.statusCode)
        .json({ status: err.status, error: err, message: err.message });
    }
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
    let error = { ...err };
    // Sequelize error
    if (
      error instanceof Sequelize.ValidationError ||
      Sequelize.UniqueConstraintError
    ) {
      error = handleSequelizeErrors(error);
    }
    sendErrorProd(error, res);
  }
};

export default globallErrorHandler;
