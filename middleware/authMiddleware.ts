// Express Router
import { Request, Response, NextFunction } from 'express';

// services
import userServices from '../services/userServices';
import jwtServices from '../services/jwtServices';
import AppError from '../services/appErrorServices';

type DecodedToken = {
  userId: number;
  iat: number;
  exp: number;
};

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Getting the token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AppError(
        'You are not logged in! Please log in to get access.',
        401
      );
    }

    // 2. Verification token
    const decodedToken: DecodedToken = jwtServices.verifyJwtToken(
      token
    ) as DecodedToken;

    // 3. Check if user still exists
    const currentUser = await userServices.findUser(decodedToken.userId);
    if (!currentUser) {
      throw new AppError(
        'The user belonging to the token no longer exist.',
        401
      );
    }
    // Grant access
    (req as any).user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

export default { requireAuth };
