"use strict";

var mongoose = require("mongoose");

module.exports = function (router) {
  router.get("/img/:id", function _callee(req, res) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(mongoose.model("img").findById(req.params.id).then(function (result) {
              res.set("Content-Type", "image/jpg");
              res.send(result.img);
            })["catch"](function (e) {
              res.send(e);
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};