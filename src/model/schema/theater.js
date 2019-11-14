const mongoose = require("mongoose")

const theaterSchema = new mongoose.Schema({
    idCinema : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    seatNumber : {
        type : String,
        required : true
    },
    name:{
        type : String,
        required : true
    },
    status : {
        type : String,
        default:"ready"
    }
})

module.exports = theaterSchema