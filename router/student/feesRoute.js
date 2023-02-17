const express = require("express")
const feesRoute = express.Router()
const upload = require("../../utils/pdfs");
const feesController = require("../../controller/student/feesController")
// const authenticate = require("../middleware/authenticate")

feesRoute.post("/post", upload.single('file'), feesController.add)

feesRoute.get("/", feesController.getAll)

// feesRoute.get("/getAll", feesController.getAll) //add admin authentication to access this route

// feesRoute.get("/", authenticate, feesController.getOne)

// feesRoute.patch("/update", authenticate, feesController.update)

module.exports = feesRoute