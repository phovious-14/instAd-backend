const { studentModel } = require('../../model/student/studentModel.js')

exports.fetch = async (req, res) => {
    studentModel.find()
    .then((data) => {
        res.json(data)
    })
}

exports.insert = async (req, res) => {
    const { companyWalletAddress, category, siteLink, visitors, desc } = req.body
    
    studentModel.findOneAndUpdate({companyWalletAddress},{

        companyWalletAddress, category, siteLink, visitors, desc
        
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
    const {companyWalletAddress} = req.params
    console.log(companyWalletAddress.toLowerCase());
    const data = await studentModel.find({companyWalletAddress: companyWalletAddress.toLowerCase()})
    let data2 = data[0].ads
    let arr = [];
    data2.map((d => arr.push({date:new Date(d.date), playbackId: d.playbackId })))
    res.json(arr)
}