require("dotenv").config();

const express = require("express");
const app = express();
const user = require("./controllers/mainController");
const log = require("./controllers/logController");
const sequelize = require("./db");
const bodyParser = require("body-parser");

sequelize.sync();

app.use(bodyParser.json());
app.use(require("./middleware/headers"));

app.use("/api/user", user);

app.use(require("./middleware/validateSession"));
app.use("/api/log", log);


app.listen(3000, function() {
    console.log("Server is working on 3000.")
});