const mongoose = require("mongoose")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
require("dotenv").config()

const studentSchema = mongoose.Schema({

    enrollmentNumber:{
        type:Number,
        require:true
    },
    personalEmail:{
        type: String,
    },
    instituteEmail:{
        type:String,
        require: true
    },
    fullName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    motherName:{
        type:String,
    },
    motherEmail:{
        type:String
    },
    bloodGroup:{
        type:String,
    },    
    gender:{
        type:String,
    },    
    dob:{
        type:Date,
    },
    aadharNumber:{
        type:Number,
    },  
    religion:{
        type:String,
    },    
    nationality:{
        type:String,
    },    
    caste:{
        type:String,
    },    
    reserveCategory:{
        type:String,
    },    
    personWithDisability:{
        type:String,
    },    
    personalMobileNo:{
        type:Number,
    },  
    parentMobileNo:{
        type:Number,
    },    
    address:{
        addressLine_1:{ // address | landmark / flat number
            type:String,
        },
        addressLine_2:{ // address | city/ nr. / opp. areas / village / Town
            type:String, 
        },
        district:{
            type:String,
        },    
        taluka:{
            type:String,
        },     
        state:{
            type:String,
        },    
        pincode:{
            type:Number,
        },    
        country:{
            type:String,
        }
    }, 
    photo:{
        avatar: {
            type: String
        },
        cloudinary_id: {
            type: String
        }
    },
    googleId: {
        type: String
    }
    // tokens: [
    //     {
    //         token:{
    //             type:String,
    //             required:true
    //         }
    //     }
    // ]
})

// studentSchema.pre("save",async function(next){
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password,12)
//     }
//     next()
// })

// studentSchema.methods.genAuthToken = async function(){
//     try{
//         let token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
//         this.tokens = this.tokens.concat({token:token})
//         await this.save()
//         return token

//     }catch(err){
//         console.log(err)
//     }
// }

const studentModel = mongoose.model("studentModel", studentSchema)

module.exports = { studentModel }