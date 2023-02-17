const feesModel = require("../../model/student/feesModel")
const { studentModel } = require("../../model/student/studentModel")
const { fileValidation, feesFieldsValidation } = require('../../validation/feesValidation')
const cloudinary = require("../../services/cloudinary");
const upload = require("../../utils/pdfs");

exports.add = async (req,res) => {

    try {

        //get error from middleware while uploading utils/pdfs, extension error
        if(req.err1){
            return res.status(415).json({error: req.err1});
        }
        
        //get error from middleware while uploading utils/pdfs, size error
        if(req.err2){
            return res.status(415).json({error: req.err2});
        }

        //get variables
        const enNo = req.user.enrollmentNumber;
        const { DUINumber, semester } = req.body;

        //validate file or not
        const fileError = fileValidation(req.file)
        
            // Error in response
            if(fileError){
                return res.status(400).json({error:"upload file!"});
            }

        //validate fields like enno, duinumber, semester
        const fieldError = feesFieldsValidation(req.body)
        
            // Error in response
            if(fieldError){
                return res.status(400).json({error:fieldError.details[0].message});
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
        feesModel.findOneAndUpdate({ enNo }, {

            $push: {
                paymentAndFees: {
                    paymentRecieptURLs: {
                        pdfUrl: result.secure_url,
                        cloudinary_id: result.public_id
                    },
                    date:currentDate,
                    DUINumber,
                    semester
                }
            },
            enNo

        }, { upsert:true }, (err) => {
            if(err) {
                return res.status(400).json({error: "Something went wrong"});
            }
            else{
                return res.status(200).json({messege: "Details added successfully"});
            }
        });

    } catch(err) {
        console.log(err);
        return res.status(500).json({error:"Internal server error"})
    }
}

exports.getAll = async (req,res) => {
    
    const result = await feesModel.find({})

    if(result){
        return res.status(200).json(result)
    }else{
        return res.status(400).json({error:"Data not found"})
    }
}

// exports.getOne = async (req,res) => {
//     const en = req.userEnNo;

//     const result = await feesModel.find({ enNo:en })
//     res.status(200).json(result)
// }