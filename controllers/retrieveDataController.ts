// Express Router
import { Request, Response, NextFunction } from 'express';

// services
import retrieveDataServices from '../services/retrieveDataServices';

interface UserAttributes {
  firstName: string;
  lastName: string;
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users: UserAttributes[] = await retrieveDataServices.getAllUsers();

    res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

const getRequestedPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestedPosts = await retrieveDataServices.getRequestedPosts();
    res.status(200).json(requestedPosts);
  } catch (err) {
    return next(err);
  }
};

export default { getAllUsers, getRequestedPosts };
