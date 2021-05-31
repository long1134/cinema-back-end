"use strict";

var mongoose = require("mongoose");

module.exports = function (io) {
  io.on("connection", function (socket) {
    socket.on("testSocket", function _callee(id) {
      var showtimes;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(mongoose.model("showtimes").findById(id));

            case 2:
              showtimes = _context.sent;
              io.emit("testSocket", showtimes.map);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  });
};