import express from "express";
import passport from "../utils/passportConfig.js";
import { register, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ success: true, message: "Login successful" });
});
router.post("/logout", logout);

export default router;