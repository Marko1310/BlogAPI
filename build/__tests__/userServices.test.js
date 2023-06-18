"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const userServices_1 = __importDefault(require("../services/userServices"));
// 1.) Test newUser function
test('newUser function should call User.create with correct parameters and store it in userInput variable', async () => {
    user_1.User.create = jest.fn().mockResolvedValueOnce({
        userId: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        userName: 'User1',
        password: 'password',
        role: 'user',
    });
    const email = 'johndoe@example.com';
    const password = 'password';
    const userName = 'User1';
    const firstName = 'John';
    const lastName = 'Doe';
    const role = 'user';
    const user = await userServices_1.default.newUser(email, userName, password, firstName, lastName, role);
    expect(user_1.User.create).toHaveBeenCalledTimes(1);
    expect(user_1.User.create).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'password',
        userName: 'User1',
        role: 'user',
    });
    expect(user).toEqual({
        userId: 1,
        firstName: 'John',
        lastName: 'Doe',
        userName: 'User1',
        email: 'johndoe@example.com',
        password: 'password',
        role: 'user',
    });
});
// 2.) Test findUserbyID function
test('findUserbyID should call User.findOne with the correct parameters', async () => {
    user_1.User.findOne = jest.fn();
    const userId = 1;
    await userServices_1.default.findUserbyID(userId);
    expect(user_1.User.findOne).toHaveBeenCalledTimes(1);
    expect(user_1.User.findOne).toHaveBeenCalledWith({ where: { userId: 1 } });
});
// 3.) Test findUserbyEmail function
test('findUserbyEmail should call User.findOne with the correct parameters', async () => {
    user_1.User.findOne = jest.fn();
    const email = 'john.doe@example.com';
    await userServices_1.default.findUserbyEmail(email);
    expect(user_1.User.findOne).toHaveBeenCalledTimes(1);
    expect(user_1.User.findOne).toHaveBeenCalledWith({ where: { email: 'john.doe@example.com' } });
});
// 4.) Test changeUserRole function
test('changeUserRole should call User.update with the correct parameters', async () => {
    user_1.User.update = jest.fn();
    const userId = 1;
    const newRole = 'blogger';
    await userServices_1.default.changeUserRole(userId, newRole);
    expect(user_1.User.update).toHaveBeenCalledTimes(1);
    expect(user_1.User.update).toHaveBeenCalledWith({ role: 'blogger' }, { where: { userId: 1 } });
});
