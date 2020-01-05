const mongoose = require("mongoose")

module.exports = router => {
    router.post("/init", async (req, res) => {
        try {
            let film = {}
            let cinema = {}
            let theater = {}
            let showtimes = {}
            await mongoose.model("film").find({ status: "available" }).then(data => {
                film = data
            })
            await mongoose.model('cinema').find().then(data => {
                cinema = data
            })
            await mongoose.model('theater').find({ idCinema: cinema[0]._id }).then(data => {
                theater = data
            })
            console.log(req.body)
            await mongoose.model('showtimes').find({
                idCinema: cinema[0]._id,
                idFilm: film[0]._id,
                idTheater: theater[0]._id,
                dayShow: req.body.dayShow
            }).then(data => {
                showtimes = data
            })
            return res.status(200).send({ cinema, film, theater, showtimes })
        } catch (e) {
            return res.status(500).send(e)
        }
    });;
    router.post("/general", async (req, res) => {
        try {
            let showtime = {}
            if (req.body.idTheater) {
                await mongoose.model("showtimes").find({
                    idCinema: req.body.idCinema,
                    idFilm: req.body.idFilm,
                    idTheater: req.body.idTheater,
                    dayShow: req.body.dayShow
                }).then(data => {
                    console.log(req.body)
                    showtime = data
                })

            }
            else {
                let theater = {}
                await mongoose.model('theater').find({ idCinema: req.body.idCinema }).then(data => {
                    theater = data
                })
                await mongoose.model("showtimes").find({
                    idCinema: req.body.idCinema,
                    idFilm: req.body.idFilm,
                    idTheater: theater[0]._id,
                    dayShow: req.body.dayShow
                }).then(data => {
                    console.log(req.body)
                    showtime = data
                })
            }
            return res.status(200).send(showtime)
        } catch (e) {
            return res.status(500).send(e)
        }
    });
    router.post("/info", async (req, res) => {
        try {
            let showtime = {}
            await mongoose.model("showtimes").find({
                idCinema: req.body.idCinema,
                idTheater: req.body.idTheater,
                dayShow: req.body.dayShow,
                idFilm: req.body.idFilm
            }).then(data => {
                showtime = data
            })
            return res.status(200).send(showtime)
        } catch (e) {
            return res.status(500).send(e)
        }
    });
    router.get("/revenue/:id", async (req, res) => {
        try {
            let id = req.params.id
            let showtimes = {}
            await mongoose.model("showtimes").find({ idFilm: id }).then(data => {
                showtimes = data
            })
            return res.status(200).send(showtimes)
        } catch (e) {
            return res.status(500).send(e)
        }
    });
    router.get("/revenue_film/", async (req, res) => {
        try {
            let films = {}
            await mongoose.model("film").find({ status: "available" }).then(data => {
                films = data
            })
            let showtimes = {}
            await mongoose.model("showtimes").find({}).then(data => {
                showtimes = data
            })

            let name = []
            let revenue = []
            for (let i in films) {
                let temp = 0
                for (let j in showtimes) {
                    if (films[i]._id.equals(showtimes[j].idFilm)) {
                        temp += showtimes[j].revenueTickets
                    }
                }
                name.push(films[i].name)
                revenue.push(temp)
            }
            return res.status(200).send({ name, revenue })
        } catch (e) {
            return res.status(500).send(e)
        }
    })
    router.get("/revenue_ticket/", async (req, res) => {
        try {
            let tickets = []
            await mongoose.model("ticket").find({}).then(data => {
                tickets = data
            })

            let name = [
                'Người lớn',
                'Members',
                'Trẻ em',
                'Sinh viên',]
            let revenue = [0, 0, 0, 0]
            let count = [0, 0, 0, 0]
            for (let i in tickets) {
                for (let j in tickets[i].seatsDetail) {
                    revenue[name.indexOf(tickets[i].seatsDetail[j].name)] += tickets[i].seatsDetail[j].total
                    count[name.indexOf(tickets[i].seatsDetail[j].name)] += tickets[i].seatsDetail[j].count
                }
            }
            return res.status(200).send({ name, revenue, count })
        } catch (e) {
            return res.status(500).send(e)
        }
    })
    router.get("/revenue_combo/", async (req, res) => {
        try {
            let tickets = []
            await mongoose.model("ticket").find({}).then(data => {
                tickets = data
            })

            let name = [
                'Combo 1',
                'Combo 2',
                'Family 2 Voucher',]
            let revenue = [0, 0, 0]
            let count = [0, 0, 0]
            for (let i in tickets) {
                for (let j in tickets[i].foodsDetail) {
                    revenue[name.indexOf(tickets[i].foodsDetail[j].name)] += tickets[i].foodsDetail[j].total
                    count[name.indexOf(tickets[i].foodsDetail[j].name)] += tickets[i].foodsDetail[j].count
                }
            }
            return res.status(200).send({ name, revenue, count })
        } catch (e) {
            return res.status(500).send(e)
        }
    })
}