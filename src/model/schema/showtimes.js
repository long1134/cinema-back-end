const mongoose = require("mongoose")

const showtimes = new mongoose.Schema({
    idTheater:{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    idFilm:{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    idCinema:{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    dayShow : {
        type :String,
        required : true
    },
    timeShow : {
        type : String,
        required : true
    },
    tickets : {
        type : Number,
        default : 0
    },
    combo : {
        type : Array,
        default : []
    },
    detailTickets : {
        type : Array,
        default : []
    },
    revenueCombo : {
        type : Number,
        default:0
    },
    revenueTickets : {
        type : Number,
        default:0
    },
    revenue : {
        type : Number,
        default : '0'
    },
    map : {
        type : Array,
    }
})

module.exports = showtimes