// dependencies
import jwt from 'jsonwebtoken';

const jwtSecret: string = process.env.JWT_SECRET as string;

// create token
const createToken = (userId: number, maxAge: number) => {
  jwt.sign({ userId }, jwtSecret, { expiresIn: maxAge });
};

export default { createToken };
