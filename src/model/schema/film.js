const mongoose = require("mongoose")

const filmSchema = new mongoose.Schema({
    name:{
        type : String,
        required:true
    },
    director:{
        type : String,
        required:true
    },
    dayShow : {
        type : String,
        required:true
    },
    content:{
        type : String,
        required:true
    },
    type : {
        type : String,
        required:true
    },
    img1: {
        type : String,
        required : true
    },
    img2 : {
        type : String,
        required : true
    },
    rate : {
        type : Number
    },
    trailer : {
        type : String
    },
    status:{
        type : String
    },
    time:{
        type : String,
        required : true
    },
    country:{
        type : String,
        required : true
    }
})

module.exports = filmSchema