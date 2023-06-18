"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services
const blogServices_1 = __importDefault(require("../services/blogServices"));
const userServices_1 = __importDefault(require("../services/userServices"));
const appErrorServices_1 = __importDefault(require("../services/appErrorServices"));
const blogController_1 = __importDefault(require("../controllers/blogController"));
// mocking function
userServices_1.default.changeUserRole = jest.fn();
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
        blogServices_1.default.findBlogByBlogID = jest.fn().mockResolvedValue(blog);
        blogServices_1.default.allowBlog = jest.fn().mockResolvedValue([1]);
        blogServices_1.default.declineBlog = jest.fn().mockResolvedValue([0]);
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
        const req = {
            body: {
                blogId,
                action,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        await blogController_1.default.allowDeclinePost(req, res, next);
        expect(blogServices_1.default.findBlogByBlogID).toHaveBeenCalledWith(1);
        expect(blogServices_1.default.allowBlog).toHaveBeenCalledWith(1);
        expect(userServices_1.default.changeUserRole).toHaveBeenCalledWith(1, 'blogger');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(`Blog (blogId: 1) is allowed`);
        expect(next).not.toHaveBeenCalled();
    });
    it('should throw new AppError if there is no blog', async () => {
        const blog = null;
        blogServices_1.default.findBlogByBlogID = jest.fn().mockResolvedValue(blog);
        blogServices_1.default.allowBlog = jest.fn().mockResolvedValue([0]);
        blogServices_1.default.declineBlog = jest.fn().mockResolvedValue([1]);
        const blogId = 1;
        const action = 'allow';
        const mockError = new appErrorServices_1.default(`There is no blog (blogId: ${blogId})`, 404);
        const req = {
            body: {
                blogId,
                action,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        await blogController_1.default.allowDeclinePost(req, res, next);
        expect(blogServices_1.default.findBlogByBlogID).toHaveBeenCalledWith(1);
        expect(blogServices_1.default.allowBlog).not.toHaveBeenCalled();
        expect(userServices_1.default.changeUserRole).not.toHaveBeenCalled();
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
        blogServices_1.default.findBlogByBlogID = jest.fn().mockResolvedValue(blog);
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
        const mockError = new appErrorServices_1.default(`Invalid action: (${action}), please provide type of 'allow' or 'decline'`, 400);
        const req = {
            body: {
                blogId,
                action,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        await blogController_1.default.allowDeclinePost(req, res, next);
        expect(blogServices_1.default.findBlogByBlogID).toHaveBeenCalledWith(blogId);
        expect(blogServices_1.default.allowBlog).not.toHaveBeenCalled();
        expect(userServices_1.default.changeUserRole).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(mockError);
    });
});
