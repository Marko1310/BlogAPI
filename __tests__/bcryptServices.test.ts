import bcryptServices from '../services/bcryptServices';
import bcrypt from 'bcryptjs';

describe('bcrypt.compare', () => {
  it('should call bcrypt.compare with the right parameters', async () => {
    const mockCompare = jest.spyOn(bcrypt, 'compare');
    const password = 'password';
    const user = {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'hashed-password',
      role: 'user',
    };

    await bcryptServices.checkPassword(password, user);

    expect(mockCompare).toHaveBeenCalledTimes(1);
    expect(mockCompare).toHaveBeenLastCalledWith(password, user.password);
  });
});
