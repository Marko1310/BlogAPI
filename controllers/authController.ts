//express router
import { Request, Response } from 'express';

interface RegisterRequestBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName }: RegisterRequestBody =
      req.body;

    res.json({ email, password, firstName, lastName });
  } catch (err) {}
};

const login = async (req: Request, res: Response) => {
  try {
    res.json('login');
  } catch (err) {}
};

module.exports = {
  register,
  login,
};
