"use strict";

var mongoose = require("mongoose");

module.exports = function (router) {
  router.put("/:id", function _callee(req, res) {
    var showtimes;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            showtimes = {};
            _context.next = 4;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").findByIdAndUpdate(req.params.id, req.body));

          case 4:
            _context.next = 6;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").findById(req.params.id));

          case 6:
            showtimes = _context.sent;
            return _context.abrupt("return", res.status(200).send(showtimes));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).send(_context.t0));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
  router.put("/", function _callee2(req, res) {
    var showtimes;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            showtimes = {};
            _context2.next = 4;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").findByIdAndUpdate(req.params.id, req.body));

          case 4:
            return _context2.abrupt("return", res.status(200).send(showtimes));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).send(_context2.t0));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });
};