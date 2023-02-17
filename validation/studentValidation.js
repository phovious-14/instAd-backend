const Joi = require("joi")

module.exports = (data) => {
    let schema = Joi.object({

        personalEmail: Joi.string().email().min(5).max(500).required(),
        enrollmentNumber: Joi.number().integer().required(),
        fullName: Joi.string().min(2).max(50).required(),
        motherName: Joi.string().min(2).max(50).required(),
        bloodGroup: Joi.string().min(2).max(2).required(),  
        gender: Joi.string().min(2).max(10).required(),    
        dob: Joi.date().required(),
        aadharNumber: Joi.number().integer().required(),  
        religion: Joi.string().min(2).max(10).required(),    
        nationality: Joi.string().min(2).max(10).required(),    
        caste: Joi.string().min(2).max(20).required(),    
        reserveCategory: Joi.string().min(2).max(20).required(),    
        personWithDisability: Joi.string().min(2).max(20).required(),    
        personalMobileNo: Joi.number().integer().required(), 
        parentMobileNo: Joi.number().integer().required(), 

        addressLine_1: Joi.string().min(2).max(500).required(),
        addressLine_2: Joi.string().min(2).max(500).required(),
        district: Joi.string().min(2).max(20).required(),    
        taluka: Joi.string().min(2).max(20).required(),     
        state: Joi.string().min(2).max(20).required(),    
        pincode: Joi.number().integer().required(),    
        country: Joi.string().min(2).max(20).required()

    })
  
    // This is a shorter version
    const { error } = schema.validate(data);

    return error;
}