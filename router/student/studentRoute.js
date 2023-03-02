const express = require("express")
const studentRoute = express.Router()
const studentController = require("../../controller/student/studentController")

studentRoute.get("/:walletAddress", studentController.getOne)

studentRoute.post("/add", studentController.add)

studentRoute.use('/*', (req, res)=>{
    res.send("<h1>404 page not found</h1>");
})

// studentRoute.delete("/:en", studentController.delete) // need to add admin authentication, this route used to delete student by admin

module.exports = studentRoute