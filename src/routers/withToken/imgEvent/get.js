const mongoose = require("mongoose")

module.exports = router =>{
    router.get("/:id",async (req,res)=>{
        await mongoose.model("imgEvent").findById(req.params.id).then((result)=>{
            res.set("Content-Type","image/jpg")
            res.send(result.img)
        }).catch(e=>{
            res.send(e)
        })
    })
}