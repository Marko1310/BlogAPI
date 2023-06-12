// User model
import { User, UserOutput, UserInput } from '../models/user';

// Create user
const newUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<UserOutput> => {
  const userInput: UserInput = {
    firstName,
    lastName,
    email,
    password,
  };
  const user = await User.create(userInput);
  return user;
};

export default { newUser };
