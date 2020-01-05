const mongoose = require("mongoose")

module.exports = router => {
    router.put("/", async (req, res) => {
        try {
            let theater = {}
            console.log(req.body)
            await mongoose.model("theater").findByIdAndUpdate(req.body._id, req.body).then(data => {
                theater = data
            })
            return res.status(200).send(theater)
        } catch (e) {
            return res.status(500).send(e)
        }
    })
}