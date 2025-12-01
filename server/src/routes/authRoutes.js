import express from "express";
import passport from "../utils/passportConfig.js";
import { register, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", passport.authenticate("local", { failWithError: true }), (req, res) => {
  res.json({ success: true, message: "Login successful" });
}, 
(err, req, res, next) => {
    // Failure — this runs when passport says "wrong password"
    res.json({ success: false, message: "Invalid email or password" });
  }
);
router.post("/logout", logout);

export default router;