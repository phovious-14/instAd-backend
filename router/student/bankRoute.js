const express = require("express")
const bankRoute = express.Router()
const bankController = require("../../controller/student/bankController")

bankRoute.post("/post", bankController.add) 

bankRoute.get("/", bankController.getAll) //add admin authentication to access this route

// bankRoute.get("/", authenticate, bankController.getOne) 

// bankRoute.patch("/update", authenticate, bankController.update)
 
bankRoute.use('/*',(req, res)=>{
    res.send("<h1>404 page not found</h1>");
})

module.exports = bankRoute