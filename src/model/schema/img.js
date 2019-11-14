const mongoose = require("mongoose")

const imgSchema = new mongoose.Schema({
    img:{
        type : Buffer,
        required:true
    }
})

module.exports = imgSchema