const mongoose = require("mongoose")

module.exports = router => {
    router.post("/getshowtimes", async (req, res) => {
        try {
            let showtimes = {}
            await mongoose.model("showtimes").find(req.body).then(data => {
                showtimes = data
            })
            return res.status(200).send(showtimes)
        } catch (e) {
            return res.status(500).send(e)
        }
    })
    router.post("/mobile", async (req, res) => {
        try {
            let showtimes = {}
            console.log(req.body)
            await mongoose.model("showtimes").find({ idFilm: req.body.idFilm, dayShow: req.body.dayShow }).then(data => {
                showtimes = data
            })
            return res.status(200).send(showtimes)
        } catch (e) {
            return res.status(500).send(e)
        }
    })
    router.post("/getByDay", async (req, res) => {
        try {
            let showtimes = []
            await mongoose.model("showtimes").find(req.body).then(data => {
                showtimes = data
            })
            let arr = []
            let result = []
            for (let i = 0; i < showtimes.length; i++) {
                let a = arr.indexOf(showtimes[i].dayShow)
                if (a !== -1) {
                    result[a].push(showtimes[i])
                }
                else {
                    arr.push(showtimes[i].dayShow)
                    result[arr.length - 1] = []
                    result[arr.length - 1].push(showtimes[i])
                }
            }
            // console.log(result)
            return res.status(200).send(result)
        } catch (e) {
            return res.status(500).send(e)
        }
    })
    router.post("/:id", async (req, res) => {
        try {
            let showtimes = {}
            let film = {}
            await mongoose.model("showtimes").findById(req.params.id).then((data) => {
                showtimes = data
            })
            await mongoose.model("film").findById(showtimes.idFilm).then((data) => {
                film = data
            })
            return res.status(200).send({ showtimes, film })
        } catch (e) {
            return res.status(500).send(e)
        }
    })
}