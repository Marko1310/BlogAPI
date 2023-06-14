// User model
import { User } from '../models/user';

const getAllUsers = () => {
  return User.findAll({
    attributes: ['firstName', 'lastName'],
  });
};

export default { getAllUsers };
