// Dependencies
import bcrypt from 'bcryptjs';

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
  const { email, password, firstName, lastName }: UserInput = req.body;

  try {
    // basic input check
    inputValidateController.isValidEmail(email);
    inputValidateController.isValidPassword(password);
    inputValidateController.isValidName(firstName, 'First name');
    inputValidateController.isValidName(lastName, 'Last name');

    // create a new user
    const user: UserOutput = await userServices.newUser(
      email,
      password,
      firstName,
      lastName
    );
    // create token
    const token = jwtServices.createToken(user.userId, MaxAge.OneWeek);
    // attach cookie to res object
    res.cookie('jwt', token, { httpOnly: true, maxAge: MaxAge.OneWeekMiliSec });
    res.status(200).json({ userId: user.userId });
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

    const user = await userServices.findUserbyEmail(email);

    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = jwtServices.createToken(user.userId, MaxAge.OneWeek);
        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: MaxAge.OneWeekMiliSec,
        });
        res.status(200).json({ userId: user.userId });
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

export default { register, login };
