"use strict";

var mongoose = require("mongoose");

var jwt = require("jsonwebtoken");

var bcryptjs = require("bcryptjs");

var staffSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

staffSchema.methods.authToken = function _callee() {
  var user, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = this;
          token = jwt.sign({
            _id: user._id.toString()
          }, "token");
          return _context.abrupt("return", token);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};

staffSchema.pre("save", function _callee2(next) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = this;

          if (!user.isModified("password")) {
            _context2.next = 5;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(bcryptjs.hash(user.password, 9));

        case 4:
          user.password = _context2.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
});
module.exports = staffSchema;