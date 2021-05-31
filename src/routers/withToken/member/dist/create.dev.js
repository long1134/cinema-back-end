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

module.exports = function (router) {};