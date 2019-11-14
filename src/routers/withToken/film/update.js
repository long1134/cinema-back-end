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
    router.put("/:id",upload.any(), async(req,res)=>{
        try{
            await mongoose.model("film").findByIdAndUpdate(req.params.id,req.body)
            const movie = await mongoose.model("film").findById(req.params.id)
            return res.status(200).send(movie)
        }catch(e){
            return res.status(500).send(e)
        }
    })
}
