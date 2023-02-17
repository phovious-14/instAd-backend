const mongoose = require("mongoose")

const activitySchema = mongoose.Schema({

    activities:[
        {
            activityURLs:{
                pdfUrl: {
                    type: String,
                    require: true
                },
                cloudinary_id: {
                    type: String,
                    require: true
                }
            },
            date:{
                type: Date,
                require: true
            },
            status:{
                type: String,
                default:"pending"
            }
        }
    ],
    enNo:{ //foreign key
        type: Number,
        require: true
    }

});

const activityPointsModel = mongoose.model("activityPointsModel", activitySchema)

module.exports = { activityPointsModel }