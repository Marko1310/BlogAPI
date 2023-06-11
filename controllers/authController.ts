// Express Router
import { Request, Response, NextFunction } from 'express';

// Global Error handler
import AppError from '../services/appErrorServices';

// Controllers
import inputValidateController from './inputController';

// services
import userServices from '../services/userServices';

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

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName }: RegisterRequestBody =
    req.body;

  try {
    inputValidateController.isValidEmail(email);
    inputValidateController.isValidPassword(password);
    inputValidateController.isValidName(firstName, 'First name');
    inputValidateController.isValidName(lastName, 'Last name');

    const user = await userServices.newUser(
      email,
      password,
      firstName,
      lastName
    );

    res.json({
      user,
    });
  } catch (err) {
    return next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: LoginRequestBody = req.body;
  try {
    inputValidateController.isValidEmail(email);
    inputValidateController.isValidPassword(password);

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
