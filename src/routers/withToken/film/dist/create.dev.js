"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  router.post("/", upload.any(), function _callee(req, res) {
    var img1, img2, movies;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            img1 = "";
            img2 = "";
            _context.next = 5;
            return regeneratorRuntime.awrap(mongoose.model("img").create({
              img: req.files[0].buffer
            }).then(function (data) {
              img1 = data._id;
            }));

          case 5:
            _context.next = 7;
            return regeneratorRuntime.awrap(mongoose.model("img").create({
              img: req.files[1].buffer
            }).then(function (data) {
              img2 = data._id;
            }));

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(mongoose.model("film").create(_objectSpread({}, req.body, {
              img1: img1,
              img2: img2
            })));

          case 9:
            movies = _context.sent;
            return _context.abrupt("return", res.status(200).send(movies));

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).send(_context.t0));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 13]]);
  });
};