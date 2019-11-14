const mongoose = require("mongoose")

module.exports = router =>{
    router.post("/",async (req,res)=>{
        try{
            let theater = {}
            await mongoose.model("theater").create(req.body).then(data=>{
                theater = data
            })
            return res.status(200).send(theater)
        }catch(e){
            return res.status(500).send(e)
        }
    })
}