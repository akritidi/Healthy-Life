const ContactUs = require('../models/contactUs')

const addContactUs = (req,res,next)=>{
    let name = req.body.name    
    let email = req.body.email    
    let message = req.body.message    
    if(name==''||email==''||message==''){
        return res.json({
            status : false,
            message : 'please enter all fields'
        })
    }

    let contactUs = new ContactUs({
        name : name,
        email : email,
        message : message
    })
    contactUs.save()
    .then(contactUs =>{
        res.json({
            status : true,
            message: 'Your message has been successfully sent.Thank you giving us feedback!'
        })
    })
    .catch(error =>{
        error : error
    })
}


module.exports = {
    addContactUs
}