const mongoose = require("mongoose")

module.exports = router =>{
    router.get("/",async (req,res)=>{
        try{
            let cinema = {}
            await mongoose.model("cinema").find().then(data => {
                cinema = data
            })
            return res.status(200).send(cinema)
        }catch(e){
            return res.status(500).send(e)
        }
    })
}