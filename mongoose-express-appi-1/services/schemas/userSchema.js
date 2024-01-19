const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id : String,
    name: String,
    email:{
        type: String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true},
    role:String

},{
    versionKey:false
});
const userModel = mongoose.model('users', userSchema)
module.exports = userModel;