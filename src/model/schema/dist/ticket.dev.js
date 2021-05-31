"use strict";

var mongoose = require("mongoose");

var TicketSchema = new mongoose.Schema({
  idShowtimes: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  seatName: {
    type: String,
    required: true
  },
  foodsDetail: {
    type: Array,
    "default": []
  },
  seatsDetail: {
    type: Array,
    "default": []
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    "default": "ready"
  }
});
module.exports = TicketSchema;