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


module.exports = router =>{
    router.post("/",upload.any(),async (req,res)=>{
        try{
            let img = ""
            console.log(req.files[0].buffer)
            await mongoose.model("imgEvent").create({img:req.files[0].buffer}).then(data=>{
                img = data._id
            })
            return res.status(200).send( {
                success : 1,
                file : {
                    url:"http://localhost:8080/api/h/imgEvent/"+img
                }}
            )
        }catch(e){
            return res.status(500).send(e)
        }
    })
}