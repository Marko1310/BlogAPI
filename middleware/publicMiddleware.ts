// Express Router
import { Request, Response, NextFunction } from 'express';

// services
import blogServices from '../services/blogServices';

const allowPublicAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User is not authenticated
    if (!req.headers.authorization) {
      const publicPosts = await blogServices.findPublicBlogs();
      res.status(200).json(publicPosts);
      return;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default { allowPublicAccess };
