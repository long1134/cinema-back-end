const mongoose = require("mongoose")
const { sendWelcomeEmail } = require("../email/index")
const fs = require("fs")
const path = require("path")
const hogan = require("hogan.js")
const QRCode = require("qrcode")

const template = fs.readFileSync(path.resolve(__dirname, "../email/views/email.hjs"), "utf-8")
const complieTemplate = hogan.compile(template)

module.exports = (router) => {
  router.post("/", async (req, res) => {
    try {
      let member = req.body
      let errors = []
      let checkEmail = await mongoose
        .model("member")
        .find({ email: member.email })
        .then((e) => {
          console.log(e.length)
          if (e.length !== 0) errors.push("Email")
        })
      let checkUsername = await mongoose
        .model("member")
        .find({ username: member.username })
        .then((e) => {
          if (e.length !== 0) errors.push("Tên đăng nhập")
        })
      let checkPhone = await mongoose
        .model("member")
        .find({ phone: member.phone })
        .then((e) => {
          if (e.length !== 0) errors.push("Điện thoại")
        })
      if (errors.length > 0) {
        return res.status(400).send(errors)
      }
      await mongoose
        .model("member")
        .create(member)
        .then((data) => (member = data))
      return res.status(200).send(member)
    } catch (e) {
      return res.status(500).send(e)
    }
  }),
    router.get("/", async (req, res) => {
      try {
        // view({name:"long"})
        let codeQR = await QRCode.toDataURL("5da692d16aaec137543f0d0a")
        return res.status(200).send(
          complieTemplate.render({
            name: "long",
            tickets: "A1, A2, A3",
            showtimes: "14h30",
            cinema: "Cinema Pandora City",
            theater: "Rap 4",
            codeQR,
          })
        )
      } catch (e) {
        return res.status(500).send(e)
      }
    })
}
