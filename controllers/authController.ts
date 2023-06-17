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
  const { email, password, userName, firstName, lastName, role }: UserInput = req.body;

  try {
    // basic input check
    inputValidateController.isValidEmail(email);
    inputValidateController.isValidUserName(userName);
    inputValidateController.isValidPassword(password);
    inputValidateController.isValidName(firstName, 'First name');
    inputValidateController.isValidName(lastName, 'Last name');

    // create a new user
    const user: UserOutput = await userServices.newUser(email, userName, password, firstName, lastName, role);
    // create and send token
    jwtServices.sendJwtResponse(user, res);
  } catch (err) {
    return next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: LoginRequestBody = req.body;
  try {
    const user: UserOutput | null = await userServices.findUserbyEmail(email);

    if (user) {
      const authenticated: boolean = await bcryptServices.checkPassword(password, user);
      if (authenticated) {
        // create and send token
        jwtServices.sendJwtResponse(user, res);
      } else {
        throw new AppError(
          process.env.NODE_ENV === 'production' ? 'Something is wrong with your credentials' : 'Wrong password',
          401
        );
      }
    } else {
      throw new AppError(
        process.env.NODE_ENV === 'production' ? 'Something is wrong with your credentials' : 'Email does not exist',
        401
      );
    }
  } catch (err) {
    return next(err);
  }
};

export default { register, login };
