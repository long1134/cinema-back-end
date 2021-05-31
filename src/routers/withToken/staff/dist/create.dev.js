"use strict";

var mongoose = require("mongoose");

module.exports = function (router) {
  router.post("/", function _callee(req, res) {
    var staff, data;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(mongoose.model("staff").create(req.body));

          case 3:
            staff = _context.sent;
            delete req.body.password;
            console.log(req.body);
            data = req.body;
            res.status(200).send(data);
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            res.status(500).send(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
};