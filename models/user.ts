import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/databaseConnection';
import bcrypt from 'bcryptjs';

interface UserAttributes {
  role: string;
  userId: number;
  email: string;
  password: string;
  userName: string;
  firstName: string;
  lastName: string;
}

interface UserInput extends Optional<UserAttributes, 'userId'> {
  email: string;
  password: string;
  userName: string;
  firstName: string;
  lastName: string;
  role: string;
}

type UserOutput = UserAttributes;

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  declare userId: number;
  declare email: string;
  declare password: string;
  declare userName: string;
  declare firstName: string;
  declare lastName: string;
  declare role: string;
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
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Please provide a valid user name' },
        notEmpty: { msg: 'Please provide a valid user name' },
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
    role: {
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

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

export { User, UserOutput, UserInput };
