import blogServices from '../services/blogServices';
import { Blog, BlogOutput } from '../models/blog';

describe('blogServices', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should call Blog.create with the right parameters', async () => {
    const mockCreate = jest.spyOn(Blog, 'create').mockResolvedValueOnce({} as BlogOutput);

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

    const blog = await blogServices.createNewBlog(title, content, userId, userName, allowed);

    expect(mockCreate).toBeCalledTimes(1);
    expect(mockCreate).toBeCalledWith(blogInput);
    expect(blog).toEqual({} as BlogOutput);
  });

  it('should call Blog.findAll with the correct parameters and return the expected result', async () => {
    const mockFindAll = jest.spyOn(Blog, 'findAll').mockResolvedValueOnce([{}] as BlogOutput[]);

    const allowed = true;

    const result = await blogServices.findPublicBlogs();

    expect(mockFindAll).toBeCalledTimes(1);
    expect(mockFindAll).toBeCalledWith({
      where: { allowed: allowed },
      attributes: ['title', 'content', 'author'],
    });
    expect(result).toEqual([{}] as BlogOutput[]);
  });

  it('should call Blog.findOne with the correct parameters and return the expected result', async () => {
    const mockFindOne = jest.spyOn(Blog, 'findOne').mockResolvedValueOnce({} as BlogOutput);

    const blogId = 123;

    const result = await blogServices.findBlogByBlogID(123);

    expect(mockFindOne).toBeCalledTimes(1);
    expect(mockFindOne).toBeCalledWith({ where: { blogId: 123 } });
    expect(result).toEqual({} as BlogOutput);
  });

  it('should call Blog.update with the correct parameters', async () => {
    const mockUpdate = jest.spyOn(Blog, 'update');

    const blogId = 123;
    const allowed = true;

    await blogServices.allowBlog(blogId);

    expect(mockUpdate).toBeCalledTimes(1);
    expect(mockUpdate).toBeCalledWith({ allowed }, { where: { blogId: 123 } });
  });
});
