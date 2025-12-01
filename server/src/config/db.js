// src/config/db.js
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the directory of the current module (this file)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Build absolute path to .env (three levels up from src/config/db.js)
const envPath = join(__dirname, "..", "..", "..", ".env");

// Load .env with absolute path — NO MORE GUESSING
dotenv.config({ path: envPath });

import pg from "pg";

console.log("Loading .env from:", envPath);           // ← YOU WILL SEE THE REAL PATH
console.log("DB Password loaded:", !!process.env.DATABASEPASSWORD); // ← true = success

const db = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASEPASSWORD,
  port: process.env.DATABASEPORT,
});

await db.connect();
console.log("Connected to the database");

export default db;