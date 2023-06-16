"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const userServices_1 = __importDefault(require("../services/userServices"));
// 1.) Test newUser function
test('newUser function should call User.create with correct parameters and store it in userInput variable', async () => {
    const mockCreate = jest.spyOn(user_1.User, 'create').mockResolvedValueOnce({
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
    const user = await userServices_1.default.newUser(email, password, firstName, lastName, role);
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
    user_1.User.findOne = mockFindOne;
    const userId = 1;
    await userServices_1.default.findUserbyID(userId);
    expect(mockFindOne).toHaveBeenCalledTimes(1);
    expect(mockFindOne).toHaveBeenCalledWith({ where: { userId } });
    mockFindOne.mockRestore();
});
// 3.) Test findUserbyEmail function
test('findUserbyEmail should call User.findOne with the correct parameters', async () => {
    const mockFindOne = jest.fn();
    user_1.User.findOne = mockFindOne;
    const email = 'john.doe@example.com';
    await userServices_1.default.findUserbyEmail(email);
    expect(mockFindOne).toHaveBeenCalledTimes(1);
    expect(mockFindOne).toHaveBeenCalledWith({ where: { email } });
    mockFindOne.mockRestore();
});
// 4.) Test changeUserRole function
test('changeUserRole should call User.update with the correct parameters', async () => {
    const mockUpdate = jest.fn();
    user_1.User.update = mockUpdate;
    const userId = 1;
    const newRole = 'blogger';
    await userServices_1.default.changeUserRole(userId, newRole);
    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith({ role: newRole }, { where: { userId } });
    mockUpdate.mockRestore();
});
