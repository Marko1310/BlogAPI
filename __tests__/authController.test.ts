import { Request, Response } from 'express';
import authController from '../controllers/authController';
import inputController from '../controllers/inputController';
import userServices from '../services/userServices';
import jwtServices from '../services/jwtServices';

jest.mock('../controllers/inputController', () => ({
  isValidEmail: jest.fn(),
  isValidPassword: jest.fn(),
  isValidName: jest.fn(),
}));

jest.mock('../services/userServices', () => ({
  newUser: jest.fn().mockResolvedValue({
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password123',
    role: 'user',
    userId: 1,
  }),
}));

jest.mock('../services/jwtServices', () => ({
  sendJwtResponse: jest.fn(),
}));

describe('register user', () => {
  it('should perform basic input checks, call userServices.newUser and jwtServices.sendJwtResponse functions with the rigth parameters', async () => {
    const req: Partial<Request> = {
      body: {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
      },
    };
    const res = {
      sendJwtResponse: jest.fn(),
    };
    const next = jest.fn();

    const mockUserOutput = {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
    };

    await authController.register(req as Request, res as unknown as Response, next);

    // Assertions
    expect(inputController.isValidEmail).toHaveBeenCalledWith('test@example.com');
    expect(inputController.isValidPassword).toHaveBeenCalledWith('password123');
    expect(inputController.isValidName).toHaveBeenCalledWith('John', 'First name');
    expect(inputController.isValidName).toHaveBeenCalledWith('Doe', 'Last name');
    expect(userServices.newUser).toHaveBeenCalledWith('test@example.com', 'password123', 'John', 'Doe', 'user');
    expect(jwtServices.sendJwtResponse).toHaveBeenCalledWith(mockUserOutput, res);
    expect(next).not.toHaveBeenCalled();
  });
});
