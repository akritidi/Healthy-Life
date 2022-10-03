const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lostpassschema = new Schema({

    email:{
        type : String
    }

},{timestamps:true})

const Lostpass = mongoose.model('Lostpass',lostpassschema)
module.exports = Lostpass