const express = require("express");
const Student = require("../models/students");
//1. create a new Express router
const router = new express.Router();

//2. we need define a router

// create new students usin then catch method

// router.post("/students", (req, res) => {
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

router.post("/students", async (req, res) => {
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
router.get("/students", async (req, res) => {

    try {
        const studentsData = await Student.find();
        res.send(studentsData);
        console.log(studentsData);
    } catch (error) {
        res.send(error);
    }
})

// get indivisual Student data using id 
router.get("/students/:id", async (req, res) => {

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

// router.get("/students/:name", async (req, res) => {
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
router.patch("/students/:id", async (req, res) => {

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
router.delete("/students/:id", async (req, res) => {

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



module.exports = router;