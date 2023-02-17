const express = require("express")
const route = express.Router()
const controller = require("../controller/userController")
const authenticate = require("../middleware/authenticate")
const { validateUser } = require("../model/userModel")

route.post("/", (req,res) => {

    // Validate a user
    res.send("hi")


});

route.post("/user/signup", controller.signup)

route.post("/user/login", controller.login)

route.get("/user/about", authenticate, controller.about)

route.get("/user/logout", controller.logout)

route.get("/user", controller.user)
 
module.exports = route