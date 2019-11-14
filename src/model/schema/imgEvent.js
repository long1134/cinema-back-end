const mongoose = require("mongoose")

const imgEventSchema = new mongoose.Schema({
    img:{
        type : Buffer,
        required:true
    }
})

module.exports = imgEventSchema