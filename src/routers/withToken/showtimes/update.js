const mongoose = require("mongoose")

module.exports = router =>{
    router.put("/:id",async (req,res)=>{
        try{
            let showtimes = {}
            await mongoose.model("showtimes").findByIdAndUpdate(req.params.id,req.body)
            showtimes = await mongoose.model("showtimes").findById(req.params.id)
            return res.status(200).send(showtimes)
        }catch(e){
            return res.status(500).send(e)
        }
    })
    router.put("/",async (req,res)=>{
        try{
            console.log(req.body)
            let showtimes = {}
            await mongoose.model("showtimes").updateMany({},req.body)
            return res.status(200).send(showtimes)
        }catch(e){
            return res.status(500).send(e)
        }
    })
}