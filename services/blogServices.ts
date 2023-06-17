// Models
import { Blog, BlogInput, BlogOutput } from '../models/blog';
import { User } from '../models/user';

const createNewBlog = (
  title: string,
  content: string,
  userId: number,
  email: string,
  allowed?: boolean
): Promise<BlogOutput> => {
  const blogInput: BlogInput = {
    title: title,
    content: content,
    userId: userId,
    author: email,
    allowed: allowed || false,
  };
  const blog = Blog.create(blogInput);
  return blog;
};
const findAllBlogs = (): Promise<BlogOutput[] | null> => Blog.findAll();

const findPublicBlogs = (): Promise<BlogOutput[] | null> =>
  Blog.findAll({
    where: { allowed: true },
    attributes: ['title', 'content'],
    include: [{ model: User, attributes: ['userName'] }],
  });

const findBlogByBlogID = (blogId: number): Promise<BlogOutput | null> => Blog.findOne({ where: { blogId } });

const findBlogByUserID = (userId: number): Promise<BlogOutput[] | null> => Blog.findAll({ where: { userId } });

const allowBlog = (blogId: number): Promise<[affectedCount: number]> =>
  Blog.update({ allowed: true }, { where: { blogId } });

const declineBlog = (blogId: number): Promise<[affectedCount: number]> =>
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
