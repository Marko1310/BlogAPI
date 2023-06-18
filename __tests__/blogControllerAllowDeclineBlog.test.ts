// Express Router
import { Request, Response, NextFunction } from 'express';

// services
import blogServices from '../services/blogServices';
import userServices from '../services/userServices';
import AppError from '../services/appErrorServices';
import blogController from '../controllers/blogController';

// mocking function
userServices.changeUserRole = jest.fn();

// tests
describe('AllowDeclinePost', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should allow a blog and change the user role to "blogger"', async () => {
    const blogId = 1;
    const action = 'allow';

    const blog = {
      blogId: 1,
      title: 'Test Blog',
      content: 'This is a test blog post',
      author: 'User1',
      userId: 123,
      allowed: true,
      getUser: jest.fn(),
    };

    blogServices.findBlogByBlogID = jest.fn().mockResolvedValue(blog);
    blogServices.allowBlog = jest.fn().mockResolvedValue([1]);
    blogServices.declineBlog = jest.fn().mockResolvedValue([0]);

    const mockUserOutput = {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      userName: 'User1',
      password: 'password123',
      role: 'user',
    };
    blog.getUser = jest.fn().mockReturnValue(mockUserOutput);

    const req: Partial<Request> = {
      body: {
        blogId,
        action,
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await blogController.allowDeclinePost(req as Request, res as Response, next as NextFunction);

    expect(blogServices.findBlogByBlogID).toHaveBeenCalledWith(1);
    expect(blogServices.allowBlog).toHaveBeenCalledWith(1);
    expect(userServices.changeUserRole).toHaveBeenCalledWith(1, 'blogger');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(`Blog (blogId: 1) is allowed`);
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw new AppError if there is no blog', async () => {
    const blog = null;
    blogServices.findBlogByBlogID = jest.fn().mockResolvedValue(blog);
    blogServices.allowBlog = jest.fn().mockResolvedValue([0]);
    blogServices.declineBlog = jest.fn().mockResolvedValue([1]);

    const blogId = 1;
    const action = 'allow';

    const mockError = new AppError(`There is no blog (blogId: ${blogId})`, 404);

    const req: Partial<Request> = {
      body: {
        blogId,
        action,
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await blogController.allowDeclinePost(req as Request, res as Response, next as NextFunction);

    expect(blogServices.findBlogByBlogID).toHaveBeenCalledWith(1);
    expect(blogServices.allowBlog).not.toHaveBeenCalled();
    expect(userServices.changeUserRole).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });

  it('should throw new AppError if action is invalid', async () => {
    const blog = {
      blogId: 1,
      title: 'Test Blog',
      content: 'This is a test blog post',
      author: 'User1',
      userId: 123,
      allowed: true,
      getUser: jest.fn(),
    };
    blogServices.findBlogByBlogID = jest.fn().mockResolvedValue(blog);

    const blogId = 1;
    const action = 'invalid';

    const mockUserOutput = {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      userName: 'User1',
      password: 'password123',
      role: 'user',
    };
    blog.getUser = jest.fn().mockReturnValue(mockUserOutput);

    const mockError = new AppError(`Invalid action: (${action}), please provide type of 'allow' or 'decline'`, 400);

    const req: Partial<Request> = {
      body: {
        blogId,
        action,
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await blogController.allowDeclinePost(req as Request, res as Response, next as NextFunction);

    expect(blogServices.findBlogByBlogID).toHaveBeenCalledWith(blogId);
    expect(blogServices.allowBlog).not.toHaveBeenCalled();
    expect(userServices.changeUserRole).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });
});
