const mongoose = require("mongoose")
require("dotenv").config()

const bankSchema = mongoose.Schema({

    bankDetails:{
        accountNumber:{
            type:Number,
        },
        bankName:{
            type:String,
        },
        branchName:{
            type:String, 
        },
        IFSCcode:{
            type:String,
        },
        bankPassBook:{
            avatar: {
                type: String
            },
            cloudinary_id: {
                type: String
            }
        },
    },
    enNo:{ //foreign key
        type: Number,
        require: true
    }
})

const bankModel = mongoose.model("bankmodels", bankSchema)

module.exports = bankModel