import retrieveDataServices from '../services/retrieveDataServices';

import { User } from '../models/user';
import { Blog } from '../models/blog';

test('it should call User.findAll once', async () => {
  const mockFindAll = jest.fn();
  User.findAll = mockFindAll;
  await retrieveDataServices.getAllUsers('admin');

  expect(mockFindAll).toHaveBeenCalled();

  expect(mockFindAll).toHaveBeenCalledTimes(1);

  mockFindAll.mockRestore();
});

test('it should call Blog.findAll once', async () => {
  const mockFindAll = jest.fn();
  Blog.findAll = mockFindAll;
  await retrieveDataServices.getRequestedPosts();

  expect(mockFindAll).toHaveBeenCalled();

  expect(mockFindAll).toHaveBeenCalledTimes(1);

  mockFindAll.mockRestore();
});
