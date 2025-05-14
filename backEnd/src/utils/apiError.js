import { StatusCodes } from "http-status-codes";

class apiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    stack,
    errors = []
  ) {
    super(message);
    this.statusCode = statusCode || StatusCodes.BAD_REQUEST;
    this.errors = errors;
    this.data = null;
    this.success = false;
    if (stack) {
      this.stack = stack;
    } else {
      this.stack = Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default apiError;
