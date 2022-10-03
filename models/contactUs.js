const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const contactUsSchema = new Schema({
   
    name : {
        type : String
    },
    email : {
        type : String
    },
    message : {
        type : String
    }
})

const contactUs = mongoose.model('contactUs',contactUsSchema)
module.exports = contactUs