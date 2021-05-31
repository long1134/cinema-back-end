"use strict";

var mongoose = require("mongoose");

module.exports = function (router) {
  router.post("/getshowtimes", function _callee(req, res) {
    var showtimes;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            showtimes = {};
            _context.next = 4;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").find(req.body).then(function (data) {
              showtimes = data;
            }));

          case 4:
            return _context.abrupt("return", res.status(200).send(showtimes));

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
  router.post("/mobile", function _callee2(req, res) {
    var showtimes;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            showtimes = {};
            console.log(req.body);
            _context2.next = 5;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").find({
              idFilm: req.body.idFilm,
              dayShow: req.body.dayShow
            }).then(function (data) {
              showtimes = data;
            }));

          case 5:
            return _context2.abrupt("return", res.status(200).send(showtimes));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).send(_context2.t0));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
  router.post("/getByDay", function _callee3(req, res) {
    var showtimes, arr, result, i, a;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            showtimes = [];
            _context3.next = 4;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").find(req.body).then(function (data) {
              showtimes = data;
            }));

          case 4:
            arr = [];
            result = [];

            for (i = 0; i < showtimes.length; i++) {
              a = arr.indexOf(showtimes[i].dayShow);

              if (a !== -1) {
                result[a].push(showtimes[i]);
              } else {
                arr.push(showtimes[i].dayShow);
                result[arr.length - 1] = [];
                result[arr.length - 1].push(showtimes[i]);
              }
            } // console.log(result)


            return _context3.abrupt("return", res.status(200).send(result));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).send(_context3.t0));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
  router.post("/:id", function _callee4(req, res) {
    var showtimes, film;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            showtimes = {};
            film = {};
            _context4.next = 5;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").findById(req.params.id).then(function (data) {
              showtimes = data;
            }));

          case 5:
            _context4.next = 7;
            return regeneratorRuntime.awrap(mongoose.model("film").findById(showtimes.idFilm).then(function (data) {
              film = data;
            }));

          case 7:
            return _context4.abrupt("return", res.status(200).send({
              showtimes: showtimes,
              film: film
            }));

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500).send(_context4.t0));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
};