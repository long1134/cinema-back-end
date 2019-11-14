const mongoose = require("mongoose")
const JWT = require("jsonwebtoken")
const freeze = require("deep-freeze")
const {sendPayEmail, sendWelcomeEmail} = require('../email/index')

module.exports = router =>{
    router.put("/pay/:id",async (req,res)=>{
        try{
            //update showtimes from 0 -> 1
            let showtimes = {}
            showtimes = await mongoose.model("showtimes").findById(req.params.id)
            const frezzeBody = {...req.body.showtimes}
            // console.log(frezzeBody)
            let ticket =  {
                idShowtimes : req.params.id,
                seatName : req.body.detailSeats.join(", "),
                price : frezzeBody.revenue,
                foodsDetail : frezzeBody.combo,
                seatsDetail : frezzeBody.detailTickets
            }
            
            await mongoose.model("ticket").create({
                ...ticket
            }).then(data=> {
                ticket = data
            }).catch(
                error=>console.log(error)
            )
            // console.log(ticket)
            // console.log(req.body.showtimes)
            var decoded =  await JWT.verify(req.body.token,"token")
            let member = await mongoose.model("member").findById(decoded._id)
            let temp = member.tickets
            temp = temp.push(ticket._id)
            let updateMember = await mongoose.model("member").findByIdAndUpdate(decoded._id,{tickets :[...member.tickets], point : (ticket.price/1000+member.point)})
            // console.log(updateMember)
            let cinema = await mongoose.model("cinema").findById(showtimes.idCinema)
            let theater = await mongoose.model("theater").findById(showtimes.idTheater)
            let showCombo = ""
            for(let i in frezzeBody.combo){
                showCombo += frezzeBody.combo[i].name + ` : ${frezzeBody.combo[i].detail}  (${frezzeBody.combo[i].count}),`
            }
            sendPayEmail(req.body.filmName, member.email, member.name,showtimes.timeShow  , ticket.seatName,showCombo,cinema.name,cinema.address, theater.name, ticket._id)
            // console.log(cinema)
            let newShowtimes = {...req.body.showtimes}
            let oldShowtimes =  await mongoose.model("showtimes").findById(req.params.id)
            let tempTicket = newShowtimes.detailTickets.map(ticket=>ticket.name)
            let tempCombo = newShowtimes.combo.map(combo=>combo.name)
            newShowtimes.tickets = oldShowtimes.tickets
            oldShowtimes.detailTickets.map(oldTicket=>{
                if(tempTicket.indexOf(oldTicket.name) === -1){
                    newShowtimes.detailTickets.push(oldTicket)
                }
                else
                    newShowtimes.detailTickets.map(newTicket=>{
                        if(newTicket.name === oldTicket.name){
                            newTicket.count += oldTicket.count
                            newTicket.total += newTicket.total
                        }
                        return newTicket
                    })
            })
            oldShowtimes.combo.map(oldCombo=>{
                if(tempCombo.indexOf(oldCombo.name) === -1){
                    newShowtimes.combo.push(oldCombo)
                }
                else
                    newShowtimes.combo.map(newCombo=>{
                        if(newCombo.name === oldCombo.name){
                            newCombo.count += oldCombo.count
                            newCombo.total += oldCombo.total
                        }
                        return newCombo
                    })
            })
            newShowtimes.tickets += req.body.detailSeats.length
            newShowtimes.revenueTickets += showtimes.revenueTickets
            newShowtimes.revenue += showtimes.revenue
            newShowtimes.revenueCombo += showtimes.revenueCombo
            // console.log(newShowtimes)
            await mongoose.model("showtimes").findByIdAndUpdate(req.params.id,{
                ...newShowtimes
            })
            // console.log(newShowtimes)
            return res.status(200).send(showtimes)
        }catch(e){
            return res.status(500).send(e)
        }
    })
}