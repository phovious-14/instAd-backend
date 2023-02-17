const express = require("express")
const activityPointsRoute = express.Router()
const upload = require("../../utils/pdfs");
const activityPointsController = require("../../controller/student/activityPointController")

activityPointsRoute.post("/post", upload.single('file'), activityPointsController.add)

activityPointsRoute.get("/", activityPointsController.getAll)

module.exports = activityPointsRoute