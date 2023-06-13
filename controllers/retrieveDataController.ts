// Express Router
import { Request, Response, NextFunction } from 'express';

// User model
import { User, UserOutput, UserInput } from '../models/user';

// services
import userServices from '../services/userServices';
import jwtServices from '../services/jwtServices';
import AppError from '../services/appErrorServices';
import bcryptServices from '../services/bcryptServices';

interface UserAttributes {
  firstName: string;
  lastName: string;
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users: UserAttributes[] = await User.findAll({
      attributes: ['firstName', 'lastName'],
    });

    res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

export default { getAllUsers };
