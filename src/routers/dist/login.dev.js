"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require("mongoose");

var Router = require("express").Router();

var bcryptjs = require("bcryptjs");

var jwt = require("jsonwebtoken");

Router.post("/", function _callee(req, res) {
  var username, userInfo, isMatch, token, _user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          username = {
            username: req.body.username
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(mongoose.model("staff").findOne(username));

        case 4:
          userInfo = _context.sent;

          if (!userInfo) {
            _context.next = 16;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(bcryptjs.compareSync(req.body.password, userInfo.password));

        case 8:
          isMatch = _context.sent;

          if (!isMatch) {
            _context.next = 16;
            break;
          }

          _context.next = 12;
          return regeneratorRuntime.awrap(userInfo.authToken());

        case 12:
          token = _context.sent;
          _user = _objectSpread({}, userInfo._doc);
          delete _user.password;
          return _context.abrupt("return", res.status(200).send({
            user: _user,
            token: token
          }));

        case 16:
          console.log(user);
          return _context.abrupt("return", res.status(404).send("your username or password is wrong"));

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).send(_context.t0));

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
});
Router.post("/quest", function _callee2(req, res) {
  var username, userInfo, isMatch, token, _user2;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          username = {
            username: req.body.username
          };
          _context2.next = 4;
          return regeneratorRuntime.awrap(mongoose.model("member").findOne(username));

        case 4:
          userInfo = _context2.sent;

          if (!userInfo) {
            _context2.next = 16;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(bcryptjs.compareSync(req.body.password, userInfo.password));

        case 8:
          isMatch = _context2.sent;

          if (!isMatch) {
            _context2.next = 16;
            break;
          }

          _context2.next = 12;
          return regeneratorRuntime.awrap(userInfo.userToken());

        case 12:
          token = _context2.sent;
          _user2 = _objectSpread({}, userInfo._doc);
          delete _user2.password;
          return _context2.abrupt("return", res.status(200).send({
            user: _user2,
            token: token
          }));

        case 16:
          return _context2.abrupt("return", res.status(404).send("your username or password is wrong"));

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.writeHead(500));

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 19]]);
});
module.exports = Router;