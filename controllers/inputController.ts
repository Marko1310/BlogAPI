// Global Error handler
import AppError from '../services/appErrorServices';

// email regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Input validator functions
const isValidEmail = (email: string) => {
  if (email.length === 0 || emailRegex.test(email) === false) {
    throw new AppError('Please provide a valid email address', 400);
  }
};

const isValidPassword = (password: string) => {
  if (password.length < 6) {
    throw new AppError('Password should be at least 6 characters long', 400);
  }
};

const isValidName = (name: string, fieldName: string) => {
  if (name.length === 0) {
    throw new AppError(`${fieldName} cannot be empty`, 400);
  }
};

const isValidBlogTitle = (title: string) => {
  if (title.length === 0) {
    throw new AppError(`Title cannot be empty`, 400);
  }
};

const isValidBlogContent = (content: string) => {
  if (content.length === 0) {
    throw new AppError(`Content cannot be empty`, 400);
  }
};

export default {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidBlogTitle,
  isValidBlogContent,
};
