import { StatusCodes } from "http-status-codes";
import apiError from "../utils/apiError.js";

export const errorHandler = (err, _, res, next) => {
  if (err instanceof apiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: err.message || "Something went wrong" });
};
