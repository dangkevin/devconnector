const express = require("express");
const mongoose = require("mongoose");
const app = express();

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  //Upon successfully connecting to the DB
  .then(() => console.log("MongoDB Connected"))
  //If not, error
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Helsdaslo!"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
