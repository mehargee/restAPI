const mongoose = require("mongoose");

//create and connetion of database // mongodb://localhost:27017 // mongodb://0.0.0.0:27017
mongoose.connect('mongodb://0.0.0.0:27017/students-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("connection is sucessful");
  }).catch((e) => {
    console.log("No connection");
  })

  