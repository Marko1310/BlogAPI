import User from '../models/user';
import Blog from '../models/blog';
import sequelize from './databaseConnection';

User.hasMany(Blog, {
  foreignKey: 'userId',
});
Blog.belongsTo(User, {
  foreignKey: 'userId',
});

const syncModels = async () => {
  try {
    await sequelize.authenticate();
    await User.sync({
      alter: true,
    });
    await Blog.sync({
      alter: true,
    });
  } catch (err) {
    console.log('Error synchronizing models:', err);
  }
};

export default syncModels;
