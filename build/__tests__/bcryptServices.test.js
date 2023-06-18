"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptServices_1 = __importDefault(require("../services/bcryptServices"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
bcryptjs_1.default.compare = jest.fn();
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
        await bcryptServices_1.default.checkPassword(password, user);
        expect(bcryptjs_1.default.compare).toHaveBeenCalledTimes(1);
        expect(bcryptjs_1.default.compare).toHaveBeenLastCalledWith(password, user.password);
    });
});
