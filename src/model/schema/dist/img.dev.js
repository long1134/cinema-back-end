"use strict";

var mongoose = require("mongoose");

var imgSchema = new mongoose.Schema({
  img: {
    type: Buffer,
    required: true
  }
});
module.exports = imgSchema;