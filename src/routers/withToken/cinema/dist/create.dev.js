"use strict";

var mongoose = require("mongoose");

module.exports = function (router) {
  router.post("/", function _callee(req, res) {
    var cinema;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            cinema = {};
            _context.next = 4;
            return regeneratorRuntime.awrap(mongoose.model("cinema").create(req.body).then(function (data) {
              cinema = data;
            }));

          case 4:
            return _context.abrupt("return", res.status(200).send(cinema));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).send(_context.t0));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });
};