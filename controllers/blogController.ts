// Express Router
import { Request, Response, NextFunction } from 'express';

// User model
import { User } from '../models/user';

// Controllers
import inputValidateController from './inputController';

// services
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
    inputValidateController.isValidBlogTitle(title);
    inputValidateController.isValidBlogContent(content);

    const newBlog = await blogServices.createNewBlog(
      title,
      content,
      userId,
      email
    );
    res.status(200).json(newBlog);
  } catch (err) {
    return next(err);
  }
};

export default { postBlog };
