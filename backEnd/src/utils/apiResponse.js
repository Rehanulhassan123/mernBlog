import { StatusCodes } from "http-status-codes";

class apiResponse {
  constructor(statusCode, message = "Successfull Api call ", data = {}) {
    this.message = message;
    this.statusCode = statusCode || StatusCodes.ACCEPTED;
    this.data = data;
    this.success = statusCode < 400;
  }
}

export default apiResponse;
