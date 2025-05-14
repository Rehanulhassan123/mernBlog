import express from "express";
import cookieParser from "cookie-parser";
import passport from "./services/passport/passportConfig.js";
import { errorHandler } from "./middleware/errorHandler.js";
import userRouter from "./routes/userRoute.js";
import blogRouter from "./routes/blogRoute.js";
import cors from "cors";

const app = express();

// ++++++++++++++++++++++++++++++++++++ pasing json data middleware ++++++++++++++++++++++++++++++++++++++++

app.use(express.json({ limit: "30kb", strict: true }));

// ++++++++++++++++++++++++++++++++++++  cors middleware ++++++++++++++++++++++++++++++++++++++++++++++++++++

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// +++++++++++++++++++++++++++ parsing urlencoded data +++++++++++++++++++++++++++++++++++++++++++++

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// ++++++++++++++++++++++++++++++++++++++++ cookies  middleware ++++++++++++++++++++++++++++++++++++++

app.use(cookieParser()); //todo enhance the security with signed signature

// ++++++++++++++++++++++++++++++++++++++ passport middleware ++++++++++++++++++++++++++++++++++++++++

app.use(passport.initialize());

// +++++++++++++++++++++++++++++++++++++++ user router +++++++++++++++++++++++++++++++++++++++++++++++

app.use("/api/v1/user", userRouter);
app.use("/api/v1/google", userRouter);

// +++++++++++++++++++++++++++++++++++++ Blog router +++++++++++++++++++++++++++++++++++++++++++++++

app.use("/api/v1/blog", blogRouter);

// +++++++++++++++++++++++++++++ custom error handler middleware +++++++++++++++++++++++++++++++++++++

app.use(errorHandler);

export { app };
