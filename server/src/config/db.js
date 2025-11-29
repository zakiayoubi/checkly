// src/config/db.js
import pg from "pg";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

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