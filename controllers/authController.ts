// Express Router
import { Request, Response } from 'express';
const { Response } = require('express');

interface RegisterRequestBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName }: RegisterRequestBody =
    req.body;
  try {
    res.json({ email, password, firstName, lastName });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password }: LoginRequestBody = req.body;
  try {
    res.json({ email, password });
  } catch (err) {
    console.log(err);
  }
};

console.log('aaaa');

export default {
  register,
  login,
};
