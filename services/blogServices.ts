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

const allowDeclinePost = (blogId: number, action: string) => {
  return true;
};
const findBlogbyID = (blogId: number) => Blog.findOne({ where: { blogId } });

const allowBlog = (blogId: number) =>
  Blog.update({ allowed: true }, { where: { blogId } });

export default { createNewBlog, allowDeclinePost, findBlogbyID, allowBlog };
