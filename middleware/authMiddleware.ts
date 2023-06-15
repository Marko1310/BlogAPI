// Express Router
import { Request, Response, NextFunction } from 'express';

// User model
import { UserOutput } from '../models/user';

// services
import userServices from '../services/userServices';
import jwtServices from '../services/jwtServices';
import AppError from '../services/appErrorServices';

// types/interfaces
type DecodedToken = {
  userId: number;
  iat: number;
  exp: number;
};
interface customRequest extends Request {
  user: UserOutput;
}

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Getting the token and check if it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AppError('You are not logged in! Please log in to get access.', 401);
    }

    // 2. Verification token
    const decodedToken: DecodedToken = jwtServices.verifyJwtToken(token) as DecodedToken;
    if (!decodedToken) {
      throw new AppError('Invalid token! Please log in again to get access.', 401);
    }

    // 3. Check if user still exists
    const currentUser: UserOutput | null = await userServices.findUserbyID(decodedToken.userId);
    if (!currentUser) {
      throw new AppError('The user belonging to the token no longer exist.', 401);
    }
    // Grant access
    (req as customRequest).user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((req as customRequest).user.role)) {
      return next(new AppError(`You don't have permission to perform this action`, 403));
    }
    next();
  };
};

export default { requireAuth, restrictTo };
