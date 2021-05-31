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
  router.post("/", upload.any(), function _callee(req, res) {
    var img;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            img = "";
            console.log(req.files[0].buffer);
            _context.next = 5;
            return regeneratorRuntime.awrap(mongoose.model("imgEvent").create({
              img: req.files[0].buffer
            }).then(function (data) {
              img = data._id;
            }));

          case 5:
            return _context.abrupt("return", res.status(200).send({
              success: 1,
              file: {
                url: "http://localhost:8080/api/h/imgEvent/" + img
              }
            }));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).send(_context.t0));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
};