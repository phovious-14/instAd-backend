const jwt = require("jsonwebtoken")
const studentModel = require("../model/student/studentModel")

const authenticate = async (req,res,next) => {
    try {

        const token = req.cookies.jwtoken   // get token from cookie
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY) // verify token

        const rootUser = await studentModel.findOne({_id:verifyToken._id, "tokens.token":token}) // find user with token
        if(!rootUser){ throw new Error("unauthorized user") } // if user not found

        req.token = token // add token to request
        req.rootUser = rootUser // getting whole documetn of student 
        req.userEnNo = rootUser.enrollmentNumber // getting enrollment number of student

        next()

    } catch (error) {
        res.status(403).send("unauthorized token provided")
    }
}

module.exports = authenticate