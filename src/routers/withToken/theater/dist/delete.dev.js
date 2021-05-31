"use strict";

var mongoose = require("mongoose");

module.exports = function (router) {
  router["delete"]("/:id", function _callee(req, res) {
    var theater;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            theater = {};
            _context.next = 4;
            return regeneratorRuntime.awrap(mongoose.model("theater").findByIdAndDelete(req.params.id).then(function (data) {
              theater = data;
            }));

          case 4:
            if (!(theater === null)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).send("not found"));

          case 6:
            return _context.abrupt("return", res.status(200).send(theater));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).send(_context.t0));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 9]]);
  });
};