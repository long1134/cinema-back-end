const mongoose = require("mongoose")

module.exports = router => {
    router.put("/", async (req, res) => {
        try {
            let cinema = {}
            console.log(req.body)
            await mongoose.model("cinema").findByIdAndUpdate(req.body._id, req.body).then(data => {
                cinema = data
            })
            return res.status(200).send(cinema)
        } catch (e) {
            return res.status(500).send(e)
        }
    })
}