"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require("mongoose");

var jwt = require("jsonwebtoken");

module.exports = function (router) {
  router.put("/", function _callee(req, res) {
    var decoded, member;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(jwt.verify(req.body.token, "token"));

          case 3:
            decoded = _context.sent;
            delete req.body.data.password;
            delete req.body.data._id;
            delete req.body.data.tickets;
            delete req.body.data.point;
            delete req.body.data.food;
            delete req.body.data.level;
            console.log(req.body.data);
            _context.next = 13;
            return regeneratorRuntime.awrap(mongoose.model("member").findByIdAndUpdate(decoded._id, _objectSpread({}, req.body.data)));

          case 13:
            member = _context.sent;

            if (!member) {
              _context.next = 17;
              break;
            }

            delete member.password;
            return _context.abrupt("return", res.status(200).send(member));

          case 17:
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
};