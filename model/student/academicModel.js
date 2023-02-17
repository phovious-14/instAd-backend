const mongoose = require("mongoose")
require("dotenv").config()

const academicSchema = mongoose.Schema({

    tenThPercentage:{
        type:String,
    }, 
    collegeCourse:{
        type:String
    },
    currentSemester:{
        type:String
    },
    collegeBranch:{
        type:String
    },
    lastSPI:{
        type:String
    },
    lastCPI:{
        type:String
    },
    lastCGPA:{
        type:String
    },
    stream_12th:{
        twelthResult:{
            type:String,
        },
        board:{
            type:String
        },
        group:{
            type:String
        }
    },
    diplomaStream:{
        universityName:{
            type:String
        },
        collegeName:{
            type:String
        },
        diplomaBranch:{
            type:String
        },
        diplomaResult:{
            type:String
        }
    },
    admission:{
        admissionRank:{
            type:String,
        },
        admissionRollNo:{
            type:String,
        },
        ewsAdmissionQuota:{
            type:String, // yes or no
        },
        admissionQuota:{
            type:String,
        },
        admissionDate:{
            type:Date,
        },
        admissionType:{
            type:String,
        },
        shift:{
            type:String,
        }
    },
    enNo:{ // foreign key
        type: String,
        require:true
    }
    
})

const academicModel = mongoose.model("academicModel", academicSchema)

module.exports = academicModel