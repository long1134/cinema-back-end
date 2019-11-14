const mongoose = require("mongoose")

module.exports = router =>{
    router.post("/",async (req,res)=>{
        try{
            let showtimes = {}
            await mongoose.model("showtimes").create(req.body).then(data=>{
                showtimes = data
            })
            return res.status(200).send(showtimes)
        }catch(e){
            return res.status(500).send(e)
        }
    })
}