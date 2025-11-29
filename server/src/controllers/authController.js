// src/controllers/authController.js
import bcrypt from "bcrypt";
import db from "../config/db.js";

const saltRounds = 10;

export async function register(req, res) {
  const { fname, lname, email, password } = req.body;

  try {
    const check = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (check.rows.length > 0) {
      return res.json({ success: false, message: "Email already exists." });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    await db.query(
      "INSERT INTO users(fname, lname, email, password) VALUES ($1,$2,$3,$4)",
      [fname, lname, email, hash]
    );

    res.json({ success: true, message: "User registered!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export function logout(req, res) {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("sid");
      res.json({ success: true, message: "Logged out" });
    });
  });
}