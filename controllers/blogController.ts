// Express Router
import { Request, Response, NextFunction } from 'express';

// Models
import { User } from '../models/user';

// Controllers
import inputValidateController from './inputController';

// services
import blogServices from '../services/blogServices';
import userServices from '../services/userServices';

interface customRequest extends Request {
  user: User;
}
interface AllowDeclineRequestBody {
  blogId: number;
  action: 'allow' | 'decline';
}
interface PostBlogRequestBody {
  title: string;
  content: string;
}

const postBlog = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId, email } = req.user;
  const { title, content }: PostBlogRequestBody = req.body;

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

const allowDeclinePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blogId, action }: AllowDeclineRequestBody = req.body;

  try {
    // retrieve blog and associated user
    const blog = await blogServices.findBlogByBlogID(blogId);
    let user = null;
    if (blog) {
      user = await blog.getUser();
    }

    // depending on the action
    if (action === 'allow' && user) {
      await blogServices.allowBlog(blogId);
      await userServices.changeUserRole(user.userId, 'blogger');
      res.status(200).json(`Blog blogId ${blog?.blogId} is allowed`);
    }

    if (action === 'decline') {
      await blogServices.declineBlog(blogId);
      res.status(200).json(`Blog blogId ${blog?.blogId} is declined`);
    }
  } catch (err) {
    return next(err);
  }
};

export default { postBlog, allowDeclinePost };
