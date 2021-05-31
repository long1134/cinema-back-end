"use strict";

var mongoose = require("mongoose");

module.exports = function (router) {
  router.post("/init", function _callee(req, res) {
    var film, cinema, theater, showtimes;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            film = {};
            cinema = {};
            theater = {};
            showtimes = {};
            _context.next = 7;
            return regeneratorRuntime.awrap(mongoose.model("film").find({
              status: "available"
            }).then(function (data) {
              film = data;
            }));

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(mongoose.model('cinema').find().then(function (data) {
              cinema = data;
            }));

          case 9:
            _context.next = 11;
            return regeneratorRuntime.awrap(mongoose.model('theater').find({
              idCinema: cinema[0]._id
            }).then(function (data) {
              theater = data;
            }));

          case 11:
            console.log(req.body);
            _context.next = 14;
            return regeneratorRuntime.awrap(mongoose.model('showtimes').find({
              idCinema: cinema[0]._id,
              idFilm: film[0]._id,
              idTheater: theater[0]._id,
              dayShow: req.body.dayShow
            }).then(function (data) {
              showtimes = data;
            }));

          case 14:
            return _context.abrupt("return", res.status(200).send({
              cinema: cinema,
              film: film,
              theater: theater,
              showtimes: showtimes
            }));

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).send(_context.t0));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 17]]);
  });
  ;
  router.post("/general", function _callee2(req, res) {
    var showtime, theater;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            showtime = {};

            if (!req.body.idTheater) {
              _context2.next = 7;
              break;
            }

            _context2.next = 5;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").find({
              idCinema: req.body.idCinema,
              idFilm: req.body.idFilm,
              idTheater: req.body.idTheater,
              dayShow: req.body.dayShow
            }).then(function (data) {
              console.log(req.body);
              showtime = data;
            }));

          case 5:
            _context2.next = 12;
            break;

          case 7:
            theater = {};
            _context2.next = 10;
            return regeneratorRuntime.awrap(mongoose.model('theater').find({
              idCinema: req.body.idCinema
            }).then(function (data) {
              theater = data;
            }));

          case 10:
            _context2.next = 12;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").find({
              idCinema: req.body.idCinema,
              idFilm: req.body.idFilm,
              idTheater: theater[0]._id,
              dayShow: req.body.dayShow
            }).then(function (data) {
              console.log(req.body);
              showtime = data;
            }));

          case 12:
            return _context2.abrupt("return", res.status(200).send(showtime));

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).send(_context2.t0));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 15]]);
  });
  router.post("/info", function _callee3(req, res) {
    var showtime;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            showtime = {};
            _context3.next = 4;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").find({
              idCinema: req.body.idCinema,
              idTheater: req.body.idTheater,
              dayShow: req.body.dayShow,
              idFilm: req.body.idFilm
            }).then(function (data) {
              showtime = data;
            }));

          case 4:
            return _context3.abrupt("return", res.status(200).send(showtime));

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
  });
  router.get("/revenue/:id", function _callee4(req, res) {
    var id, showtimes;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            showtimes = {};
            _context4.next = 5;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").find({
              idFilm: id
            }).then(function (data) {
              showtimes = data;
            }));

          case 5:
            return _context4.abrupt("return", res.status(200).send(showtimes));

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500).send(_context4.t0));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
  router.get("/revenue_film/", function _callee5(req, res) {
    var films, showtimes, name, revenue, i, temp, j;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            films = {};
            _context5.next = 4;
            return regeneratorRuntime.awrap(mongoose.model("film").find({
              status: "available"
            }).then(function (data) {
              films = data;
            }));

          case 4:
            showtimes = {};
            _context5.next = 7;
            return regeneratorRuntime.awrap(mongoose.model("showtimes").find({}).then(function (data) {
              showtimes = data;
            }));

          case 7:
            name = [];
            revenue = [];

            for (i in films) {
              temp = 0;

              for (j in showtimes) {
                if (films[i]._id.equals(showtimes[j].idFilm)) {
                  temp += showtimes[j].revenueTickets;
                }
              }

              name.push(films[i].name);
              revenue.push(temp);
            }

            return _context5.abrupt("return", res.status(200).send({
              name: name,
              revenue: revenue
            }));

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(500).send(_context5.t0));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 13]]);
  });
  router.get("/revenue_ticket/", function _callee6(req, res) {
    var tickets, name, revenue, count, i, j;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            tickets = [];
            _context6.next = 4;
            return regeneratorRuntime.awrap(mongoose.model("ticket").find({}).then(function (data) {
              tickets = data;
            }));

          case 4:
            name = ['Người lớn', 'Members', 'Trẻ em', 'Sinh viên'];
            revenue = [0, 0, 0, 0];
            count = [0, 0, 0, 0];

            for (i in tickets) {
              for (j in tickets[i].seatsDetail) {
                revenue[name.indexOf(tickets[i].seatsDetail[j].name)] += tickets[i].seatsDetail[j].total;
                count[name.indexOf(tickets[i].seatsDetail[j].name)] += tickets[i].seatsDetail[j].count;
              }
            }

            return _context6.abrupt("return", res.status(200).send({
              name: name,
              revenue: revenue,
              count: count
            }));

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(500).send(_context6.t0));

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 11]]);
  });
  router.get("/revenue_combo/", function _callee7(req, res) {
    var tickets, name, revenue, count, i, j;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            tickets = [];
            _context7.next = 4;
            return regeneratorRuntime.awrap(mongoose.model("ticket").find({}).then(function (data) {
              tickets = data;
            }));

          case 4:
            name = ['Combo 1', 'Combo 2', 'Family 2 Voucher'];
            revenue = [0, 0, 0];
            count = [0, 0, 0];

            for (i in tickets) {
              for (j in tickets[i].foodsDetail) {
                revenue[name.indexOf(tickets[i].foodsDetail[j].name)] += tickets[i].foodsDetail[j].total;
                count[name.indexOf(tickets[i].foodsDetail[j].name)] += tickets[i].foodsDetail[j].count;
              }
            }

            return _context7.abrupt("return", res.status(200).send({
              name: name,
              revenue: revenue,
              count: count
            }));

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](0);
            return _context7.abrupt("return", res.status(500).send(_context7.t0));

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 11]]);
  });
};