const mongoose = require("mongoose")

module.exports = router =>{
    router.post("/",async (req,res)=>{
        try{
            let cinema = {}
            await mongoose.model("cinema").create(req.body).then(data => {
                cinema = data
            })
            return res.status(200).send(cinema)
        }catch(e){
            return res.status(500).send(e)
        }
    })
}