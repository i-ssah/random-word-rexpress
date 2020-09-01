const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors")

const PORT = process.env.PORT || 3000;
const words = ["Apple", "Orange", "Banana"];

const app = express();

// MIDDLEWARE

// Setup middleware to log requests
app.use(logger('dev'));

// Set Allow Cross Origin Header to allow any origin to make requests
app.use(cors());

// Setup middleware to automatically parse JSON
app.use(bodyParser.json());

// CONTROLLERS

// Handle a get request
app.get("/words/random", (request, response) => {
  const word = words[Math.floor(Math.random() * words.length)];
  response.send({
    word
  })
})

app.post("/words", (request, response) => {
  const word = request.body.word;
  if (typeof word != "string") {
    throw new Error("Please provide a word in your request")
  }

  if (words.indexOf(word) != -1) {
    throw new Error(`The word ${word}" is already registered`);
  }

  words.push(word);
  response.sendStatus(201);
});

// If no other routes match, serve static files from public
app.use(express.static(__dirname + "/public"))

// STARTUP
app.listen(PORT, () => {
  console.log (`App started listening on port ${PORT}`);
})