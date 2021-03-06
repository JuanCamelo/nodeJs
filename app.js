const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const logger = require("./config/logsConfig");
const db = require("./infrastucture/postgresDB");

const adParameterRoutes = require("./routes/adParametersRoutes");
const adMenuRoutes = require("./routes/adMenuRoutes");
const adMenuOptionRoutes = require("./routes/adMenuOptionRoutes");
const adCoutryRoutes = require("./routes/adCountryRoutes");
const adTaxIDTypeRoutes = require("./routes/adTaxIDTypeRoutes");
const adRegionRoutes = require("./routes/adRegionRoutes");
const adClientGroupRoutes = require("./routes/adClientGroupRoutes")
const adCityRoutes = require("./routes/adCityRoutes");
const adClientRoutes = require("./routes/adClientRoutes");
const adModuleRoutes = require("./routes/adModuleRoutes");
const adRoleRoutes = require("./routes/adRoleRoutes");
const adClientModuleRoutes = require("./routes/adClientModuleRoutes");
const adLocation = require("./routes/adLocationRoutes") 
const adWindowRole = require("./routes/adWindowRoleRoutes")
const adUser = require("./routes/adUserRoutes")
const adWindowRoutes = require("./routes/adWindowRoutes");
const adProcessRoutes = require("./routes/adProcessRoutes");
const adProcessRoleRoutes = require("./routes/adProcessRoleRoutes")

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
  response.json({ info: "Stam Suite Administration Module service is running..." });
});

/* Routes middleware */

app.use(adParameterRoutes);
app.use(adMenuRoutes);
app.use(adMenuOptionRoutes);
app.use(adRegionRoutes);
app.use(adCoutryRoutes);
app.use(adTaxIDTypeRoutes);
app.use(adClientGroupRoutes);
app.use(adCityRoutes);
app.use(adClientRoutes);
app.use(adModuleRoutes);
app.use(adRoleRoutes);
app.use(adClientModuleRoutes);
app.use(adWindowRoutes);
app.use(adLocation);
app.use(adWindowRole);
app.use(adUser)
app.use(adProcessRoutes);
app.use(adProcessRoleRoutes);


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

