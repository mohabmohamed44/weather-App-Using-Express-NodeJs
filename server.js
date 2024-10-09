// express
const express = require("express");
const app = express();

// cors
const cors = require("cors");
app.use(cors());

// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup empty JS object to act as endpoint
let projectData = {};

// Initialize the main project folder
app.use(express.static("website"));

// Callback function to complete GET '/all'
const getAll = (req, res) => {
  res.status(200).send(projectData);
};

// Get Route
app.get('/all', getAll);

// Callback function to complete POST '/add'
const postData = (req, res) => {
  projectData = req.body;
  console.log(projectData); // For testing and debugging
  res.status(200).send(projectData);
};

// Post Route
app.post('/add', postData);

// Port connection
const port = 8080;
const hostName = "127.0.0.1";

// Function to test the server
const listening = () => {
  console.log(`Server running at http://${hostName}:${port}/`);
};

// Spin up the server
app.listen(port, listening);
