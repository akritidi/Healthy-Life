const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    adminstatus : {
      type : Boolean,
      default : false
    },
    gender : {
      type : String,
      default : "Unknown"
    },
    age : {
      type : Number,
      default : 0
    },
    height : {
      type : Number,
      default : 0
    },
    weight : {
      type : Number,
      default : 0
    },
    firstTimer : {
      type : Boolean,
      default : true
    },
    avatar : {
      type : String,
      default : '/uploads/avatar.png'
    },
     calories: [
    {
      date: {
        type: String,
      },
      total: {
        type: Number,
      },
      inputs: [
        {
          foods: {
            type: String,
          },
          calPerFood: {
            type: Number,
          },
          quantity: {
            type: Number,
          },
          timezone: {
            type: String,
          },
        },
      ],
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
