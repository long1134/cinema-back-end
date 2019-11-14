const mongoose = require("mongoose")
const bycrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")

const memberSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    password : {
        type:String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    birth : {
        type : String,
        required : true
    },
    level : {
        type : String,
        default : "bronze"
    },
    tickets : {
        type : Array,
        default : []
    },
    point : {
        type : Number,
        default : 0
    }
})

memberSchema.methods.userToken = async function(){
    const member = this
    console.log(member._id.toString())
    const token = JWT.sign({_id : member._id.toString()},"token")
    return token
}

memberSchema.pre('save', async function(next){
    const member = this
    
    if(member.point >= 1000 && member.point < 2000){
        member.level = "silver"
    }
    if(member.isModified('password')){
        member.password = await bycrypt.hash(member.password, 8)
    }

    next()
})

module.exports = memberSchema