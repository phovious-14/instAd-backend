const bankModel = require("../../model/student/bankModel")
const studentModel = require("../../model/student/studentModel")
const validateBankDetail = require('../../validation/bankValidation')

exports.add = async (req,res) => {

    try{
        
        const enNo = req.user.enrollmentNumber;

        const { accountNumber, bankName, branchName, IFSCcode } = req.body

        const fieldError = validateBankDetail(req.body)
        
            // Error in response
            if(fieldError){
                return res.status(400).json({error:fieldError.details[0].message});
            }

        //check if student exist in student model or not
        const isStudentExist = await studentModel.findOne({ enrollmentNumber: enNo });

            //if student doesn't exist than throw error
            if(!isStudentExist) {
                return res.status(400).json({error: "Student does not exist"});
            }

        const addBank = new bankModel({
            accountNumber, bankName, branchName, IFSCcode, enNo
        })

        const res = await addBank.save()

        if (res) return res.status(200).json({message:"bank detail added successfully"})
        else return res.status(400)

    }catch(err){
        console.log(err);
    }
}

exports.getAll = async (req,res) => {
    const result = await bankModel.find()
    res.status(200).json(result)
}