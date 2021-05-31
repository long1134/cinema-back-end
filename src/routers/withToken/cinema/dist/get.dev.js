"use strict";

var mongoose = require("mongoose");

module.exports = function (router) {
  router.get("/", function _callee(req, res) {
    var cinema;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            cinema = {};
            _context.next = 4;
            return regeneratorRuntime.awrap(mongoose.model("cinema").find().then(function (data) {
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
  router.get("/:id", function _callee2(req, res) {
    var theater;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            theater = [];
            _context2.next = 4;
            return regeneratorRuntime.awrap(mongoose.model("theater").find({
              idCinema: req.params.id
            }).then(function (data) {
              theater = data;
            }));

          case 4:
            return _context2.abrupt("return", res.status(200).send(theater));

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