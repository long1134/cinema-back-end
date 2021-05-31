"use strict";

var sgMail = require("@sendgrid/mail");

var fs = require("fs");

var path = require("path");

var hogan = require("hogan.js");

var template = fs.readFileSync(path.resolve(__dirname, "./views/sample.hjs"), "utf-8");
var complieTemplate = hogan.compile(template);
sgMail.setApiKey(process.env.API_SENDGRID);

var sendWelcomeEmail = function sendWelcomeEmail(email, name) {
  console.log(email);
  var msg = {
    to: email,
    from: "dauan6969@gmail.com",
    subject: "Thanks for joining in!",
    html: complieTemplate.render({
      name: "long"
    })
  };
  sgMail.send(msg);
};

module.exports = {
  sendWelcomeEmail: sendWelcomeEmail
};