import jwt from 'jsonwebtoken';
import jwtServices from '../services/jwtServices';
import { Response } from 'express';

jest.mock('jsonwebtoken');

describe('createToken', () => {
  it('should call jwt.sign with the correct parameters nad send a response', () => {
    const mockSign = jest.spyOn(jwt, 'sign').mockImplementation(() => 'mocked-token');

    const user = {
      userId: 123,
      email: 'user@user.com',
      password: 'hash',
      firstName: 'User',
      lastName: 'User',
      role: 'user',
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockJwtSecret = 'my-mocked-jwt-secret';
    process.env.JWT_SECRET = mockJwtSecret;

    jwtServices.sendJwtResponse(user, res);

    expect(mockSign).toHaveBeenCalledTimes(1);
    expect(mockSign).toHaveBeenCalledWith({ userId: user.userId }, 'blogblog', {
      expiresIn: 604800,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      userId: user.userId,
      token: 'mocked-token',
    });
  });
});
