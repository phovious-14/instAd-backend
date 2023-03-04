const express = require("express")
const studentRoute = express.Router()
const studentController = require("../../controller/student/studentController")

studentRoute.get("/fetchcompany", studentController.fetch)

studentRoute.get("/:companyWalletAddress", studentController.getOne)

studentRoute.post("/addcompany", studentController.insert)

studentRoute.post("/addAd", studentController.add)

studentRoute.use('/*', (req, res)=>{
    res.send("<h1>404 page not found</h1>");
})

// studentRoute.delete("/:en", studentController.delete) // need to add admin authentication, this route used to delete student by admin

module.exports = studentRoute