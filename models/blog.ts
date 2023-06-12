import sequelize from '../config/databaseConnection';
import { User } from './user'; // Import the User model
import { Model, DataTypes } from 'sequelize';

interface BlogAttributes {
  blogId: number;
  title: string;
  content: string;
  author: string;
  allowed: boolean;
  userId: number;
}

class Blog extends Model<BlogAttributes> implements BlogAttributes {
  declare blogId: number;
  declare title: string;
  declare content: string;
  declare author: string;
  declare allowed: boolean;
  declare userId: number;
}

Blog.init(
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
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Blog',
    timestamps: true,
  }
);

Blog.belongsTo(User, {
  foreignKey: 'userId',
});

export default Blog;
