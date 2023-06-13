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

export default { createNewBlog };
