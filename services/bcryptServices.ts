// Dependencies
import bcrypt from 'bcryptjs';

// User model
import { UserOutput } from '../models/user';

const checkPassword = async function (password: string, user: UserOutput) {
  return await bcrypt.compare(password, user.password);
};

export default { checkPassword };
