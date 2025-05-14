import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["comment", "reply", "follow", "unfollow", "like", "dislike"],
    required: true,
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
    required: function () {
      return ["comment", "reply"].includes(this.type);
    },
  },
  likeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "likes",
    required: function () {
      return ["like", "dislike"].includes(this.type);
    },
    W,
  },
  notificationFor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
    index: true,
  },
  notificationBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

export default mongoose.model("notifications", notificationSchema);
