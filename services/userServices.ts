// User model
import { User, UserOutput, UserInput } from '../models/user';

// Create user
const newUser = (
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
  const user = User.create(userInput);
  return user;
};

// Find users
const findUser = (userId: number) => User.findOne({ where: { userId } });

const findUserbyEmail = (email: string) => User.findOne({ where: { email } });

export default { newUser, findUser, findUserbyEmail };
