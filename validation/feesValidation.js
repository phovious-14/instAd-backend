const Joi = require("joi")

const fileValidation = (data) => {
    // console.log(data);
    let schema = Joi.object({

        fieldname: Joi.string().required(),
        filename: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
        path: Joi.string().required(),       
        destination: Joi.string().required(),
        size: Joi.number().required()

    })
  
    // This is a shorter version
    const { error } = schema.validate(data);

    return error;
}

const feesFieldsValidation = (data) => {
    let schema = Joi.object({
        
        enNo: Joi.number().integer().required(),
        DUINumber: Joi.string().required(),
        semester: Joi.string().required()

    })
  
    // This is a shorter version
    const { error } = schema.validate(data);

    return error;
}

module.exports = { fileValidation, feesFieldsValidation };