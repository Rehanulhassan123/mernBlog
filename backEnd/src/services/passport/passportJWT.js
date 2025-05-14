import User from "../../models/userModel.js";
import { cookieExtractor } from "../../middleware/cookieExtractor.js";
import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt";

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

export const JWTStrategy = (passport) => {
  return passport.use(
    new jwtStrategy(opts, async (jwtPayload, done) => {
      try {
        let user = await User.findById(jwtPayload._id).select(
          "-personalInfo.password -refreshToken"
        );
        if (user) {
          return done(null, user);
        } else {
          return done(null, false); // If no user is found
        }
      } catch (error) {
        console.error("Error:", error); // Log the error
        return done(error, false); // Pass the error to the done callback
      }
    })
  );
};
