import { User } from '../models/user';

import userServices from '../services/userServices';

// Test newUser function
test('newUser function should call User.create with correct parameters and store it in userInput variable', async () => {
  const mockCreate = jest.spyOn(User, 'create').mockResolvedValueOnce({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: 'password',
    role: 'user',
  });

  const email = 'johndoe@example.com';
  const password = 'password';
  const firstName = 'John';
  const lastName = 'Doe';
  const role = 'user';

  const user = await userServices.newUser(email, password, firstName, lastName, role);

  expect(mockCreate).toHaveBeenCalledTimes(1);

  expect(mockCreate).toHaveBeenCalledWith({
    firstName,
    lastName,
    email,
    password,
    role,
  });

  expect(user).toEqual({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: 'password',
    role: 'user',
  });

  mockCreate.mockRestore();
});
