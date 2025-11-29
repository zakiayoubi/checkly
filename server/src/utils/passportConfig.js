// src/utils/passportConfig.js
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import db from "../config/db.js";

passport.use("local", new Strategy(
  { usernameField: "email" },
  async (email, password, cb) => {
    console.log(email, password)
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      if (result.rows.length === 0) return cb(null, false);

      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) return cb(null, false);

      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));

passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser(async (id, cb) => {
  try {
    const result = await db.query("SELECT id, fname, lname, email FROM users WHERE id=$1", [id]);
    cb(null, result.rows[0]);
  } catch (err) {
    cb(err);
  }
});

export default passport;