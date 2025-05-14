import apiError from "../utils/apiError.js";
import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cookiesOptions } from "../constant.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../services/cloudinary/cloudinaryHelper.js";

// ++++++++++++++++++++++++++++++ Register Controller ++++++++++++++++++++++++++++++
export const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);

  // ++++++++++ destructure from the request body ++++++++++++++++++++
  const { userName, email, password } = req.body;
  console.log(userName, email, password);
  console.log(typeof password);

  // +++++++++++ Validation ++++++++++++++++++++++++++++++
  [userName, email, password].some((value) => {
    if (!value || value.trim() === "") {
      throw new apiError(StatusCodes.BAD_REQUEST, "All fields are required");
    }
  });

  // +++++++++++++ Check if user exist in db +++++++++++++++++++++++

  const existingUser = await User.findOne({
    $or: [
      { "personalInfo.email": email },
      { "personalInfo.userName": userName },
    ],
  });

  if (existingUser) {
    throw new apiError(
      StatusCodes.CONFLICT,
      "User with same userName or email already exist"
    );
  }

  // +++++++++++ Create new user ++++++++++++++++++++++++++++++

  const user = await User.create({
    personalInfo: {
      userName,
      email,
      password,
    },
  });

  // ++++++++++ check if user being created successfully ++++++++++++++++++++++
  if (!user) {
    throw new apiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while registering user"
    );
  }

  // ++++++++++ send back response ++++++++++++++++++++++++++
  const userObj = user.toObject();
  delete userObj.personalInfo.password;
  delete userObj.refreshToken;

  return res
    .status(StatusCodes.OK)
    .json(
      new apiResponse(StatusCodes.OK, "User registered successfully", userObj)
    );
});

// +++++++++++++++++++++++++++++++++ Login Controller  ++++++++++++++++++++++++++++++

export const loginUser = asyncHandler(async (req, res) => {
  // ++++++++++ destructure from the request body ++++++++++++++++++++
  const { email, password } = req.body;

  // +++++++++++ Validation ++++++++++++++++++++++++++++++
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    throw new apiError(StatusCodes.BAD_REQUEST, "All fields are required");
  }

  // +++++++++++ Check if user exist in db ++++++++++++++++++++++++++++++
  const user = await User.findOne({
    "personalInfo.email": email,
  });

  if (!user) {
    throw new apiError(StatusCodes.NOT_FOUND, "User not found");
  }

  // ++++++++++ check if password is correct ++++++++++++++++++++++++++

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new apiError(StatusCodes.UNAUTHORIZED, "Invalid Credentials");
  }

  // ++++++++++ Generate access and refresh token ++++++++++++++++++++++++++++++
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  // ++++++++++ check if token is being generated successfully ++++++++++++++++++++++

  if (!accessToken || !refreshToken) {
    throw new apiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while generating tokens"
    );
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { $set: { refreshToken } },
    { new: true }
  ).select("-personalInfo.password -refreshToken");

  if (!updatedUser) {
    throw new apiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while updating user"
    );
  }

  // ++++++++++++++++++++ setting up cookies  ++++++++++++++++++++++++++

  res.cookie("accessToken", accessToken, cookiesOptions);
  res.cookie("refreshToken", refreshToken, cookiesOptions);

  // ++++++++++ send back response ++++++++++++++++++++++++++

  return res
    .status(StatusCodes.OK)
    .json(
      new apiResponse(
        StatusCodes.OK,
        "User logged in successfully",
        updatedUser
      )
    );
});

// ++++++++++++++++++++++++++++++++++ Google Auth Controller ++++++++++++++++++++++++++

// export const googleAuth = asyncHandler(async (req, res) => {
//   const user = req?.user;
//   const accessToken = await user.generateAccessToken();
//   const refreshToken = await user.generateRefreshToken();
//   const updatedUser = await User.findOneAndUpdate(
//     { _id: user._id },
//     { $set: { refreshToken } },
//     { new: true }
//   ).select("-personalInfo.password -refreshToken");

//   if (!updatedUser) {
//     throw new apiError(
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       "Something went wrong while updating user"
//     );
//   }

//   res.cookie("accessToken", accessToken, cookiesOptions);
//   res.cookie("refreshToken", refreshToken, cookiesOptions);

//   return res
//     .status(StatusCodes.OK)
//     .json(
//       new apiResponse(
//         StatusCodes.OK,
//         "Google Authenticated successfully",
//         updatedUser
//       )
//     );
// });

export const googleAuth = asyncHandler(async (req, res) => {
  const user = req?.user;
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { $set: { refreshToken } },
    { new: true }
  ).select("-personalInfo.password -refreshToken");

  if (!updatedUser) {
    throw new apiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while updating user"
    );
  }

  res.cookie("accessToken", accessToken, cookiesOptions);
  res.cookie("refreshToken", refreshToken, cookiesOptions);

  res.redirect(
    `${process.env.FRONTEND_URL}/auth/callback#token=${accessToken}&refreshToken=${refreshToken}&user=${encodeURIComponent(JSON.stringify(updatedUser))}`
  );
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
