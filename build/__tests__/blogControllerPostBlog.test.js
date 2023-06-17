"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Controllers
const inputController_1 = __importDefault(require("../controllers/inputController"));
// services
const blogServices_1 = __importDefault(require("../services/blogServices"));
const blogController_1 = __importDefault(require("../controllers/blogController"));
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
        const req = {
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
        const res = {
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
        await blogController_1.default.postBlog(req, res, next);
        expect(inputController_1.default.isValidBlogTitle).toHaveBeenCalledWith('Test Blog');
        expect(inputController_1.default.isValidBlogContent).toHaveBeenCalledWith('This is a test blog post');
        expect(blogServices_1.default.createNewBlog).toHaveBeenCalledWith('Test Blog', 'This is a test blog post', 123, 'test@example.com', true);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockNewBlog);
        expect(next).not.toHaveBeenCalled();
    });
});
