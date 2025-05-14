import blogModel from "../models/blogModel.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sanitizeContent } from "../utils/domPurify.js";
import { StatusCodes } from "http-status-codes";
import { uploadOnCloudinary } from "../services/cloudinary/cloudinaryHelper.js";

export const createBlog = asyncHandler(async (req, res) => {
  const { _id: userId } = req?.user;
  console.log(req.user._id);

  if (!userId) {
    throw new apiError(StatusCodes.UNAUTHORIZED, "Unauthorized Access");
  }

  const existingBlog = await blogModel.findOne({ title: req.body.title });
  if (existingBlog) {
    throw new apiError(StatusCodes.BAD_REQUEST, "Blog already exists");
  }
  let bannerLocalPath;
  console.log("req.files", req.files);

  if (
    req.files &&
    Array.isArray(req.files.banner) &&
    req.files.banner.length > 0
  ) {
    console.log(req.files.banner[0].path, "req.files.banner[0].path");

    bannerLocalPath = req.files.banner[0].path;
  }

  if (!bannerLocalPath) {
    throw new apiError(StatusCodes.BAD_REQUEST, "Banner is required");
  }

  const banner = await uploadOnCloudinary(bannerLocalPath, "banners");

  if (!banner) {
    throw new apiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while uploading banner"
    );
  }

  const sanitizedContent = sanitizeContent(req.body.content);
  console.log(sanitizedContent, "sanitizedContent");

  const blog = await blogModel.create({
    ...req.body,
    banner,
    author: userId,
    content: sanitizedContent,
  });
  console.log("blog", blog);

  if (!blog) {
    throw new apiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating blog"
    );
  }

  return res
    .status(StatusCodes.CREATED)
    .json(
      new apiResponse(StatusCodes.CREATED, "Blog created successfully", blog)
    );
});
