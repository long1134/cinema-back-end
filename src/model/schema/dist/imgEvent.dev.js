"use strict";

var mongoose = require("mongoose");

var imgEventSchema = new mongoose.Schema({
  img: {
    type: Buffer,
    required: true
  }
});
module.exports = imgEventSchema;