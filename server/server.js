var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";
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
const getAllTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db.query("SELECT * FROM task");
    return response.rows;
});
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield getAllTasks();
        res
            .status(200)
            .json({ message: "Sucessfully fetched tasks", tasks: result });
    }
    catch (error) {
        console.error("Failed to retrive tasks", error);
    }
}));
app.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.query("INSERT INTO task(title) VALUES($1)", [req.body.task]);
        const tasks = yield getAllTasks();
        res
            .status(200)
            .json({ message: "Task was succesfully added", tasks: tasks });
    }
    catch (error) {
        console.error("Failed to add task", error);
        console.log(req.body.task, "TASK FROM INPUT");
    }
}));
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
