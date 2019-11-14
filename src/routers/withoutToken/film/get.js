const mongoose = require("mongoose")

module.exports = router =>{
    router.get("/available", async(req,res)=>{
        try{
            const movies = await mongoose.model("film").find({status: "available"})
            return res.status(200).send(movies)
        }catch(e){
            return res.status(500).send(e)
        }
    }),
    router.get("/coming",async(req,res)=>{
        try{
            const movies = await mongoose.model("film").find({status : "coming"})
            return res.status(200).send(movies)
        }catch(e){
            return res.status(500).send(e)
        }
    }),
    router.get("/:id",async(req,res)=>{
        try{
            const movies = await mongoose.model("film").findById(req.params.id)
            return res.status(200).send(movies)
        }catch(e){
            return res.status(500).send(e)
        }
    }),
    router.get("/",async(req,res)=>{
        try{
            const movies = await mongoose.model("film").findById(req.params.id)
            return res.status(200).send(movies)
        }catch(e){
            return res.status(500).send(e)
        }
    })
}