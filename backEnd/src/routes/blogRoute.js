import { createBlog } from "../controllers/blogController.js";
import { authenticateJWT } from "../middleware/passportAuthenticate.js";
import { validateBlogPost } from "../middleware/validateBlog.js";
import { upload } from "../middleware/multer.js";
import express from "express";

const router = express.Router();

router.route("/create").post(
  authenticateJWT,
  upload.fields([
    {
      name: "banner",
      maxCount: 1,
    },
  ]),
  validateBlogPost,
  createBlog
);

export default router;
