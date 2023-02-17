const { studentModel } = require('../../model/student/studentModel.js')
const cloudinary = require("../../services/cloudinary.js");
const validateStudent = require('../../validation/studentValidation')
const upload = require("../../utils/images");

exports.add = async (req, res) => {
    const { enrollmentNumber, instituteEmail, fullName, googleId } = req.body
    const isExist = await studentModel.findOne({ enrollmentNumber })
    if(!isExist) {
        var userDetails = new studentModel({
         enrollmentNumber, instituteEmail, fullName, googleId
        });
        console.log(userDetails);
        userDetails.save((err, doc) => {
            if (!err) {
                res.json({data: 'added'}).status(200)
            }
            else {
                console.log('Error during record insertion : ' + err);
            }
        })
    } else {
        res.json({data: 'data already exist'})
    }
}

exports.update = async (req, res) => {

    //validate schema of student
    const error = validateStudent(req.body)

        // Error in response
        if (error) {
            return res.status(400).json({error:error.details[0].message});
        }

    //get errors from multer middleware while uploading image
    if(req.profileImageErr1){
        return res.status(415).json({error: req.profileImageErr1});
    }
    
    if(req.profileImageErr2){
        return res.status(415).json({error: req.profileImageErr2});
    }

    const { personalEmail, fatherEmail, fullName, motherName, motherEmail, bloodGroup, gender, dob, aadharNumber, religion, nationality, caste, reserveCategory, personWithDisability, personalMobileNo, parentMobileNo, addressLine_1, addressLine_2, taluka, district, state, pincode, country } = req.body

    //check personalEmail already exist or not
    const isEmailExist = await studentModel.findOne({ personalEmail })

        if(isEmailExist){
            return res.status(400).json({error:"Personal email already exists"})
        }

    //get current date with formatting yyyy-mm-dd
    let currentDate = new Date(dob)

    // send chosen image to cloudinary api and store uploaded image url in db
    var result = {};
    
    //check if student exist
    let data = await studentModel.findOne({ enrollmentNumber }) 

        // if student doesn't exist
        if(data == null) {
            data = {}
            data.address = {}
        }

        //if address is not empty than reassign it to data.address
        if(addressLine_1 !== undefined) {
            data.address.addressLine_1 = addressLine_1
        }
        if(addressLine_2 !== undefined) {
            data.address.addressLine_2 = addressLine_2
        }
        if(taluka!== undefined) {
            data.address.taluka = taluka
        }
        if(district !== undefined) {
            data.address.district = district
        }
        if(state !== undefined) {
            data.address.state = state                        
        }
        if(pincode !== undefined) {
            data.address.pincode = pincode                      
        }
        if(country !== undefined) {
            data.address.country = country                    
        }             

        // //if image is not empty than reassign it to result
        // if(data.photo) {
        //     result.secure_url = data.photo.avatar
        //     result.public_id = data.photo.cloudinary_id
        // } else {        
        //     //else create new one 
        //     if(!req.file) {
        //         return res.status(400).json({error:"Please upload an image"})
        //     }
        //     result = await cloudinary.uploader.upload(req.file.path);            
        // }

        //find by enrollment number and update it, if it doesn't exist then create new one it by {upsert:true}, if it exists then update it, 
        studentModel.findOneAndUpdate(
            { enrollmentNumber }, //for filter
            { 
                enrollmentNumber, instituteEmail, personalEmail, fatherEmail, fullName, motherName, motherEmail, bloodGroup, gender, dob:currentDate, aadharNumber, religion, nationality, caste, reserveCategory, personWithDisability, personalMobileNo, parentMobileNo,
                address:data.address,
                // photo:{
                //     avatar: result.secure_url,
                //     cloudinary_id: result.public_id
                // }
            },{upsert : true},
            (err)=>{
                if(err){
                    res.status(400).json({error:"Something went wrong"})
                } else {
                    res.status(200).json({message:"Student updated successfully"})
                }
            }
        )
            

}

// exports.delete = async (req,res) => {

//     const en = req.userEnNo;
    
//     const result = await studentModel.deleteMany({ enrollmentNumber:en })
//     res.status(200).json(result)
// // }

exports.getOne = async (req,res) => {
    const enrollmentNumber = req.enrollmentNumber; // get enrollment number from frontend
    
    const result = await studentModel.findOne({enrollmentNumber})

    if(result) {
        return res.status(200).json(result)
    } else {
        return res.status(400).json({error:"Student not found"})
    }
}

exports.getAll = async (req,res) => {
    
    const result = await studentModel.find({})

    if(result){
        return res.status(200).json(result)
    } else {
        return res.status(400).json({error:"Student not found"})
    }
}

exports.login = async (req, res) => { // login through institute email
    try{
        const { enrollmentNumber, password } = req.body

        if(!enrollmentNumber || !password){
            res.status(403).json({error:"Please fillup details"})
        }
        else{

            const studentExist = await studentModel.findOne({enrollmentNumber})
            
            if(studentExist){
                    
                const isMatch = await bcrypt.compare(password, studentExist.password)
                
                if(isMatch){                 

                    const token = await studentExist.genAuthToken()
                    res.cookie("jwtoken", token, {
                        expires:new Date( Date.now() + 60*60*1000 ), // set jwt for 1 hour
                        httpOnly:true
                    }).status(200).json({messege:"Token-cookie generated"}) 

                }
                else{
                    res.status(403).json({error:"Invalid credentials"})
                }                

            } else {
                res.status(403).json({error:"Invalid credentials"})
            }

        }

    }catch(err){
        res.send(err)
    }
}