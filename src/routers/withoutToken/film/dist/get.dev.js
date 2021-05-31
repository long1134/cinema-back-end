"use strict";

var mongoose = require("mongoose");

module.exports = function (router) {
  router.get("/available", function _callee(req, res) {
    var movies;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(mongoose.model("film").find({
              status: "available"
            }));

          case 3:
            movies = _context.sent;
            return _context.abrupt("return", res.status(200).send(movies));

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
  }), router.get("/coming", function _callee2(req, res) {
    var movies;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(mongoose.model("film").find({
              status: "coming"
            }));

          case 3:
            movies = _context2.sent;
            return _context2.abrupt("return", res.status(200).send(movies));

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
  }), router.get("/:id", function _callee3(req, res) {
    var movies;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(mongoose.model("film").findById(req.params.id));

          case 3:
            movies = _context3.sent;
            return _context3.abrupt("return", res.status(200).send(movies));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).send(_context3.t0));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 7]]);
  }), router.get("/", function _callee4(req, res) {
    var movies;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(mongoose.model("film").find());

          case 3:
            movies = _context4.sent;
            return _context4.abrupt("return", res.status(200).send(movies));

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500).send(_context4.t0));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });
};