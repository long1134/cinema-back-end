"use strict";

var mongoose = require("mongoose");

var bycrypt = require("bcryptjs");

var JWT = require("jsonwebtoken");

var memberSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  birth: {
    type: String
  },
  level: {
    type: String,
    "default": "bronze"
  },
  tickets: {
    type: Array,
    "default": []
  },
  point: {
    type: Number,
    "default": 0
  }
});

memberSchema.methods.userToken = function _callee() {
  var member, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          member = this;
          console.log(member._id.toString());
          token = JWT.sign({
            _id: member._id.toString()
          }, "token");
          return _context.abrupt("return", token);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};

memberSchema.pre("save", function _callee2(next) {
  var member;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          member = this;

          if (member.point >= 1000 && member.point < 2000) {
            member.level = "silver";
          }

          if (!member.isModified("password")) {
            _context2.next = 6;
            break;
          }

          _context2.next = 5;
          return regeneratorRuntime.awrap(bycrypt.hash(member.password, 8));

        case 5:
          member.password = _context2.sent;

        case 6:
          next();

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
});
module.exports = memberSchema;