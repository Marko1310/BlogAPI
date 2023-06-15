import sequelize from '../config/databaseConnection';
import { User } from './user';

import { Model, DataTypes, Optional, BelongsToGetAssociationMixin } from 'sequelize';

interface BlogAttributes {
  blogId: number;
  title: string;
  content: string;
  author: string;
  allowed: boolean;
  userId: number;
}

interface BlogInput extends Optional<BlogAttributes, 'blogId' | 'userId' | 'allowed'> {
  title: string;
  content: string;
  userId: number;
  author: string;
  allowed: boolean;
}

type BlogOutput = Blog;

class Blog extends Model<BlogAttributes, BlogInput> implements BlogAttributes {
  declare blogId: number;
  declare title: string;
  declare content: string;
  declare author: string;
  declare allowed: boolean;
  declare userId: number;
  declare getUser: BelongsToGetAssociationMixin<User>;
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
      type: DataTypes.TEXT,
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

export { Blog, BlogInput, BlogOutput };
