import { User } from '../models/user';
import { Blog } from '../models/blog';
import sequelize from './databaseConnection';

// Global Error handler
import AppError from '../services/appErrorServices';

User.hasMany(Blog, { foreignKey: 'userId' });
Blog.belongsTo(User, { foreignKey: 'userId' });

const syncModels = async () => {
  try {
    await sequelize.authenticate();
    await User.sync({ alter: true });
    await Blog.sync({ alter: true });
  } catch (err) {
    console.log('Error synchronizing models:', err);
    throw new AppError(
      'Database synchronization failed. Server cannot start.',
      500
    );
  }
};

export default syncModels;
