class AppError extends Error {
  public status: string;
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'eror';
    this.isOperational = true;
  }
}

export default AppError;
