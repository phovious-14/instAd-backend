const academicModel = require("../../model/student/academicModel")
const { studentModel } = require("../../model/student/studentModel")
const { twelthStream, diplomaStream, sameDetails } = require("../../validation/academicValidation")

exports.add = async (req,res) => {

    try {

        //get academic info
        var { lastCGPA, lastCPI, lastSPI, collegeBranch, currentSemester, collegeCourse, tenThPercentage, twelthResult, board, group, universityName, collegeName, diplomaBranch, diplomaResult, admissionRank, admissionRollNo, ewsAdmissionQuota, admissionQuota, admissionDate, admissionType, shift } = req.body
        
        //validate schema of same details, like admissionQuota, admissionType, shift...
        const sameDeatilError = sameDetails(req.body)
        if(sameDeatilError){
            return res.status(400).json({error: sameDeatilError.details[0].message});
        }

        //get admission date with formatting yyyy-mm-dd
        admissionDate = new Date(admissionDate).toISOString().slice(0, 10);

        // check if enrollment no. exist or not
        const isStudentExist = await studentModel.findOne({enrollmentNumber:enNo})
        if(!isStudentExist){
            return res.status(400).json({error:"Invalid credentials"})
        }       

        //check if user exist
        let data = await academicModel.findOne({ enNo })

        if(data != null) {

            if(tenThPercentage !== undefined) {

                //set floating values for 1oth percentage between 34% to 99%
                tenThPercentage = Number(tenThPercentage).toFixed(2)
                if(tenThPercentage >= 100 || tenThPercentage < 33) {
                    errObj1.tenThPercentage = "Enter valid 10th percentage"
                }
            }
            if(admissionRank !== undefined){
                data.admission.admissionRank = admissionRank
            }
            if( admissionRollNo !== undefined){
                data.admission.admissionRollNo = admissionRollNo
            }
            if(ewsAdmissionQuota !== undefined){
                data.admission.ewsAdmissionQuota = ewsAdmissionQuota
            }
            if(admissionQuota !== undefined){
                data.admission.admissionQuota = admissionQuota
            }
            if(admissionDate !== undefined){
                data.admission.admissionDate = admissionDate
            }
            if(admissionType !== undefined){
                data.admission.admissionType = admissionType
            }
            if(shift !== undefined){
                data.admission.shift = shift
            }
        }

        //if detail is about 12th stream
        if(twelthResult || board || group) {
            //validate schema of twelth stream
            const twelthStreamError = twelthStream(req.body)
            if(twelthStreamError){
                return res.status(400).json({error: twelthStreamError.details[0].message});
            }
                
            // if data doesn't exist
            if(data == null) {
                data = {}
                data.stream_12th = {}
            } 
            else {
                if(twelthResult !== undefined){

                    //set floating values for 12th percentage between 34% to 99%
                    twelthResult = Number(twelthResult).toFixed(2)
                    if(twelthResult >= 100 || twelthResult < 33) {
                        //add error to err object
                        errObj1.twelthResult = "Enter valid 12th percentage, must between 34 to 99"
                    }
                    data.stream_12th.twelthResult = twelthResult
                }
                if(board !== undefined){
                    data.stream_12th.board = board
                }
                if(group !== undefined){
                    data.stream_12th.group = group
                }
            }

            //update data
            const data = await academicModel.findOneAndUpdate({ enNo }, {
            
                tenThPercentage,
                stream_12th: data.stream_12th,
                admission: data.admission,
                enNo

            }, { upsert: true })
            console.log(data);

            //remove diploma stream if exist
            await academicModel.findOneAndUpdate({ enNo }, {
                $unset: {diplomaStream: 1} 
            })

            return res.json({data}).status(200)

        }
        else{

            //validate schema of diploma stream
            const diplomaStreamError = diplomaStream(req.body)
            if(diplomaStreamError){
                return res.status(400).json({error: diplomaStreamError.details[0].message});
            }
            
            if(data == null){
                data = {}
                data.diplomaStream = {}
            }
            else {
                if(universityName !== undefined){
                    data.diplomaStream.universityName = universityName
                }
                if(collegeName !== undefined){
                    data.diplomaStream.collegeName = collegeName
                }
                if(diplomaBranch !== undefined){
                    data.diplomaStream.diplomaBranch = diplomaBranch
                }
                if(diplomaResult !== undefined){
    
                    //set floating values for diploma CPI/CGPA between 3 to 10
                    diplomaResult = Number(diplomaResult).toFixed(2)
                    if(diplomaResult > 10.00 || diplomaResult < 3.10) {
                        //add error to err object
                        errObj1.diplomaResult = "Enter valid diploma CPI/CGPA, must between 3.0 to 10.0"
                    }
                    data.diplomaStream.diplomaResult = diplomaResult
    
                }
            }


            //update data
            const data = await academicModel.findOneAndUpdate({ enNo }, {
                course, currSem, spi, cpi, cgpa,
                tenThPercentage,
                diplomaStream: data.diplomaStream,
                admission: data.admission,
                enNo
            },{upsert:true})

            console.log(data);

            //remove 12th stream if exist
            await academicModel.findOneAndUpdate({ enNo }, {
                $unset: {stream_12th: 1} 
            })

            return res.json({data}).status(200)

        }

    } catch (err) {
        console.log(err);
    }
}

