"use strict";

var mongoose = require("mongoose");

var multer = require("multer");

var upload = multer({
  fileFilter: function fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }

    cb(undefined, true);
  }
});

module.exports = function (router) {
  router.put("/:id", upload.any(), function _callee5(req, res) {
    var img1, img2, film;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            img1 = "";
            img2 = "";
            _context5.next = 5;
            return regeneratorRuntime.awrap(mongoose.model("film").findById(req.body._id));

          case 5:
            film = _context5.sent;

            if (req.body.img1) {
              _context5.next = 11;
              break;
            }

            _context5.next = 9;
            return regeneratorRuntime.awrap(mongoose.model("img").findByIdAndDelete(film.img1).then(function () {
              return console.log("Deleted img1");
            }));

          case 9:
            _context5.next = 11;
            return regeneratorRuntime.awrap(req.files.map(function _callee2(e) {
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!(e.fieldname === "img1")) {
                        _context2.next = 3;
                        break;
                      }

                      _context2.next = 3;
                      return regeneratorRuntime.awrap(mongoose.model("img").create({
                        img: e.buffer
                      }).then(function _callee(data) {
                        return regeneratorRuntime.async(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                img1 = data._id;
                                _context.next = 3;
                                return regeneratorRuntime.awrap(mongoose.model('film').findByIdAndUpdate(req.body._id, {
                                  img1: img1
                                }).then(function (data) {
                                  console.log(data);
                                })["catch"](function (e) {
                                  return console.log(e);
                                }));

                              case 3:
                              case "end":
                                return _context.stop();
                            }
                          }
                        });
                      }));

                    case 3:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            }));

          case 11:
            if (req.body.img2) {
              _context5.next = 15;
              break;
            }

            _context5.next = 14;
            return regeneratorRuntime.awrap(mongoose.model("img").findByIdAndDelete(film.img2).then(function () {
              return console.log("Deleted img2");
            }));

          case 14:
            req.files.map(function _callee4(e) {
              return regeneratorRuntime.async(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      if (!(e.fieldname === "img2")) {
                        _context4.next = 3;
                        break;
                      }

                      _context4.next = 3;
                      return regeneratorRuntime.awrap(mongoose.model("img").create({
                        img: e.buffer
                      }).then(function _callee3(data) {
                        return regeneratorRuntime.async(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                img2 = data._id;
                                _context3.next = 3;
                                return regeneratorRuntime.awrap(mongoose.model('film').findByIdAndUpdate(req.body._id, {
                                  img2: img2
                                }));

                              case 3:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        });
                      }));

                    case 3:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            });

          case 15:
            _context5.next = 17;
            return regeneratorRuntime.awrap(mongoose.model("film").findByIdAndUpdate(req.params.id, req.body));

          case 17:
            _context5.next = 19;
            return regeneratorRuntime.awrap(mongoose.model("film").findById(req.body._id));

          case 19:
            film = _context5.sent;
            return _context5.abrupt("return", res.status(200).send(film));

          case 23:
            _context5.prev = 23;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(500).send(_context5.t0));

          case 26:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 23]]);
  });
};