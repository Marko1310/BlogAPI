import jwt from 'jsonwebtoken';
import jwtServices from '../services/jwtServices';
import { Response } from 'express';

jest.mock('jsonwebtoken');

describe('createToken', () => {
  it('should call jwt.sign with the correct parameters and send a response', () => {
    const mockSign = jest.spyOn(jwt, 'sign').mockImplementation(() => 'mocked-token');

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
    } as unknown as Response;

    jwtServices.sendJwtResponse(user, res);

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
      const mockVerify = jest.spyOn(jwt, 'verify').mockImplementation(() => {
        123;
      });

      const token = 'mocked-token';

      jwtServices.verifyJwtToken(token);

      expect(mockVerify).toHaveBeenCalledTimes(1);
      expect(mockVerify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
    });
  });
});
