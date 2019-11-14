const mongoose = require("mongoose")
const schema = require("./schema/index")

module.exports = {
    film : mongoose.model("film", schema.film),
    cinema : mongoose.model("cinema", schema.cinema),
    theater : mongoose.model("theater", schema.theater),
    staff : mongoose.model("staff", schema.staff),
    img : mongoose.model("img", schema.img),
    imgEvent : mongoose.model("imgEvent", schema.imgEvent),
    showtimes : mongoose.model("showtimes", schema.showtimes),
    ticket : mongoose.model("ticket", schema.ticket),
    member : mongoose.model("member", schema.member)
}