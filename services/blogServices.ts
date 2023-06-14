// Blog model
import { Blog, BlogInput, BlogOutput } from '../models/blog';

const createNewBlog = (
  title: string,
  content: string,
  userId: number,
  email: string
): Promise<BlogOutput> => {
  const blogInput: BlogInput = {
    title: title,
    content: content,
    userId: userId,
    author: email,
  };
  const blog = Blog.create(blogInput);
  return blog;
};
const findAllBlogs = () => Blog.findAll();

const findPublicBlogs = () => Blog.findAll({ where: { allowed: true } });

const findBlogByBlogID = (blogId: number) =>
  Blog.findOne({ where: { blogId } });

const findBlogByUserID = (userId: number) =>
  Blog.findAll({ where: { userId } });

const allowBlog = (blogId: number) =>
  Blog.update({ allowed: true }, { where: { blogId } });

const declineBlog = (blogId: number) =>
  Blog.update({ allowed: false }, { where: { blogId } });

export default {
  createNewBlog,
  findAllBlogs,
  findPublicBlogs,
  findBlogByBlogID,
  findBlogByUserID,
  allowBlog,
  declineBlog,
};
