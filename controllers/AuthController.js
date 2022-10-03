const User = require('../models/User')
const bcrypt = require('bcryptjs')
const path = require('path')



const index = (req,res,next) => {
   
    User.find()
    .then(response => {
            res.json({
                status : true,
                response
            })
        })
    .catch(error =>{
            res.json({
                status : false,
                message:'An error !!'
            })
        })
}
const show = (req,res,next) => {
    let username = req.body.name 
    
    User.findOne({name : username})

    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        console.log(error)
        res.json({
            message: 'An error has occured!'
        })
    })
}
const destroy = (req,res,next) => {
    let userID = req.body.userID
    
    User.findByIdAndRemove(userID)
    .then(() =>{
        res.json({
            status : true,
            message : 'User deleted successfully!'
        })
    })
    .catch(error =>{
        res.json({
            status : false,
            message : 'An error has Occured!'
        })
    })
}
const update = (req,res,next) => {
    let userID = req.body.userID
    let thisUsername  = req.body.thisUsername
    let thisEmail = req.body.thisEmail
    let updatedData = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password

    }
    User.findOne({name : updatedData.name},function(err,existingUSer){
        if((existingUSer==null)||(updatedData.name==thisUsername)){
            User.findOne({email:updatedData.email},function(err,existingEmail){
                if((existingEmail==null)||(updatedData.email==thisEmail)){
                    User.findByIdAndUpdate(userID,{$set: updatedData},{new : true})
                    .then(() =>{
                    res.json({
                        status : true,
                        message : 'User updated successfully!'
                        })
                    })
                    .catch(error =>{
                        res.json({
                        status : false,
                        message : 'An error has Occured!'
                        })
                    })
                }
                else{
                    res.json({
                        status : false,
                        message : "Email already exists"
                    })
                }
            })
        }
        else{
            res.json({
                status : false,
                message : "Username already exists"
            })   
        }
    })
    
}
const uploadAvatar = (req,res,next) =>{
    let name = req.cookies.healthylifesession

    User.findOneAndUpdate({name : name}, { avatar: `/uploads/${req.file.filename}`}, function(err){

        if(!err){
            res.json({
                status : true,
                message : "Your profile image has been succesfully updated",
                fileName : req.file.fileName
            })
        } else {
            res.json({
                status : false,
                message : "An error has occured chungus"
            })
        }
        
    
    })
    .catch(error =>{
        res.json({
          error
        })
    })
    
    
}

const updateMetrics = (req,res,next)=>{
   let  gender             =   req.body.postGender
   let  age                =   req.body.postAge
   let  height             =   req.body.postHeight
   let  weight             =   req.body.postWeight
   
   let  name               =   req.body.name

    

    let updatedData = {
        gender: gender,
        age : age,
        height : height,
        weight : weight,
        firstTimer : false

    }
    User.findOne({name : name},function(err,existingUSer){
        if(existingUSer!=null){
            User.findByIdAndUpdate(existingUSer._id,{$set: updatedData},{new : true})
            .then(()=>{
                res.json({
                    status : true
                })
            })
            .catch(error =>{
                res.json({
                    status : false ,
                    message : 'An error has occured!'
                })
            })
        }
        else{
            res.json({
                status : false ,
                message : 'An error has occured!'
            })
        }
    })
    .catch(error =>{
        res.json({
            status : false ,
            message : 'An error has occured!'
        })
    })


}
const getAvatar = (req,res,next)=>{
    let name = req.body.username
    User.findOne({name:name},function(err,existingUSer){
        if(existingUSer!=null){
            res.json({
                status : true ,
                avatarUrl : existingUSer.avatar
            })
        }
        else{
            res.json({
                status : false,
                message: "An error has Occured!"
            })
        }



    })
    .catch(error=>{
        console.log(error)
    })


}

const register = (req,res,next) =>{
    let name = req.body.name.split('')
    for(let i=0;i<name.length;i++){
        if(name[i]==' '){
           return res.json({
                status : false,
                message : "No spaces allowed in username!"
            })
        }
    }

    if(req.body.name == '' || req.body.password  == ''  || req.body.email == '' || req.body.confirmpassword == ''){
        res.status(400).json({status : false,message : "Please enter all fields!"})
    }
    else if(req.body.password!=req.body.confirmpassword){
        res.status(400).json({status : false,message : "Password Confirmation Failed!"})
    }
    else{
        User.findOne({name:req.body.name},function(err,existingUSer){
            if(existingUSer==null){
                User.findOne({email:req.body.email},function(err,existingEmail){
                    if(existingEmail==null){
                        bcrypt.hash(req.body.password,10,function(err,hashedPass){
                            if(err){
                                res.json({
                                    status : false,
                                    message : "Error Occured!"
                                })
                            }
                            let user = new User ({
                                name : req.body.name,
                                email: req.body.email,
                                password : hashedPass,
                                adminstatus : req.body.adminStatus
                            })
                            user.save()
                            .then(user => {
                                res.json({status:true,message:"Registration Complete!"})
                            })
                            .catch(error =>{
                                res.json({
                                    status : false,
                                    message : "Error Occured!"
                                })
                            })
                            
                        })
                    }
                    else{
                        res.status(400).json({status : false,message : "Email Already Exists!"})

                    }
                })
                
            }
            else{
                res.status(400).json({status : false,message : "Username Already Claimed!"})
            }
        })
        
        
    }
    
    
}
const login = (req,res,next) =>{
    var username = req.body.name
    var password = req.body.password
    if(username == '' ||password  == ''){
        res.status(400).json({status : false,message : "Please enter all fields!"})
    }
    User.findOne({name: username})
    .then(user =>{
        if(user){
            console.log(user);
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        status : false,
                        message : "Error Occured!"
                    })
                }
                if(result){
                    if(user.adminstatus){
                      
                      res.cookie('healthylifesession', user.name, {maxAge:3600000})
                      res.json({status:true,message:"Signed In as Admin!",admin :true})
                      res.end()
                        
                    }
                    else{
                    
                    res.cookie('healthylifesession' , user.name, {maxAge:3600000})
                    res.json({status:true,message:"Sign In Complete!"})
                    res.end()
                    }
                }
                else{
                    res.json({
                        status : false,
                        message : 'Password does not match!'
                    })
                }
            })
        }
        else{
            res.json({
                status : false,
                message : 'No user found!'
            })
        }
    })
}

module.exports = { 
    register,login,index,destroy,update,show,updateMetrics, uploadAvatar,getAvatar
}