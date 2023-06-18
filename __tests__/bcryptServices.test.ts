import bcryptServices from '../services/bcryptServices';
import bcrypt from 'bcryptjs';

bcrypt.compare = jest.fn();

describe('bcrypt.compare', () => {
  it('should call bcrypt.compare with the right parameters', async () => {
    const password = 'password';
    const user = {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      userName: 'User1',
      password: 'hashed-password',
      role: 'user',
    };

    await bcryptServices.checkPassword(password, user);

    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenLastCalledWith(password, user.password);
  });
});
