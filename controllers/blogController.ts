// Express Router
import { Request, Response, NextFunction } from 'express';

// Models
import { UserOutput } from '../models/user';

// Controllers
import inputValidateController from './inputController';

// services
import blogServices from '../services/blogServices';
import userServices from '../services/userServices';
import AppError from '../services/appErrorServices';

// interfaces
interface customRequest extends Request {
  user: UserOutput;
}
interface AllowDeclineRequestBody {
  blogId: number;
  action: 'allow' | 'decline';
}
interface PostBlogRequestBody {
  title: string;
  content: string;
}

const postBlog = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, email, role } = (req as customRequest).user;
  const { title, content }: PostBlogRequestBody = req.body;

  try {
    inputValidateController.isValidBlogTitle(title);
    inputValidateController.isValidBlogContent(content);

    let newBlog;
    if (role === 'admin') {
      newBlog = await blogServices.createNewBlog(title, content, userId, email, true);
    } else {
      newBlog = await blogServices.createNewBlog(title, content, userId, email);
    }

    res.status(200).json(newBlog);
  } catch (err) {
    return next(err);
  }
};

const allowDeclinePost = async (req: Request, res: Response, next: NextFunction) => {
  const { blogId, action }: AllowDeclineRequestBody = req.body;

  try {
    // retrieve blog and associated user
    const blog = await blogServices.findBlogByBlogID(blogId);
    let user = null;
    if (blog) {
      user = await blog.getUser();
    } else {
      throw new AppError(`There is no blog (blogId: ${blogId})`, 404);
    }

    // depending on the action
    if (action === 'allow' && user) {
      await blogServices.allowBlog(blogId);
      if (user.role !== 'admin') {
        await userServices.changeUserRole(user.userId, 'blogger');
      }
      res.status(200).json(`Blog (blogId: ${blog?.blogId}) is allowed`);
    } else if (action === 'decline' && user) {
      await blogServices.declineBlog(blogId);
      res.status(200).json(`Blog (blogId: ${blog?.blogId}) is declined`);
    } else {
      throw new AppError(`Invalid action: (${action}), please provide type of 'allow' or 'decline'`, 400);
    }
  } catch (err) {
    return next(err);
  }
};

export default { postBlog, allowDeclinePost };
