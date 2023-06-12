// dependencies
import bcrypt from 'bcryptjs';

// Express Router
import { Request, Response, NextFunction } from 'express';

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

enum MaxAge {
  OneDay = 24 * 60 * 60, // 1 day in seconds
  OneWeek = 7 * OneDay, // 1 week in seconds
  OneDayMiliSec = 1000 * 24 * 60 * 60, // 1 day in miliseconds
  OneWeekMiliSec = 1000 * 7 * OneDay, // 1 week in miliseconds
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName }: RegisterRequestBody =
    req.body;

  try {
    // basic input check
    inputValidateController.isValidEmail(email);
    inputValidateController.isValidPassword(password);
    inputValidateController.isValidName(firstName, 'First name');
    inputValidateController.isValidName(lastName, 'Last name');

    // create a new user
    const user = await userServices.newUser(
      email,
      password,
      firstName,
      lastName
    );

    res.json({ user });
  } catch (err) {
    return next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: LoginRequestBody = req.body;
  try {
    // basic input check
    inputValidateController.isValidEmail(email);
    inputValidateController.isValidPassword(password);

    res.json({ email, password });
  } catch (err) {
    return next(err);
  }
};

export default { register, login };
