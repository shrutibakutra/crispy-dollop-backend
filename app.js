const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
const company = require('./routes/company')
const employee = require('./routes/employee')
const fs = require("fs");
const http = require("http");
const path = require("path");
const cors = require('cors')

mongoose.Promise = global.Promise;

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json("Welcome to shruti's app.");
});

// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});
app.use(cors())
    // put the HTML file containing your form in a directory named "public" (relative to where this script is located)
app.get("/", express.static(path.join(__dirname, "./storage/app/public")));

app.use('/', company)
app.use('/', employee)