//NPM Packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const app = express();

//Make these static for image upload so browser can process them
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//Project files and routes
const connect = require("./config/db");
const apiRouter =  require('./routes')

//connect to database
connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json())

//connecting routes
app.use('/api', apiRouter)

//Connect Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Your app is running on PORT ${PORT}`);
});
