"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = __importDefault(require("../controllers/authController"));
const inputController_1 = __importDefault(require("../controllers/inputController"));
const userServices_1 = __importDefault(require("../services/userServices"));
const jwtServices_1 = __importDefault(require("../services/jwtServices"));
const appErrorServices_1 = __importDefault(require("../services/appErrorServices"));
const bcryptServices_1 = __importDefault(require("../services/bcryptServices"));
jest.mock('../controllers/inputController', () => ({
    isValidEmail: jest.fn(),
    isValidPassword: jest.fn(),
    isValidName: jest.fn(),
    isValidUserName: jest.fn(),
}));
jest.mock('../services/userServices', () => ({
    newUser: jest.fn().mockResolvedValue({
        email: 'test@example.com',
        password: 'password123',
        userName: 'User1',
        firstName: 'John',
        lastName: 'Doe',
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
        const req = {
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
        const mockUserOutput = {
            userId: 1,
            email: 'test@example.com',
            password: 'password123',
            userName: 'User1',
            firstName: 'John',
            lastName: 'Doe',
            role: 'user',
        };
        await authController_1.default.register(req, res, next);
        expect(inputController_1.default.isValidEmail).toHaveBeenCalledWith('test@example.com');
        expect(inputController_1.default.isValidUserName).toHaveBeenCalledWith('User1');
        expect(inputController_1.default.isValidPassword).toHaveBeenCalledWith('password123');
        expect(inputController_1.default.isValidName).toHaveBeenCalledWith('John', 'First name');
        expect(inputController_1.default.isValidName).toHaveBeenCalledWith('Doe', 'Last name');
        expect(userServices_1.default.newUser).toHaveBeenCalledWith('test@example.com', 'User1', 'password123', 'John', 'Doe', 'user');
        expect(jwtServices_1.default.sendJwtResponse).toHaveBeenCalledWith(mockUserOutput, res);
        expect(next).not.toHaveBeenCalled();
    });
});
describe('login user', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should return a 401 error if user is not found in the db and bcrypt.compare should not be called', async () => {
        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        const mockError = new appErrorServices_1.default('Something is wrong with your credentials', 401);
        userServices_1.default.findUserbyEmail = jest.fn(() => {
            throw mockError;
        });
        await authController_1.default.login(req, res, next);
        expect(userServices_1.default.findUserbyEmail).toHaveBeenCalledWith('test@example.com');
        expect(bcryptServices_1.default.checkPassword).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(mockError);
    });
    it('should call bcrypt.compare if user is found in the db', async () => {
        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };
        const res = {
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
        userServices_1.default.findUserbyEmail = jest.fn().mockResolvedValue(mockUser);
        await authController_1.default.login(req, res, next);
        expect(bcryptServices_1.default.checkPassword).toHaveBeenCalledWith('password123', mockUser);
    });
    it('should return a 401 error if auth fails', async () => {
        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        const mockError = new appErrorServices_1.default('Email does not exist', 401);
        bcryptServices_1.default.checkPassword = jest.fn().mockResolvedValue(false);
        await authController_1.default.login(req, res, next);
        expect(jwtServices_1.default.sendJwtResponse).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(mockError);
    });
});
