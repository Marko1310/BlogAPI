// Express Router
import { Request, Response, NextFunction } from 'express';

// Models
import { UserOutput } from '../models/user';

// Controllers
import inputController from '../controllers/inputController';

// services
import blogServices from '../services/blogServices';
import blogController from '../controllers/blogController';

interface customRequest extends Request {
  user: UserOutput;
}

inputController.isValidBlogTitle = jest.fn();
inputController.isValidBlogContent = jest.fn();

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
        password: 'password123',
        userName: 'User1',
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
        userId: 123,
      },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const blog = {
      blogId: 1,
      title: 'Test Blog',
      content: 'This is a test blog post',
      author: 'User1',
      userId: 123,
      allowed: true,
      getUser: jest.fn(),
    };
    blogServices.createNewBlog = jest.fn().mockResolvedValue(blog);

    await blogController.postBlog(req as Request, res as Response, next as NextFunction);

    expect(inputController.isValidBlogTitle).toHaveBeenCalledWith('Test Blog');
    expect(inputController.isValidBlogContent).toHaveBeenCalledWith('This is a test blog post');
    expect(blogServices.createNewBlog).toHaveBeenCalledWith(
      'Test Blog',
      'This is a test blog post',
      123,
      'User1',
      true
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(blog);
    expect(next).not.toHaveBeenCalled();
  });
});
