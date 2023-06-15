// Models
import { User } from '../models/user';
import { Blog } from '../models/blog';

import { UserOutput } from '../models/user';
import { BlogOutput } from '../models/blog';

const getAllUsers = (): Promise<UserOutput[]> =>
  User.findAll({
    attributes: ['firstName', 'lastName'],
  });

const getRequestedPosts = (): Promise<BlogOutput[]> =>
  Blog.findAll({
    where: {
      allowed: false,
    },
  });

export default { getAllUsers, getRequestedPosts };
