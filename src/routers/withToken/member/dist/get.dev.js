"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require("mongoose");

var jwt = require("jsonwebtoken");

module.exports = function (router) {
  router.post("/ticket", function _callee(req, res) {
    var decoded, member, ticketsInfo, i, ticket, showtimes, cinema, film, result;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(jwt.verify(req.body.token, "token"));

          case 3:
            decoded = _context.sent;
            _context.next = 6;
            return regeneratorRuntime.awrap(mongoose.model("member").findById(decoded._id));

          case 6:
            member = _context.sent;

            if (!member) {
              _context.next = 31;
              break;
            }

            ticketsInfo = [];
            _context.t0 = regeneratorRuntime.keys(member.tickets);

          case 10:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 30;
              break;
            }

            i = _context.t1.value;
            _context.next = 14;
            return regeneratorRuntime.awrap(mongoose.model("ticket").findById(member.tickets[i]));

          case 14:
            ticket = _context.sent;
            _context.next = 17;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").findById(ticket.idShowtimes));

          case 17:
            showtimes = _context.sent;
            _context.next = 20;
            return regeneratorRuntime.awrap(mongoose.model("cinema").findById(showtimes.idCinema));

          case 20:
            cinema = _context.sent;
            _context.next = 23;
            return regeneratorRuntime.awrap(mongoose.model("film").findById(showtimes.idFilm));

          case 23:
            film = _context.sent;
            result = _objectSpread({}, ticket._doc, {
              dayShow: showtimes.dayShow,
              timeShow: showtimes.timeShow,
              cinemaName: cinema.name,
              filmName: film.name,
              img: film.img1
            });
            delete result.idShowtimes;
            console.log(result);
            ticketsInfo.push(result);
            _context.next = 10;
            break;

          case 30:
            return _context.abrupt("return", res.status(200).send(ticketsInfo));

          case 31:
            return _context.abrupt("return", res.status(404).send("your username or password is wrong"));

          case 34:
            _context.prev = 34;
            _context.t2 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).send(_context.t2));

          case 37:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 34]]);
  });
  router.post("/info", function _callee2(req, res) {
    var decoded, member;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(jwt.verify(req.body.token, "token"));

          case 3:
            decoded = _context2.sent;
            _context2.next = 6;
            return regeneratorRuntime.awrap(mongoose.model("member").findById(decoded._id));

          case 6:
            member = _context2.sent;

            if (!member) {
              _context2.next = 10;
              break;
            }

            delete member.password;
            return _context2.abrupt("return", res.status(200).send(member));

          case 10:
            return _context2.abrupt("return", res.status(404).send("your username or password is wrong"));

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).send(_context2.t0));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 13]]);
  });
  router.get("/", function _callee3(req, res) {
    var member;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(mongoose.model("member").find({}));

          case 3:
            member = _context3.sent;
            member.filter(function (e) {
              e.password = undefined;
              return e;
            });
            return _context3.abrupt("return", res.status(200).send(member));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).send(_context3.t0));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
};