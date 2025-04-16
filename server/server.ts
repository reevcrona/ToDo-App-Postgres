import express from "express";
import pg from "pg";
import dotenv from "dotenv";

const { Client } = pg;
dotenv.config();

const db = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: 5433,
  database: "todo",
});

const app = express();

const port = 3000;

db.connect();

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM task");
  console.log(result.rows);
  res.send(result.rows[0].title);
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
