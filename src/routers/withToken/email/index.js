const sgMail = require("@sendgrid/mail")
const fs = require("fs")
const path = require("path")
const hogan = require("hogan.js")

const template = fs.readFileSync(path.resolve(__dirname,"./views/sample.hjs"), "utf-8")
const complieTemplate = hogan.compile(template) 

sgMail.setApiKey(process.env.API_SENDGRID)

const sendWelcomeEmail = (email, name) => {
    console.log(email)
    const msg = {
        to:email,
        from:"dauan6969@gmail.com",
        subject:"Thanks for joining in!",
        html: complieTemplate.render({name:"long"})
    };
    sgMail.send(msg)
}

module.exports = {
    sendWelcomeEmail
}