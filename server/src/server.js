import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./utils/passportConfig.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(session({
  name: "sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true, 
    secure: false, 
    maxAge: 24*60*60*1000 
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api", todoRoutes);

app.get("/", (req, res) => res.json({ message: "API is alive!" }));

const port = process.env.SERVERPORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));