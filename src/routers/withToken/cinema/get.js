const mongoose = require("mongoose")

module.exports = router => {
    router.get("/", async (req, res) => {
        try {
            let cinema = {}
            await mongoose.model("cinema").find().then(data => {
                cinema = data
            })
            return res.status(200).send(cinema)
        } catch (e) {
            return res.status(500).send(e)
        }
    });
    router.get("/:id", async (req, res) => {
        try {
            let theater = []
            await mongoose.model("theater").find({ idCinema: req.params.id }).then(data => {
                theater = data
            })
            return res.status(200).send(theater)
        } catch (e) {
            return res.status(500).send(e)
        }
    })
}