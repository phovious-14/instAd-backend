const mongoose = require("mongoose")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
require("dotenv").config()

const studentSchema = mongoose.Schema({

    companyWalletAddress:{
        type:String,
        require:true
    },
    ads:[{
        shardeumToken:{
            type:String,
            require:true
        },
        date:{
            type:Date,
            default:Date.now
        },
        playbackId:{
            type:String,
            require:true
        },
        adOwnerWalletAddress:{
            type:String,
            require:true
        }
    }]
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