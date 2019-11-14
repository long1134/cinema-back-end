const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

module.exports = router =>{
    router.post("/ticket",async (req,res)=>{
        try{
            var decoded =  await jwt.verify(req.body.token,"token")
            let member = await mongoose.model("member").findById(decoded._id)
            if(member){
                let ticketsInfo = []
                for(let i in member.tickets){
                    let ticket = await mongoose.model("ticket").findById(member.tickets[i])
                    let showtimes = await mongoose.model("showtimes").findById(ticket.idShowtimes)
                    let cinema = await mongoose.model("cinema").findById(showtimes.idCinema)
                    let film = await mongoose.model("film").findById(showtimes.idFilm)
                    let result = {
                        ...ticket._doc,
                        dayShow : showtimes.dayShow,
                        timeShow : showtimes.timeShow,
                        cinemaName : cinema.name,
                        filmName : film.name,
                        img : film.img1
                    }
                    delete result.idShowtimes
                    console.log(result)
                    ticketsInfo.push(result)
                }
                return res.status(200).send(ticketsInfo)
            }
            return res.status(404).send("your username or password is wrong")
        }catch(e){
            return res.status(500).send(e)
        }
    })
    router.post("/info",async (req,res)=>{
        try{
            var decoded =  await jwt.verify(req.body.token,"token")
            let member = await mongoose.model("member").findById(decoded._id)
            if(member){
                delete member.password
                return res.status(200).send(member)
            }
            return res.status(404).send("your username or password is wrong")
        }catch(e){
            return res.status(500).send(e)
        }
    })

}