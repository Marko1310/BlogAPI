import { Request, Response } from 'express';
import authController from '../controllers/authController';
import inputController from '../controllers/inputController';
import userServices from '../services/userServices';
import jwtServices from '../services/jwtServices';
import AppError from '../services/appErrorServices';
import bcryptServices from '../services/bcryptServices';

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

jest.mock('../services/bcryptServices', () => ({
  checkPassword: jest.fn(),
}));

jest.mock('bcryptjs');

describe('register user', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
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

    expect(inputController.isValidEmail).toHaveBeenCalledWith('test@example.com');
    expect(inputController.isValidPassword).toHaveBeenCalledWith('password123');
    expect(inputController.isValidName).toHaveBeenCalledWith('John', 'First name');
    expect(inputController.isValidName).toHaveBeenCalledWith('Doe', 'Last name');
    expect(userServices.newUser).toHaveBeenCalledWith('test@example.com', 'password123', 'John', 'Doe', 'user');
    expect(jwtServices.sendJwtResponse).toHaveBeenCalledWith(mockUserOutput, res);
    expect(next).not.toHaveBeenCalled();
  });
});

describe('login user', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should return a 401 error if user is not found in the db and bcrypt.compare should not be called', async () => {
    const req: Partial<Request> = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const mockError = new AppError('Something is wrong with your credentials', 401);

    userServices.findUserbyEmail = jest.fn(() => {
      throw mockError;
    });

    await authController.login(req as Request, res as Response, next);

    expect(userServices.findUserbyEmail).toHaveBeenCalledWith(req.body.email);
    expect(bcryptServices.checkPassword).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });

  it('should call bcrypt.compare if user is found in the db', async () => {
    const req: Partial<Request> = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const mockUser = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user',
    };

    userServices.findUserbyEmail = jest.fn().mockResolvedValue(mockUser);

    await authController.login(req as Request, res as Response, next);

    expect(bcryptServices.checkPassword).toHaveBeenCalledWith(req.body.password, mockUser);
  });

  it('should return a 401 error if auth fails', async () => {
    const req: Partial<Request> = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const mockError = new AppError('Email does not exist', 401);

    bcryptServices.checkPassword = jest.fn().mockResolvedValue(false);

    await authController.login(req as Request, res as Response, next);

    expect(jwtServices.sendJwtResponse).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });
});
