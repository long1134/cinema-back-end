"use strict";

var mongoose = require("mongoose");

var MONGODB_API = process.env.API_MONGOOSE;
var MONGODB_API_CLIENT = "mongodb://127.0.0.1:27017/cinema";
mongoose.connect(MONGODB_API, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});