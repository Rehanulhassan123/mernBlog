import passport from "passport";
import { JWTStrategy } from "./passportJWT.js";
import { GoogleStrategy } from "./passportGoogle.js";

let isInitialized = false;

export const initializePassport = () => {
  if (isInitialized) return;

  isInitialized = true;
  JWTStrategy(passport);
  GoogleStrategy(passport);
};

initializePassport();

export default passport;
