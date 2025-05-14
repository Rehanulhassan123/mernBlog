import mongoose, { Schema } from "mongoose";

const blogSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      unique: true,
      index: true,
    },
    banner: {
      type: String,
      default: "",
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 200,
    },
    tags: {
      type: [String],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    totalReads: {
      type: Number,
      default: 0,
    },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "users" }],

    draft: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "publishedAt",
      updatedAt: "updatedAt",
    },
  }
);

export default mongoose.model("blogs", blogSchema);
