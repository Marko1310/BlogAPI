"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogServices_1 = __importDefault(require("../services/blogServices"));
const blog_1 = require("../models/blog");
describe('blogServices', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should call Blog.create with the right parameters', async () => {
        const mockCreate = jest.spyOn(blog_1.Blog, 'create').mockResolvedValueOnce({});
        const title = 'title';
        const content = 'some blog';
        const userId = 123;
        const userName = 'User1';
        const allowed = false;
        const blogInput = {
            title: title,
            content: content,
            userId: userId,
            author: userName,
            allowed: allowed || false,
        };
        const blog = await blogServices_1.default.createNewBlog(title, content, userId, userName, allowed);
        expect(mockCreate).toBeCalledTimes(1);
        expect(mockCreate).toBeCalledWith(blogInput);
        expect(blog).toEqual({});
    });
    it('should call Blog.findAll with the correct parameters and return the expected result', async () => {
        const mockFindAll = jest.spyOn(blog_1.Blog, 'findAll').mockResolvedValueOnce([{}]);
        const allowed = true;
        const result = await blogServices_1.default.findPublicBlogs();
        expect(mockFindAll).toBeCalledTimes(1);
        expect(mockFindAll).toBeCalledWith({
            where: { allowed: allowed },
            attributes: ['title', 'content', 'author'],
        });
        expect(result).toEqual([{}]);
    });
    it('should call Blog.findOne with the correct parameters and return the expected result', async () => {
        const mockFindOne = jest.spyOn(blog_1.Blog, 'findOne').mockResolvedValueOnce({});
        const blogId = 123;
        const result = await blogServices_1.default.findBlogByBlogID(123);
        expect(mockFindOne).toBeCalledTimes(1);
        expect(mockFindOne).toBeCalledWith({ where: { blogId: 123 } });
        expect(result).toEqual({});
    });
    it('should call Blog.update with the correct parameters', async () => {
        const mockUpdate = jest.spyOn(blog_1.Blog, 'update');
        const blogId = 123;
        const allowed = true;
        await blogServices_1.default.allowBlog(blogId);
        expect(mockUpdate).toBeCalledTimes(1);
        expect(mockUpdate).toBeCalledWith({ allowed }, { where: { blogId: 123 } });
    });
});
