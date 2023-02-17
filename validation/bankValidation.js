const Joi = require("joi")

module.exports = (data) => {
    let schema = Joi.object({

        accountNumber: Joi.number().integer().required(),
        bankName: Joi.string().min(2).max(50).required(),
        branchName: Joi.string().min(2).max(50).required(),
        IFSCcode: Joi.number().integer().required()

    })
  
    // This is a shorter version
    const { error } = schema.validate(data);

    return error;
}