const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

module.exports = router =>{
    router.put("/",async (req,res)=>{
        try{
            var decoded =  await jwt.verify(req.body.token,"token")
            delete req.body.data.password
            delete req.body.data._id
            delete req.body.data.tickets
            delete req.body.data.point
            delete req.body.data.food
            delete req.body.data.level
            console.log(req.body.data)

            let member = await mongoose.model("member").findByIdAndUpdate(decoded._id,{...req.body.data})
            if(member){
                delete member.password
                return res.status(200).send(member)
            }
            return res.status(404).send("your username or password is wrong")
        }catch(e){
            return res.status(500).send(e)
        }
    })
}