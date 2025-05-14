import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    if (!connectionInstance) {
      throw Error("DB connection failed");
    }
    console.log(
      "Database connected successfully on host ",
      connectionInstance.connection.host,
      "and db name ",
      mongoose.connection.db.databaseName
    );
    77;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default connectDB;
