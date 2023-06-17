// Models
import { User } from '../models/user';
import { Blog } from '../models/blog';

import { UserOutput } from '../models/user';
import { BlogOutput } from '../models/blog';

const getAllUsers = (role: string): Promise<UserOutput[]> => {
  if (role === 'admin') {
    return User.findAll();
  } else {
    return User.findAll({ attributes: ['userName'] });
  }
};

const getRequestedPosts = (): Promise<BlogOutput[]> =>
  Blog.findAll({
    where: {
      allowed: false,
    },
  });

export default { getAllUsers, getRequestedPosts };
