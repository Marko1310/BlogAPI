// Express Router
import { Request, Response, NextFunction } from 'express';

// Models
import { User } from '../models/user';
import { BlogOutput } from '../models/blog';

// services
import retrieveDataServices from '../services/retrieveDataServices';
import blogServices from '../services/blogServices';

interface UserAttributes {
  firstName: string;
  lastName: string;
}
interface customRequest extends Request {
  user: User;
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
    const requestedPosts: BlogOutput[] =
      await retrieveDataServices.getRequestedPosts();
    res.status(200).json(requestedPosts);
  } catch (err) {
    return next(err);
  }
};

const getPosts = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // User is authenticated and role is admin
    if (req.user.role === 'admin') {
      const allPosts = await blogServices.findAllBlogs();
      res.status(200).json(allPosts);
    }

    // User is authenticated and role is blogger
    if (req.user.role === 'blogger') {
      const userPosts = await blogServices.findBlogByUserID(req.user.userId);
      res.status(200).json(userPosts);
    }
  } catch (err) {
    return next(err);
  }
};

export default { getAllUsers, getRequestedPosts, getPosts };
