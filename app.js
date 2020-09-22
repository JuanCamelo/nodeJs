const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const logger = require("./config/logsConfig");
const db = require("./infrastucture/postgresDB");


if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

logger.initLogger();
db.initPoolDB();

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(logger.middleware);

app.get("/", (request, response) => {
  response.json({ info: "StamSM service running..." });
});

/* Routes middleware */

app.use(function (req, res, next) {
  res.status(404).send("Sorry, can't find that!");
});

/* Start the server */
var server = app.listen(process.env.PORT || 8080, () => {
  console.log(`The serve starts at  http://localhost:${process.env.PORT}`);
});

process.on("SIGTERM", () => {
  db.endPoolDB();
  console.info("SIGTERM signal received.");
  server.close();
});

process.on("SIGINT", () => {
  db.endPoolDB();
  console.info("SIGINT signal received.");
  server.close();
});
