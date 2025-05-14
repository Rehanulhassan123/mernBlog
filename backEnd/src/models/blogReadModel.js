import { Schema } from "mongoose";

const blogReadSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    blogId: { type: Schema.Types.ObjectId, ref: "blogs" },
  },
  { timestamps: true }
);

export default mongoose.model("blogReads", blogReadSchema);
