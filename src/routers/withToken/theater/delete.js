const mongoose = require("mongoose")

module.exports = router =>{
    router.delete("/:id",async (req,res)=>{
        try{
            let theater = {}
            await mongoose.model("theater").findByIdAndDelete(req.params.id).then(data=>{
                theater = data
            })
            if(theater === null)
                return res.status(404).send("not found")
            return res.status(200).send(theater)
        }catch(e){
            return res.status(500).send(e)
        }
    })
}