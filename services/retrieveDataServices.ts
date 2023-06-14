// Models
import { User } from '../models/user';
import { Blog } from '../models/blog';

const getAllUsers = () => {
  return User.findAll({
    attributes: ['firstName', 'lastName'],
  });
};

const getRequestedPosts = () => {
  return Blog.findAll({
    where: {
      allowed: false,
    },
  });
};

export default { getAllUsers, getRequestedPosts };
