const passport = require('passport');
const { studentModel } = require('../../model/student/studentModel.js')

exports.login = async (req,res) => {
    res.sendStatus(200);
}

exports.google = async (req,res) => {
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })(req, res);
}

exports.googleCallback = async (req,res) => {
    
    // add react redirect uri here
    const enrollmentNumber = req.user.enrollmentNumber; // get enrollment number from frontend
    
    const result = await studentModel.findOne({enrollmentNumber})

    if(result) {
        return res.status(200).json(result)
    } else {
        return res.status(400).json({error:"Student not found"})
    }
}

exports.logout = async (req,res) => {
    //logout
    req.logout(function(err) {
        if (err) { return next(err); }
        return res.status(401).json({message: 'Error in Logging out'});
    });
    res.json({message:"Logged out successfully"})
}