const express = require("express")
const academicRoute = express.Router()
const academicController = require("../../controller/student/academicController")

academicRoute.post("/post", academicController.add) 

academicRoute.get("/", academicController.getAll) //add admin authentication to access this route

// academicRoute.get("/", authenticate, academicController.getOne) 

// academicRoute.patch("/update", authenticate, academicController.update)
 
academicRoute.use('/*',(req, res)=>{
    res.send("<h1>404 page not found</h1>");
})

module.exports = academicRoute