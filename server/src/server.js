import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

// Allow localhost:5173 to talk to backend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----- API ROUTES -----

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  console.log("Username:", username);
  console.log("Password:", password);

  res.json({ message: "received register data" });
});

app.post("/login", (req, res) => {
  res.json({ message: "login endpoint" });
});

app.get("/logout", (req, res) => {
  res.json({ message: "logout endpoint" });
});

app.get("/me", (req, res) => {
  res.json({ message: "me endpoint" });
});

// ----------------------

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
