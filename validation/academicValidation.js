const Joi = require("joi")

const twelthStream = (data) => {
    let schema = Joi.object({

        twelthResult: Joi.number().precision(2).required(),
        board: Joi.string().min(2).max(30).required(),
        group: Joi.string().valid('A','B').required()
        
    }).unknown(true)
  
    // This is a shorter version
    const { error } = schema.validate(data);

    return error;
}

const diplomaStream = (data) => {
    let schema = Joi.object({

        diplomaResult: Joi.number().precision(2).required(),
        universityName: Joi.string().min(2).max(50).required(),
        collegeName: Joi.string().min(2).max(50).required(),
        diplomaBranch: Joi.string().min(2).max(50).required()

    }).unknown(true)
  
    // This is a shorter version
    const { error } = schema.validate(data);

    return error;
}

const sameDetails = (data) => {
    let schema = Joi.object({
        tenThPercentage: Joi.number().precision(2).positive().required(),
        admissionRank: Joi.number().positive().required(),
        admissionRollNo: Joi.number().integer().required(),
        ewsAdmissionQuota: Joi.string().min(2).max(50).required(),
        admissionQuota: Joi.string().min(2).max(50).required(),
        admissionDate: Joi.date().required(),
        admissionType: Joi.string().min(2).max(10).required(),
        shift: Joi.string().min(2).max(10).required(),
        enNo: Joi.number().integer().required(),
        collegeCourse: Joi.string().required(),
        currentSemester: Joi.string().required(),
        collegeBranch: Joi.string().required(),
        lastSPI: Joi.string().required(),
        lastCPI: Joi.string().required(),
        lastCGPA: Joi.string().required()
    }).unknown(true)
  
    // This is a shorter version
    const { error } = schema.validate(data);

    return error;
}

module.exports = { twelthStream, diplomaStream, sameDetails };

