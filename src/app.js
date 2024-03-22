const express = require("express");
const { config } = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
config();

const taskRoutes = require("./routes/task.routes");

const app = express();
app.use(bodyParser.json());

//DB
mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.DB_NAME,
});
const db = mongoose.connection;

app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
