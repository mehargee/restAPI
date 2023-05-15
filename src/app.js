const express = require("express");
require("./db/conn");
const Student = require("./models/students");

const app = express();
const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//     res.send("hello data is get/read/home");
// })

app.use(express.json());

// create new students

// app.post("/students", (req, res) => {
//     // console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(() => {
//         res.status(201).send(user);
//         console.log("student register suscessfully")
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
// })

// create student using async await and try catch method

app.post("/students", async (req, res) => {
    // console.log(req.body);
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }
    catch (error) {
        res.status(400).send(error);
    }
})

// read data of registered students
app.get("/students", async (req, res) => {

    try {
        const studentsData = await Student.find();
        res.send(studentsData);
        console.log(studentsData);
    } catch (error) {
        res.send(error);
    }
})

// get indivisual Student data using id 
app.get("/students/:id", async (req, res) => {

    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);  //key value 
        console.log(studentData);

        if (!studentData) {
            return res.status(404).send();
        } else {
            res.send(studentData);
        }
    }
    catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
})

//get student data by student name

// app.get("/students/:name", async (req, res) => {
//     try {
//         const name = req.params.name;
//         const studentData = await Student.findOne( name ); //key valu ({name:name})
//         console.log(studentData);

//         if (!studentData) {
//             return res.status(404).send();
//         } else {
//             res.send(studentData);
//         }
//     } catch (error) {
//         res.status(500).send(error);
//         console.log(error);
//     }
// });

// update the student by its ID
app.patch("/students/:id", async (req, res) => {

    try {
        const _id = req.params.id;                                        //new mean show new data
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body, { new: true });  //key value _id,  
        console.log(updateStudent);

        if (!updateStudent) {
            return res.status(404).send();
        } else {
            res.send(updateStudent);
        }
    }
    catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
})

//delete student records by ID 
app.delete("/students/:id", async (req, res) => {

    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        console.log("record deleted sucessfully");

        if (!deleteStudent) {
            return res.status(404).send();
        } else {
            res.send(deleteStudent);
        }
    }
    catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
})


app.listen(port, () => {
    console.log(`server is sucessfull at ${port}`);
})