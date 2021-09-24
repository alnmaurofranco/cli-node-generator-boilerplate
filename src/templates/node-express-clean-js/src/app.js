const express = require("express");
const cors = require("cors");

const { router } = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use(router);

module.exports = { app };
