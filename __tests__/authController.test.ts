import { Request, Response } from 'express';
import authController from '../controllers/authController';
import inputController from '../controllers/inputController';
import userServices from '../services/userServices';
import jwtServices from '../services/jwtServices';
import AppError from '../services/appErrorServices';
import bcryptServices from '../services/bcryptServices';

// mocked variables and functions
const mockUserOutput = {
  userId: 1,
  email: 'test@example.com',
  password: 'password123',
  userName: 'User1',
  firstName: 'John',
  lastName: 'Doe',
  role: 'user',
};

inputController.isValidEmail = jest.fn();
inputController.isValidUserName = jest.fn();
inputController.isValidPassword = jest.fn();
inputController.isValidName = jest.fn();
inputController.isValidName = jest.fn();

userServices.newUser = jest.fn().mockResolvedValue(mockUserOutput);

jwtServices.sendJwtResponse = jest.fn();

bcryptServices.checkPassword = jest.fn();

// Tests
describe('register user', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should perform basic input checks, call newUser and sendJwtResponse functions with the rigth parameters', async () => {
    const req: Partial<Request> = {
      body: {
        email: 'test@example.com',
        password: 'password123',
        userName: 'User1',
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
      },
    };
    const res = {
      sendJwtResponse: jest.fn(),
    };
    const next = jest.fn();

    await authController.register(req as Request, res as unknown as Response, next);

    expect(inputController.isValidEmail).toHaveBeenCalledWith('test@example.com');
    expect(inputController.isValidUserName).toHaveBeenCalledWith('User1');
    expect(inputController.isValidPassword).toHaveBeenCalledWith('password123');
    expect(inputController.isValidName).toHaveBeenCalledWith('John', 'First name');
    expect(inputController.isValidName).toHaveBeenCalledWith('Doe', 'Last name');
    expect(userServices.newUser).toHaveBeenCalledWith(
      'test@example.com',
      'User1',
      'password123',
      'John',
      'Doe',
      'user'
    );
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

    expect(userServices.findUserbyEmail).toHaveBeenCalledWith('test@example.com');
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
      userName: 'User1',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user',
    };

    userServices.findUserbyEmail = jest.fn().mockResolvedValue(mockUser);

    await authController.login(req as Request, res as Response, next);

    expect(bcryptServices.checkPassword).toHaveBeenCalledWith('password123', mockUser);
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
