import express from "express";
import morgan from "morgan";

const port = process.env.PORT || 8000;
const app = express();

// Logging middleware
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
