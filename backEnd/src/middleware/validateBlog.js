import Joi from "joi";
import { asyncHandler } from "../utils/asyncHandler.js";

// Joi Schema
export const blogPostSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title is required",
  }),
  description: Joi.string().max(200).required().messages({
    "string.empty": "Description is required",
    "string.max": "Description must be at most 200 characters",
  }),
  tags: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Tags must be an array of strings",
  }),
  content: Joi.string().required().messages({
    "array.base": "Content is required",
    "any.required": "Content is required",
  }),
  draft: Joi.boolean().optional(),
});

export const validateBlogPost = asyncHandler(async (req, res, next) => {
  await blogPostSchema.validateAsync(req.body);
  next();
});
