import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/databaseConnection';

interface UserAttributes {
  permission: string;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserInput extends Optional<UserAttributes, 'userId' | 'permission'> {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type UserOutput = UserAttributes;

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  declare permission: string;
  declare userId: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value: string) {
        this.setDataValue('email', value.toLowerCase());
      },
      validate: {
        isEmail: { msg: 'Please provide a valid email address' },
        notNull: { msg: 'Please provide a valid email address' },
        notEmpty: { msg: 'Please provide a valid email address' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, Infinity],
          msg: 'Password should be at least 6 characters long',
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide first name' },
        notEmpty: { msg: 'First name cannot be empty' },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide last name' },
        notEmpty: { msg: 'Last name cannot be empty' },
      },
    },
    permission: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      allowNull: false,
      validate: {
        isIn: {
          args: [['user', 'blogger', 'admin']],
          msg: 'Invalid permission value',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: false,
  }
);

export { User, UserOutput, UserInput };
