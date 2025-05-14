import express from "express";
import {
  registerUser,
  loginUser,
  googleAuth,
} from "../controllers/userController.js";
import {
  authenticateJWT,
  authenticateGoogle,
} from "../middleware/passportAuthenticate.js";
import passport from "../services/passport/passportConfig.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get", authenticateJWT, (req, res) => res.send(req.user));
router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get("/callback", authenticateGoogle, googleAuth);

export default router;
