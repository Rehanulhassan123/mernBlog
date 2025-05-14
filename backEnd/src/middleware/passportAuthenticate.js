import passport from "../services/passport/passportConfig.js";

export const authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    return next(); // Ensure next() is called
  })(req, res, next); // Invoke passport.authenticate
};

export const authenticateGoogle = (req, res, next) => {
  passport.authenticate(
    "google",
    { session: false },
    async (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: "Unauthorized" });
      req.user = user;
      return next();
    }
  )(req, res, next); // immediately invoked
};
