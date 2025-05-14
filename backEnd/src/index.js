import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/connectDB.js";

console.log(process.env.PORT);

connectDB()
  .then(() => {
    try {
      app.listen(process.env.PORT || 8000, () => {
        console.log("App connected Successfully on port", process.env.PORT);
      });
    } catch (error) {
      console.log("App server connection failed", error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.log("DB connection failed", error);
    process.exit(1);
  });
