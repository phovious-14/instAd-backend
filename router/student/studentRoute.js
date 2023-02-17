const express = require("express")
const studentRoute = express.Router()
const studentController = require("../../controller/student/studentController")
const upload = require("../../utils/images");
const activityPointsRoute = require("./activityPointsRoute")
const academicRoute = require("./academicRoute")
const feesRoute = require("./feesRoute")
const googleAuth = require("./google-auth")
const bankRoute = require('./bankRoute')

// studentRoute.post("/login", studentController.login)



studentRoute.get("/", studentController.getAll)

studentRoute.get("/getOne", studentController.getOne)

studentRoute.post("/add", studentController.add)

studentRoute.post("/", upload.single('image'), studentController.update)


//sub routes

studentRoute.use('/bankData', bankRoute)

studentRoute.use('/activityPoints', activityPointsRoute)

studentRoute.use('/academicInfo', academicRoute)

studentRoute.use('/fees', feesRoute)
 
studentRoute.use('/*', (req, res)=>{
    res.send("<h1>404 page not found</h1>");
})

// studentRoute.delete("/:en", studentController.delete) // need to add admin authentication, this route used to delete student by admin

module.exports = studentRoute