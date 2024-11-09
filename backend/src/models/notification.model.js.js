import mongoose, { Schema } from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "like",
        "comment",
        "reply",
        "dislike",
        "reply",
        "follow",
        "unfollow",
      ],
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,

      ref: "blogs",
      required: function () {
        return ["comment", "reply", "like", "dislike"].includes(this.type);
      },
    },
    notification_for: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "comments",
      required: function () {
        return ["comment", "reply", "like", "dislike"].includes(this.type);
      },
    },
    isReply: {
      type: Boolean,
      required: function () {
        return this.type === "reply";
      },
    },
    message: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("notification", notificationSchema);
