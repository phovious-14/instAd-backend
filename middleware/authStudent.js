const authCheck = (req, res, next) => {
    if(!req.user){ // 
        return res.status(401).json({error:"Unauthorized user"})
    }
    next();
}

module.exports = authCheck;