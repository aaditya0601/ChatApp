const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    name : {
        type : String,
        required : [true, "provide name"]   // "provide name" : If any error occured 
    },
    email : {
        type : String,
        required : [true,"provide email"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "provide password"]
    },
    profile_pic : {
        type : String,   
        default : ""
    }
},{
    timestamps : true
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel