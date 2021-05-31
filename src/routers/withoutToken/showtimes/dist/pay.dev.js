"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require("mongoose");

var JWT = require("jsonwebtoken");

var freeze = require("deep-freeze");

var _require = require('../email/index'),
    sendPayEmail = _require.sendPayEmail,
    sendWelcomeEmail = _require.sendWelcomeEmail;

module.exports = function (router) {
  router.put("/pay/:id", function _callee(req, res) {
    var showtimes, frezzeBody, ticket, decoded, member, temp, updateMember, cinema, theater, showCombo, i, newShowtimes, oldShowtimes, tempTicket, tempCombo;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            //update showtimes from 0 -> 1
            showtimes = {};
            _context.next = 4;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").findById(req.params.id));

          case 4:
            showtimes = _context.sent;
            frezzeBody = _objectSpread({}, req.body.showtimes); // console.log(frezzeBody)

            ticket = {
              idShowtimes: req.params.id,
              seatName: req.body.detailSeats.join(", "),
              price: frezzeBody.revenue,
              foodsDetail: frezzeBody.combo,
              seatsDetail: frezzeBody.detailTickets
            };
            _context.next = 9;
            return regeneratorRuntime.awrap(mongoose.model("ticket").create(_objectSpread({}, ticket)).then(function (data) {
              ticket = data;
            })["catch"](function (error) {
              return console.log(error);
            }));

          case 9:
            console.log(req.body); // console.log(req.body.showtimes)

            _context.next = 12;
            return regeneratorRuntime.awrap(JWT.verify(req.body.token, "token"));

          case 12:
            decoded = _context.sent;
            _context.next = 15;
            return regeneratorRuntime.awrap(mongoose.model("member").findById(decoded._id));

          case 15:
            member = _context.sent;
            temp = member.tickets;
            temp = temp.push(ticket._id);
            _context.next = 20;
            return regeneratorRuntime.awrap(mongoose.model("member").findByIdAndUpdate(decoded._id, {
              tickets: _toConsumableArray(member.tickets),
              point: ticket.price / 1000 + member.point
            }));

          case 20:
            updateMember = _context.sent;
            _context.next = 23;
            return regeneratorRuntime.awrap(mongoose.model("cinema").findById(showtimes.idCinema));

          case 23:
            cinema = _context.sent;
            _context.next = 26;
            return regeneratorRuntime.awrap(mongoose.model("theater").findById(showtimes.idTheater));

          case 26:
            theater = _context.sent;
            showCombo = "";

            for (i in frezzeBody.combo) {
              showCombo += frezzeBody.combo[i].name + " : ".concat(frezzeBody.combo[i].detail, "  (").concat(frezzeBody.combo[i].count, "),");
            }

            sendPayEmail(req.body.filmName, member.email, member.name, showtimes.timeShow, ticket.seatName, showCombo, cinema.name, cinema.address, theater.name, ticket._id); // console.log(cinema)

            newShowtimes = _objectSpread({}, req.body.showtimes);
            _context.next = 33;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").findById(req.params.id));

          case 33:
            oldShowtimes = _context.sent;
            tempTicket = newShowtimes.detailTickets.map(function (ticket) {
              return ticket.name;
            });
            tempCombo = newShowtimes.combo.map(function (combo) {
              return combo.name;
            });
            newShowtimes.tickets = oldShowtimes.tickets;
            oldShowtimes.detailTickets.map(function (oldTicket) {
              if (tempTicket.indexOf(oldTicket.name) === -1) {
                newShowtimes.detailTickets.push(oldTicket);
              } else newShowtimes.detailTickets.map(function (newTicket) {
                if (newTicket.name === oldTicket.name) {
                  newTicket.count += oldTicket.count;
                  newTicket.total += newTicket.total;
                }

                return newTicket;
              });
            });
            oldShowtimes.combo.map(function (oldCombo) {
              if (tempCombo.indexOf(oldCombo.name) === -1) {
                newShowtimes.combo.push(oldCombo);
              } else newShowtimes.combo.map(function (newCombo) {
                if (newCombo.name === oldCombo.name) {
                  newCombo.count += oldCombo.count;
                  newCombo.total += oldCombo.total;
                }

                return newCombo;
              });
            });
            newShowtimes.tickets += req.body.detailSeats.length;
            newShowtimes.revenueTickets += showtimes.revenueTickets;
            newShowtimes.revenue += showtimes.revenue;
            newShowtimes.revenueCombo += showtimes.revenueCombo; // console.log(newShowtimes)

            _context.next = 45;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").findByIdAndUpdate(req.params.id, _objectSpread({}, newShowtimes)));

          case 45:
            return _context.abrupt("return", res.status(200).send(showtimes));

          case 48:
            _context.prev = 48;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).send(_context.t0));

          case 51:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 48]]);
  });
  router.put("/pay", function _callee2(req, res) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            console.log(req.body);
            return _context2.abrupt("return", res.status(200).send(req.body));

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).send(_context2.t0));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 5]]);
  });
};