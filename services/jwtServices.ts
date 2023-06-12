// dependencies
import jwt from 'jsonwebtoken';

// Express Router
import { Response } from 'express';

// User model
import { UserOutput } from '../models/user';

const jwtSecret: string = process.env.JWT_SECRET as string;

enum MaxAge {
  OneDay = 24 * 60 * 60, // 1 day in seconds
  OneWeek = 7 * OneDay, // 1 week in seconds
  OneDayMiliSec = 1000 * 24 * 60 * 60, // 1 day in miliseconds
  OneWeekMiliSec = 1000 * 7 * OneDay, // 1 week in miliseconds
}

const sendJwtResponse = (user: UserOutput, res: Response) => {
  const token = jwt.sign({ userId: user.userId }, jwtSecret, {
    expiresIn: MaxAge.OneWeek,
  });
  res.cookie('jwt', token, { httpOnly: true, maxAge: MaxAge.OneWeekMiliSec });
  res.status(200).json({ userId: user.userId });
};

const verifyJwtToken = (token: string) => {
  return jwt.verify(token, jwtSecret);
};

export default { sendJwtResponse, verifyJwtToken };
