import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogs",
    required: function () {
      return !this.commentId; // Required if commentId is NOT provided
    },
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
    required: function () {
      return !this.blogId; // Required if blogId is NOT provided
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
});
