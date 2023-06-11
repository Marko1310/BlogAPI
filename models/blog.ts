import DataTypes from 'sequelize';
import sequelize from '../config/databaseConnection';
import User from './user'; // Import the User model

const Blog = sequelize.define(
  'blog',
  {
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    allowed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Blog.belongsTo(User, {
  foreignKey: 'userId',
});

export default Blog;
