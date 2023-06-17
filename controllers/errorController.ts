import { Request, Response, NextFunction } from 'express';
import AppError from '../services/appErrorServices';
import Sequelize, { ValidationError, UniqueConstraintError } from 'sequelize';

// types of error
type SequelizeError = ValidationError | UniqueConstraintError;

const globallErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  const handleSequelizeErrors = (err: SequelizeError) => {
    const errMessage = err.errors[0].message;
    return new AppError(errMessage, 400);
  };

  const handleJWTError = () => {
    return new AppError('Invalid token. Please log in again.', 401);
  };

  const handleJWTExpiredError = () => {
    return new AppError('Token expired. Please log in again.', 401);
  };

  const sendErrorDev = (err: AppError, res: Response) => {
    if (err instanceof Sequelize.ValidationError) {
      res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.errors[0].message,
      });
    } else {
      res.status(err.statusCode).json({ status: err.status, error: err, message: err.message });
    }
  };

  const sendErrorProd = (err: AppError, res: Response) => {
    // Operational error
    if (err.isOperational) {
      res.status(err.statusCode).json({ status: err.status, message: err.message });
    } else {
      // Programming error
      res.status(500).json({ status: 'error', message: 'Something went wrong' });
    }
  };

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // Sequelize error
    if (err instanceof Sequelize.ValidationError || err instanceof Sequelize.UniqueConstraintError) {
      const seqError = handleSequelizeErrors(err);
      sendErrorProd(seqError, res);
      return;
    }
    if (err.name === 'JsonWebTokenError') {
      const jwtError = handleJWTError();
      sendErrorProd(jwtError, res);
      return;
    }
    if (err.name === 'TokenExpiredError') {
      const jwtExpiredError = handleJWTExpiredError();
      sendErrorProd(jwtExpiredError, res);
      return;
    }
    sendErrorProd(err, res);
  }
};

export default globallErrorHandler;
