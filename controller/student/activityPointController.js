const {activityPointsModel} = require('../../model/student/activityPointModel')
const cloudinary = require("../../services/cloudinary");
const upload = require("../../utils/pdfs");
const validateActivities = require('../../validation/activityPointsValidation')
const { studentModel } = require('../../model/student/studentModel.js')

exports.add = async (req, res) => { 

    try {    

        //get error from middleware while uploading utils/pdfs, extension error
        if(req.err1){
            return res.status(415).json({error: req.err1});
        }
        
        //get error from middleware while uploading utils/pdfs, size error
        if(req.err2){
            return res.status(415).json({error: req.err2});
        }

        //get enrollment number
        const enNo = req.user.enrollmentNumber;

        if(!enNo){
            return res.status(400).json({error:"Enrollment number is required"})
        }
        
        //validate file or not
        const error = validateActivities(req.file)
        
            // Error in response
            if(error){
                return res.status(400).json({error:"upload file!"});
            }

        //get current date with formatting yyyy-mm-dd
        const currentDate = new Date().toISOString().slice(0, 10);

        //check if student exist in student model or not
        const isStudentExist = await studentModel.findOne({ enrollmentNumber: enNo });

            //if student doesn't exist than throw error
            if(!isStudentExist) {
                return res.status(400).json({error: "Student does not exist"});
            }
        
        //upload file on cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        
        //find by enrollment number, than push activity in array,if no enrollment number found than create new object and push activity by {upsert:true}
        //if any error occur than handle it through last argument of findOneAndUpdate()
        activityPointsModel.findOneAndUpdate({enNo},{

            $push:{
                activities:
                {
                    activityURLs: {
                        pdfUrl: result.secure_url,
                        cloudinary_id: result.public_id
                    },
                    date:currentDate
                }
            },
            enNo: req.body.enNo

        }, { upsert:true },
        (err) => {
            if(err) {
                return res.status(400).json({error: "Something went wrong"});
            }
            else{
                return res.status(200).json({messege: "Activity added successfully"});
            }
        });

        
        
    } catch (err) {
        console.log(err);
        res.status(400).json({error:"error in uploading"})
    }
}

exports.getAll = async (req,res) => {
    
    const result = await activityPointsModel.find({})

    if(result){
        return res.status(200).json(result)
    }else{
        return res.status(400).json({error:"Data not found"})
    }
}