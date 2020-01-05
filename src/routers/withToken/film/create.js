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
    router.post("/", upload.any(), async (req, res) => {
        try {
            let img1 = ""
            let img2 = ""
            await mongoose.model("img").create({ img: req.files[0].buffer }).then(data => {
                img1 = data._id
            })
            await mongoose.model("img").create({ img: req.files[1].buffer }).then(data => {
                img2 = data._id
            })
            const movies = await mongoose.model("film").create({
                ...req.body,
                img1: img1,
                img2: img2
            })
            return res.status(200).send(movies)
        } catch (e) {
            return res.status(500).send(e)
        }
    })
}