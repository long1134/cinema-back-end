const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")

const staffSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

staffSchema.methods.authToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},"token")
    return token
}

staffSchema.pre("save",async function(next){
    const user = this
    if(user.isModified("password")){
        user.password = await bcryptjs.hash(user.password,9)
    }
    next()
})

module.exports = staffSchema