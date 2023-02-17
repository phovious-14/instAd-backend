const mongoose = require("mongoose")
require("dotenv").config()

const feesSchema = mongoose.Schema({

    paymentAndFees:[
        {
            paymentRecieptURLs:{
                pdfUrl: {
                    type: String,
                    requrie: true
                },
                cloudinary_id: {
                    type: String,
                    require: true
                }
            },
            DUINumber:{
                type: String,
                require: true
            },
            semester:{
                type: String,
                require: true
            },
            date:{
                type: Date,
                require: true
            }
        }
    ],
    enNo:{ //foreign key
        type: Number,
        require: true
    }

})

const feesModel = mongoose.model("feesModel", feesSchema)

module.exports = feesModel