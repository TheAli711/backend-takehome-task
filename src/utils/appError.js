class AppError extends Error {
  statusCode;
  status;
  isOperational;
  errors;

  constructor(message, statusCode, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
