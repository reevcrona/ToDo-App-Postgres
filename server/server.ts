import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";
import { Task } from "./types/taskType";

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
const corsOptions = {
  origin: ["http://localhost:5173"],
};
db.connect();
app.use(express.json());
app.use(cors(corsOptions));

const getAllTasks = async () => {
  const response = await db.query("SELECT * FROM task");
  return response.rows;
};

app.get("/", async (req, res) => {
  try {
    const result = await getAllTasks();
    res
      .status(200)
      .json({ message: "Sucessfully fetched tasks", tasks: result });
  } catch (error) {
    console.error("Failed to retrive tasks", error);
  }
});

app.post("/add", async (req, res) => {
  try {
    await db.query("INSERT INTO task(title) VALUES($1)", [req.body.task]);
    const tasks = await getAllTasks();
    res
      .status(200)
      .json({ message: "Task was succesfully added", tasks: tasks });
  } catch (error) {
    console.error("Failed to add task", error);
    console.log(req.body.task, "TASK FROM INPUT");
  }
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
