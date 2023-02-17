const mongoose = require("mongoose")
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const connectDB = async () => {
    
    try{
        mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((res) => {
            console.log("DB connected");
        })
        .catch((e) => {
            console.log(e);
        })
        
    }
    catch(err){
        console.log(err);
    }

}

module.exports = connectDB