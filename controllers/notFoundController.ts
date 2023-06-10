// Express Router
import { Request, Response } from 'express';

const notFound = async (req: Request, res: Response) => {
  try {
    res.status(404).json({
      status: 'fail',
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  } catch (err) {
    console.log(err);
  }
};

export default {
  notFound,
};
