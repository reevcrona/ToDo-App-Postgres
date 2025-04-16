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
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db.query("SELECT * FROM task");
    console.log(result.rows);
    res.send(result.rows[0].title);
}));
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
