// User model
import { User, UserOutput, UserInput } from '../models/user';

type UserRole = 'admin' | 'blogger' | 'user';

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
const findUserbyID = (userId: number): Promise<UserOutput | null> => User.findOne({ where: { userId } });
const findUserbyEmail = (email: string): Promise<UserOutput | null> => User.findOne({ where: { email } });

// Change user role
const changeUserRole = (userId: number, newRole: UserRole): Promise<[affectedCount: number]> =>
  User.update({ role: newRole }, { where: { userId } });

export default { newUser, findUserbyID, findUserbyEmail, changeUserRole };
