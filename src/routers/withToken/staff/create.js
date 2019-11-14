const mongoose = require("mongoose")

module.exports = router => {
    router.post("/", async(req,res)=>{
        try{
            let staff = await mongoose.model("staff").create(req.body)
            delete req.body.password
            console.log(req.body)
            const data = req.body
            res.status(200).send(data)
        }catch(e){
            res.status(500).send(e)
        }
    })
}