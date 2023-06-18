import retrieveDataServices from '../services/retrieveDataServices';

import { User } from '../models/user';
import { Blog } from '../models/blog';

test('it should call User.findAll once', async () => {
  User.findAll = jest.fn();

  await retrieveDataServices.getAllUsers('admin');

  expect(User.findAll).toHaveBeenCalled();
  expect(User.findAll).toHaveBeenCalledTimes(1);
});

test('it should call Blog.findAll once', async () => {
  Blog.findAll = jest.fn();

  await retrieveDataServices.getRequestedPosts();

  expect(Blog.findAll).toHaveBeenCalled();
  expect(Blog.findAll).toHaveBeenCalledTimes(1);
});
