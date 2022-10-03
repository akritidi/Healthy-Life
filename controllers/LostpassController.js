const Lostpass = require('../models/Lostpass')
const User = require('../models/User')


const store = (req,res,next)=>{
    var email = req.body.email
    if(email==''){
        res.status(400).json({status : false,message : "Please enter Email!"})
    }
    User.findOne({email:email})
    .then(user=>{
        if(user){
        Lostpass.findOne({email:email})
        .then(lostpass =>{
            if(lostpass){
                res.status(400).json({status : false , message : "You have already applied for a password change!"})
            }
            else{
                let lostpass = new Lostpass({
                    email:email
                })
                lostpass.save()
                .then(lostpass=>{
                    res.status(200).json({status : true, message : "You successfully applied for a password change!"})
                })
                .catch(error =>{
                    res.json({
                        status : false,
                        message : "Error Occured!"
                    })
                })
            }
        })
    }
    else{
        res.status(400).json({status : false ,message : "You don't have an account registered yet!"})
    }
    })
    

   
}


module.exports = {store}