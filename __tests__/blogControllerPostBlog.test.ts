// Express Router
import { Request, Response, NextFunction } from 'express';

// Models
import { UserOutput } from '../models/user';

// Controllers
import inputController from '../controllers/inputController';

// services
import blogServices from '../services/blogServices';
import userServices from '../services/userServices';
import AppError from '../services/appErrorServices';
import blogController from '../controllers/blogController';

interface customRequest extends Request {
  user: UserOutput;
}

jest.mock('../controllers/inputController', () => ({
  isValidBlogTitle: jest.fn(),
  isValidBlogContent: jest.fn(),
}));

jest.mock('../services/blogServices', () => ({
  createNewBlog: jest.fn().mockResolvedValue({
    blogId: 1,
    title: 'Test Blog',
    content: 'This is a test blog post',
    userId: 123,
    allowed: true,
  }),
}));

describe('postBlog', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should create a new blog post and return it with status 200', async () => {
    const req: Partial<customRequest> = {
      body: {
        title: 'Test Blog',
        content: 'This is a test blog post',
      },
      user: {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
        role: 'admin',
        userId: 123,
      },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const mockNewBlog = {
      blogId: 1,
      title: 'Test Blog',
      content: 'This is a test blog post',
      userId: 123,
      allowed: true,
    };

    await blogController.postBlog(req as Request, res as Response, next);

    expect(inputController.isValidBlogTitle).toHaveBeenCalledWith('Test Blog');
    expect(inputController.isValidBlogContent).toHaveBeenCalledWith('This is a test blog post');
    expect(blogServices.createNewBlog).toHaveBeenCalledWith(
      'Test Blog',
      'This is a test blog post',
      123,
      'test@example.com',
      true
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockNewBlog);
    expect(next).not.toHaveBeenCalled();
  });
});
