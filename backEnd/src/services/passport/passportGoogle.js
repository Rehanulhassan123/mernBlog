import passport from "passport";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import User from "../../models/userModel.js";

export const GoogleStrategy = () => {
  return passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          let user = await User.findOne({
            "personalInfo.email": profile.emails[0].value,
          });

          if (!user) {
            user = await User.create({
              googleId: profile.id,

              personalInfo: {
                userName: profile.displayName,
                profile_img: profile.photos[0].value,
                email: profile.emails[0].value,
              },
              google_auth: true,
            });

            await user.save({ validateBeforeSave: false });
          }

          return done(null, user);
        } catch (error) {
          console.error("Error:", error); // Log the error
          return done(error, false); // Pass the error to the done callback
        }
      }
    )
  );
};
