"use strict";

var mongoose = require("mongoose");

module.exports = function (router) {
  router.put("/", function _callee(req, res) {
    var cinema;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            cinema = {};
            console.log(req.body);
            _context.next = 5;
            return regeneratorRuntime.awrap(mongoose.model("cinema").findByIdAndUpdate(req.body._id, req.body).then(function (data) {
              cinema = data;
            }));

          case 5:
            return _context.abrupt("return", res.status(200).send(cinema));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).send(_context.t0));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
};