const Joi = require("joi")

module.exports = (data) => {
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