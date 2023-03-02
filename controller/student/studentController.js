const { studentModel } = require('../../model/student/studentModel.js')

exports.add = async (req, res) => {
    const { companyWalletAddress, shardeumToken, date, playbackId, adOwnerWalletAddress } = req.body
    
    studentModel.findOneAndUpdate({companyWalletAddress},{

        $push:{
            ads:{
                shardeumToken, 
                date, 
                playbackId, 
                adOwnerWalletAddress
            }
        }

    }, { upsert:true },
    (err) => {
        if(err) {
            return res.status(400).json({error: "Something went wrong"});
        }
        else{
            return res.status(200).json({messege: "user added successfully"});
        }
    });
}

exports.getOne = async (req,res) => {
    const {walletAddress} = req.params
    studentModel.findOne({companyWalletAddress: walletAddress})
    .then((data) => {
        let data2 = data.ads
        let arr = [];
        data2.map((d => arr.push({date:new Date(d.date), playbackId: d.playbackId })))
        res.json({data:arr})
    })
}