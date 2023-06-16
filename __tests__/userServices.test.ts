import { User } from '../models/user';

import userServices from '../services/userServices';

// 1.) Test newUser function
test('newUser function should call User.create with correct parameters and store it in userInput variable', async () => {
  const mockCreate = jest.spyOn(User, 'create').mockResolvedValueOnce({
    userId: 1,
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
    userId: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: 'password',
    role: 'user',
  });

  mockCreate.mockRestore();
});

// 2.) Test findUserbyID function
test('findUserbyID should call User.findOne with the correct parameters', async () => {
  const mockFindOne = jest.fn();
  User.findOne = mockFindOne;

  const userId = 1;
  await userServices.findUserbyID(userId);

  expect(mockFindOne).toHaveBeenCalledTimes(1);
  expect(mockFindOne).toHaveBeenCalledWith({ where: { userId } });

  mockFindOne.mockRestore();
});

// 3.) Test findUserbyEmail function
test('findUserbyEmail should call User.findOne with the correct parameters', async () => {
  const mockFindOne = jest.fn();
  User.findOne = mockFindOne;

  const email = 'john.doe@example.com';
  await userServices.findUserbyEmail(email);

  expect(mockFindOne).toHaveBeenCalledTimes(1);
  expect(mockFindOne).toHaveBeenCalledWith({ where: { email } });

  mockFindOne.mockRestore();
});

// 4.) Test changeUserRole function
test('changeUserRole should call User.update with the correct parameters', async () => {
  const mockUpdate = jest.fn();
  User.update = mockUpdate;

  const userId = 1;
  const newRole = 'blogger';

  await userServices.changeUserRole(userId, newRole);

  expect(mockUpdate).toHaveBeenCalledTimes(1);
  expect(mockUpdate).toHaveBeenCalledWith({ role: newRole }, { where: { userId } });

  mockUpdate.mockRestore();
});
