const mongoose = require("mongoose")
const multer = require("multer")

const upload = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

module.exports = router => {
    router.put("/:id", upload.any(), async (req, res) => {
        try {
            let img1 = ""
            let img2 = ""
            let film = await mongoose.model("film").findById(req.body._id)
            // console.log(req.body)
            // console.log(req.files)
            if (!req.body.img1) {
                await mongoose.model("img").findByIdAndDelete(film.img1).then(() => console.log("Deleted img1"))
                await req.files.map(async (e) => {
                    if (e.fieldname === "img1") {
                        await mongoose.model("img").create({ img: e.buffer }).then(async (data) => {
                            img1 = data._id
                            await mongoose.model('film').findByIdAndUpdate(req.body._id, { img1: img1 }).then(data => { console.log(data) }).catch(e => console.log(e))
                        })
                    }
                })
            }
            if (!req.body.img2) {
                await mongoose.model("img").findByIdAndDelete(film.img2).then(() => console.log("Deleted img2"))
                req.files.map(async (e) => {
                    if (e.fieldname === "img2") {
                        await mongoose.model("img").create({ img: e.buffer }).then(async (data) => {
                            img2 = data._id
                            await mongoose.model('film').findByIdAndUpdate(req.body._id, { img2: img2 })
                        })
                    }
                })
            }
            await mongoose.model("film").findByIdAndUpdate(req.params.id, req.body)
            film = await mongoose.model("film").findById(req.body._id)
            return res.status(200).send(film)
        } catch (e) {
            return res.status(500).send(e)
        }
    })
}
