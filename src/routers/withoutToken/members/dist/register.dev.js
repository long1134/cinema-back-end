"use strict";

var mongoose = require("mongoose");

var _require = require('../email/index'),
    sendWelcomeEmail = _require.sendWelcomeEmail;

var fs = require("fs");

var path = require("path");

var hogan = require("hogan.js");

var QRCode = require("qrcode");

var template = fs.readFileSync(path.resolve(__dirname, "../email/views/email.hjs"), "utf-8");
var complieTemplate = hogan.compile(template);

module.exports = function (router) {
  router.post("/", function _callee(req, res) {
    var member, errors, checkEmail, checkUsername, checkPhone;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            member = req.body;
            errors = [];
            _context.next = 5;
            return regeneratorRuntime.awrap(mongoose.model("member").find({
              email: member.email
            }).then(function (e) {
              console.log(e.length);
              if (e.length !== 0) errors.push('Email');
            }));

          case 5:
            checkEmail = _context.sent;
            _context.next = 8;
            return regeneratorRuntime.awrap(mongoose.model("member").find({
              username: member.username
            }).then(function (e) {
              if (e.length !== 0) errors.push('Tên đăng nhập');
            }));

          case 8:
            checkUsername = _context.sent;
            _context.next = 11;
            return regeneratorRuntime.awrap(mongoose.model("member").find({
              phone: member.phone
            }).then(function (e) {
              if (e.length !== 0) errors.push('Điện thoại');
            }));

          case 11:
            checkPhone = _context.sent;

            if (!(errors.length > 0)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(400).send(errors));

          case 14:
            _context.next = 16;
            return regeneratorRuntime.awrap(mongoose.model("member").create(member).then(function (data) {
              return member = data;
            }));

          case 16:
            return _context.abrupt("return", res.status(200).send(member));

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).send(_context.t0));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 19]]);
  }), router.get("/", function _callee2(req, res) {
    var codeQR;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(QRCode.toDataURL("5da692d16aaec137543f0d0a"));

          case 3:
            codeQR = _context2.sent;
            return _context2.abrupt("return", res.status(200).send(complieTemplate.render({
              name: "long",
              tickets: "A1, A2, A3",
              showtimes: "14h30",
              cinema: "Cinema Pandora City",
              theater: "Rap 4",
              codeQR: codeQR
            })));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).send(_context2.t0));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });
};