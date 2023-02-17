const express = require("express");
const passport = require("passport");
const route = express.Router()
const authController = require("../../controller/student/authController")

route.get("/login", authController.login);

route.get("/google", authController.google);

route.get("/google/callback", passport.authenticate('google'), authController.googleCallback);

route.get("/logout", authController.logout);

module.exports = route;