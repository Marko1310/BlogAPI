"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtServices_1 = __importDefault(require("../services/jwtServices"));
jest.mock('jsonwebtoken');
describe('createToken', () => {
    it('should call jwt.sign with the correct parameters and send a response', () => {
        const mockSign = jest.spyOn(jsonwebtoken_1.default, 'sign').mockImplementation(() => 'mocked-token');
        const user = {
            userId: 123,
            email: 'user@user.com',
            userName: 'User1',
            password: 'hash',
            firstName: 'User',
            lastName: 'User',
            role: 'user',
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jwtServices_1.default.sendJwtResponse(user, res);
        expect(mockSign).toHaveBeenCalledTimes(1);
        expect(mockSign).toHaveBeenCalledWith({ userId: user.userId }, process.env.JWT_SECRET, {
            expiresIn: 604800,
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            userId: user.userId,
            token: 'mocked-token',
        });
    });
    describe('verifyJwtToken', () => {
        it('should call jwt.verify with the correct parameters', () => {
            const mockVerify = jest.spyOn(jsonwebtoken_1.default, 'verify').mockImplementation(() => {
                123;
            });
            const token = 'mocked-token';
            jwtServices_1.default.verifyJwtToken(token);
            expect(mockVerify).toHaveBeenCalledTimes(1);
            expect(mockVerify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
        });
    });
});
