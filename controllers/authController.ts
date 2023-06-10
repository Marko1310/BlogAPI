// Express Router
import { Request, Response, NextFunction } from 'express';

// Global Error handler
import AppError from '../services/appErrorServices';

interface RegisterRequestBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName }: RegisterRequestBody =
    req.body;
  try {
    res.json({
      email,
      password,
      firstName,
      lastName,
    });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: LoginRequestBody = req.body;
  try {
    if (password.length < 6) {
      throw new AppError('bbb', 400);
    }
    res.json({
      email,
      password,
    });
  } catch (err) {
    return next(err);
  }
};

export default {
  register,
  login,
};
