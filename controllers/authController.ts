// Express Router
import { Request, Response, NextFunction } from 'express';

// User model
import { UserOutput, UserInput } from '../models/user';

// Controllers
import inputValidateController from './inputController';

// services
import userServices from '../services/userServices';
import jwtServices from '../services/jwtServices';
import AppError from '../services/appErrorServices';
import bcryptServices from '../services/bcryptServices';

interface LoginRequestBody {
  email: string;
  password: string;
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName }: UserInput = req.body;

  try {
    // basic input check
    // inputValidateController.isValidEmail(email);
    // inputValidateController.isValidPassword(password);
    // inputValidateController.isValidName(firstName, 'First name');
    // inputValidateController.isValidName(lastName, 'Last name');

    // create a new user
    const user: UserOutput = await userServices.newUser(
      email,
      password,
      firstName,
      lastName
    );
    // create and send token
    jwtServices.sendJwtResponse(user, res);
  } catch (err) {
    return next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: LoginRequestBody = req.body;
  try {
    const user = await userServices.findUserbyEmail(email);

    if (user) {
      const authenticated = await bcryptServices.checkPassword(password, user);
      if (authenticated) {
        // create and send token
        jwtServices.sendJwtResponse(user, res);
      } else {
        throw new AppError(
          process.env.NODE_ENV === 'production'
            ? 'Something is wrong with your credentials'
            : 'Wrong password',
          400
        );
      }
    } else {
      throw new AppError(
        process.env.NODE_ENV === 'production'
          ? 'Something is wrong with your credentials'
          : 'Email does not exist',
        400
      );
    }
  } catch (err) {
    return next(err);
  }
};

const protect = async (req: Request, res: Response, next: NextFunction) => {
  // 1. Getting the token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log iin to get access.', 401)
    );
  }

  // 2. Verification token

  // 3. Check if user still exists

  // 4. Check if user changed password after the token was issued

  next();
};

export default { register, login };
