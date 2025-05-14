import { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
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
    commentedBy: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "users",
    },
    isReply: {
      type: Boolean,
      default: false,
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
      updatedAt: "updatedAt",
    },
  }
);

export default mongoose.model("comments", commentSchema);
