// User model
import User from '../models/user';

// Create user
const newUser = async function (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  return User.create({ firstName, lastName, email, password });
};

export default { newUser };
