const bcrypt = require("bcryptjs")
const userModel = require("../model/userModel")

exports.signup = async (req,res) => {

    try{

        const { name, email, password, cpassword } = req.body

        if(!name || !email || !password || !cpassword){
            res.status(403).send("fields are necessary")  
        }
        else{

            if(password === cpassword){

                const userExist = await userModel.findOne({email})
                if(userExist){
                    res.status(401).json({message:"user is exist"})
                }
                else{
                    const user = new userModel({
                        name,
                        email,
                        password,
                    })

                    user.save((data)=>{
                        res.json({message:"user registered successfully"})
                    })
                    return res.status(200)
                }  
            }
            else{
                res.status(400).json({message:"password not matches to confirm password"})
            }
        }
    }catch(err){
        res.send(err)
    }
}

exports.login = async (req,res) => {
    try{

        const {email,password} = req.body

        if(!email || !password){
            res.status(400).json({msg:"Plz fillup form"})
        }
        else{

            const userExist = await userModel.findOne({email})

            if(userExist){
                    
                const isMatch = await bcrypt.compare(password,userExist.password)
                if(isMatch){                      

                    const token = await userExist.genAuthToken()
                    res.cookie("jwtoken",token,{
                        expires:new Date(Date.now()+60000),
                        httpOnly:true
                    }).status(200).json({msg:"Token-cookie generated"}) 
                }
                else{
                    res.status(400).json({msg:"Invalid credentials"})
                }

            }else{
                res.status(400).json({msg:"Invalid credentials"})
            }

        }

    }catch(err){
        res.send(err)
    }
}

exports.about = (req,res) => {
    res.status(200).send(req.rootUser)
}

exports.logout = (req,res) => {
    res.clearCookie("jwtoken",{path:"/"})
    res.status(200).json({msg:"logout"})
}

exports.user = (req,res) => {
    userModel.find()
    .then((data)=>{
        res.status(200).json(data)
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
}