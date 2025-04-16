import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("yo");
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
