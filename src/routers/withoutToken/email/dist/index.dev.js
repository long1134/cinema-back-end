"use strict";

var sgMail = require("@sendgrid/mail");

var fs = require("fs");

var path = require("path");

var hogan = require("hogan.js");

var template = fs.readFileSync(path.resolve(__dirname, "./views/sample.hjs"), "utf-8");
var templatePayment = fs.readFileSync(path.resolve(__dirname, "./views/pay.hjs"), "utf-8");
var complieTemplate = hogan.compile(template);
var complieTemplatePayment = hogan.compile(templatePayment);
sgMail.setApiKey(process.env.API_SENDGRID);

var sendWelcomeEmail = function sendWelcomeEmail(email, name) {
  console.log(email);
  var msg = {
    to: email,
    from: "longnguyenngocthanh99@gmail.com",
    subject: "Thanks for joining in!",
    html: complieTemplate.render({
      name: name
    }),
    text: "hello men"
  };
  sgMail.send(msg);
};

var sendPayEmail = function sendPayEmail(filmName, email, name, showtimes, seatName, combo, cinema, address, theater, idTicket) {
  var codeQR, msg;
  return regeneratorRuntime.async(function sendPayEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          codeQR = "https://api.qrserver.com/v1/create-qr-code/?data=".concat(idTicket, "&amp;size=100x100");
          msg = {
            to: email,
            from: "longnguyenngocthanh99@gmail.com",
            subject: "Thanks for using our services!",
            html: complieTemplatePayment.render({
              filmName: filmName,
              name: name,
              seatName: seatName,
              combo: combo,
              showtimes: showtimes,
              cinema: cinema,
              address: address,
              theater: theater,
              codeQR: codeQR
            })
          };
          sgMail.send(msg).then(function (data) {
            return console.log("done");
          })["catch"](function (err) {
            return console.log("err");
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  sendWelcomeEmail: sendWelcomeEmail,
  sendPayEmail: sendPayEmail
};