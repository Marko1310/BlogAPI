"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const retrieveDataServices_1 = __importDefault(require("../services/retrieveDataServices"));
const user_1 = require("../models/user");
test('it should call User.findAll once', async () => {
    const mockFindAll = jest.fn();
    user_1.User.findAll = mockFindAll;
    await retrieveDataServices_1.default.getAllUsers();
    expect(mockFindAll).toHaveBeenCalled();
    expect(mockFindAll).toHaveBeenCalledTimes(1);
    mockFindAll.mockRestore();
});