// exports.update = async (req,res) => {

//     try{

//         const en = req.userEnNo;

//         var { 
//             tenThPercentage, 
//             twelthResult, board, group,
//             universityName, collegeName, diplomaBranch, diplomaResult,
//             admissionRank, admissionRollNo, ewsAdmissionQuota, admissionQuota, admissionDate, admissionType, shift 
//         } = req.body

//         //initialize error object
//         let errObj1 = {}           
        

//         //check if user exist
//         const data = await academicModel.findOne({ enrollmentNumber:en })

//         if(data !== null){

//             if(tenThPercentage !== undefined) {

//                 //set floating values for 1oth percentage between 34% to 99%
//                 tenThPercentage = tenThPercentage.toFixed(1)
//                 if(tenThPercentage >= 100 || tenThPercentage < 33) {
//                     errObj1.tenThPercentage = "Enter valid 10th percentage"
//                 }
//             }
//             if(twelthResult !== undefined){

//                 //set floating values for 12th percentage between 34% to 99%
//                 if(twelthResult >= 100 || twelthResult < 33) {
//                     //add error to err object
//                     errObj1.twelthResult = "Enter valid 12th percentage, must between 34 to 99"
//                 }
//                 data.stream_12th.twelthResult = tenThPercentage.toFixed(1)
//             }
//             if(board !== undefined){
//                 data.stream_12th.board = board
//             }
//             if(group !== undefined){
//                 data.stream_12th.group = group
//             }
//             if(universityName !== undefined){
//                 data.diplomaStream.universityName = universityName
//             }
//             if(collegeName !== undefined){
//                 data.diplomaStream.collegeName = collegeName
//             }
//             if(diplomaBranch !== undefined){
//                 data.diplomaStream.diplomaBranch = diplomaBranch
//             }
//             if(diplomaResult !== undefined){

//                 //set floating values for 12th CPI/CGPA between 3 to 10
//                 if(diplomaResult > 10.1 || diplomaResult < 3.1) {
//                     //add error to err object
//                     errObj1.diplomaResult = "Enter valid diploma CPI/CGPA, must between 3.0 to 10.0"
//                 }
//                 data.diplomaStream.diplomaResult = diplomaResult.toFixed(1)

//             }
//             if(admissionRank !== undefined){
//                 data.admission.admissionRank = admissionRank
//             }
//             if( admissionRollNo !== undefined){
//                 data.admission.admissionRollNo = admissionRollNo
//             }
//             if(ewsAdmissionQuota !== undefined){
//                 data.admission.ewsAdmissionQuota = ewsAdmissionQuota
//             }
//             if(admissionQuota !== undefined){
//                 data.admission.admissionQuota = admissionQuota
//             }
//             if(admissionDate !== undefined){
//                 data.admission.admissionDate = admissionDate
//             }
//             if(admissionType !== undefined){
//                 data.admission.admissionType = admissionType
//             }
//             if(shift !== undefined){
//                 data.admission.shift = shift
//             }

//             let errObj2 = validationAcademicInfo(req.body)
//             if(JSON.stringify(errObj2) === '{}'){ // function should return {} to save data

//                 await academicModel.findOneAndUpdate( { enNo:en } ,//for filter
//                 {        
//                     tenThPercentage, 
//                     stream_12th:data.stream_12th,
//                     diplomaStream:data.diplomaStream,
//                     admission:data.admission //data for update
//                 })
//             }
//             errObj1 = Object.assign(errObj1, errObj2)   // insert errObj2 into errObj1

//             JSON.stringify(errObj1) === '{}' ? res.status(200).json({message:"academic details updated successfully"}) : res.status(403).json({error:errObj1})
//         }
//     }
//     catch(err){
//         console.log(err);
//     }

// }

exports.getAll = async (req,res) => {
    
    const result = await academicModel.find({})

    if(result){
        return res.status(200).json(result)
    }else{
        return res.status(400).json({error:"Data not found"})
    }
}

exports.getOne = async (req,res) => {
    const en = req.userEnNo;

    const result = await academicModel.find({ enNo:en })
    res.status(200).json(result)
}