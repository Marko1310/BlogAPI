// User model
import { User, UserOutput, UserInput } from '../models/user';

// Create user
const newUser = (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role?: string
): Promise<UserOutput> => {
  const userInput: UserInput = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    role: role || 'user',
  };
  const user = User.create(userInput);
  return user;
};

// Find users
const findUserbyID = (userId: number) => User.findOne({ where: { userId } });

const findUserbyEmail = (email: string) => User.findOne({ where: { email } });

export default { newUser, findUserbyID, findUserbyEmail };
