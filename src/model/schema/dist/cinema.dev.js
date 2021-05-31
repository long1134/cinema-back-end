"use strict";

var mongoose = require("mongoose");

var cinema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});
module.exports = cinema;