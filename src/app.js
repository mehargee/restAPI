const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const studentRouter = require("./routers/student");

const app = express();
const port = process.env.PORT || 3000;

// add middleware for all data in json format 
app.use(express.json());

// see this point in student.js file
//1. create a new Express router
//2. we need define a router

//3. we need to register our router
app.use(studentRouter);


app.listen(port, () => {
    console.log(`server is sucessfull at ${port}`);
})
