// Express Router
import { Request, Response, NextFunction } from 'express';

// User model
import { User } from '../models/user';

// services
import AppError from '../services/appErrorServices';
import blogServices from '../services/blogServices';

interface customRequest extends Request {
  user: User;
}

const postBlog = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId, email } = req.user;
  const { title, content } = req.body;

  try {
    // Basic checks for title, content length
    //
    ///////

    const newBlog = await blogServices.createNewBlog(
      title,
      content,
      userId,
      email
    );
    res.json(newBlog);
  } catch (err) {
    return next(err);
  }
};

export default { postBlog };
