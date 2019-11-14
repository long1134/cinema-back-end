const mongoose = require("mongoose")

const cinema = new mongoose.Schema({
    address : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
})

module.exports = cinema