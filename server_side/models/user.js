const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    name : {
        type : String,
        required : [true, "provide name"]
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
});

// Update the updated at field before a save action is triggered
userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel