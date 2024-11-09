import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema(
  {
    blog_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "blogs",
    },

    comment: {
      type: String,
      required: true,
    },
    children: {
      type: [Schema.Types.ObjectId],
      ref: "comments",
      default: [],
    },
    commented_by: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "users",
    },
    isReply: {
      type: Boolean,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "comments",
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "commentedAt",
    },
  }
);

export default mongoose.model("comments", commentSchema);
