const sgMail = require("@sendgrid/mail")
const fs = require("fs")
const path = require("path")
const hogan = require("hogan.js")

const template = fs.readFileSync(path.resolve(__dirname,"./views/sample.hjs"), "utf-8")
const templatePayment = fs.readFileSync(path.resolve(__dirname,"./views/pay.hjs"), "utf-8")
const complieTemplate = hogan.compile(template) 
const complieTemplatePayment = hogan.compile(templatePayment) 

sgMail.setApiKey(process.env.API_SENDGRID)

const sendWelcomeEmail = (email, name) => {
    console.log(email)
    const msg = {
        to:email,
        from:"longnguyenngocthanh99@gmail.com",
        subject:"Thanks for joining in!",
        html: complieTemplate.render({name:name}),
        text:"hello men"
    };
    sgMail.send(msg)
}

const sendPayEmail = async(filmName, email, name, showtimes , seatName, combo, cinema, address, theater, idTicket) => {
    const codeQR = `https://api.qrserver.com/v1/create-qr-code/?data=${idTicket}&amp;size=100x100`
    const msg = {
        to:email,
        from:"longnguyenngocthanh99@gmail.com",
        subject:"Thanks for using our services!",
        html: complieTemplatePayment.render({filmName, name,seatName,combo,showtimes,cinema,address,theater,codeQR})
    };
    sgMail.send(msg).then(data=>console.log("done")).catch(err=>console.log("err"))
}

module.exports = {
    sendWelcomeEmail,
    sendPayEmail
}