const mongoose = require("mongoose")
const Router = require("express").Router()
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

Router.post("/", async(req,res)=>{
    try{
        let username = {
            username : req.body.username
        }
        let userInfo = await mongoose.model("staff").findOne(username)
        let user = {...userInfo._doc}
        delete user.password
        if(userInfo){
            let isMatch = await bcryptjs.compareSync(req.body.password, userInfo.password)

            if(isMatch){
                let token = await userInfo.authToken()
                return res.status(200).send({user,token})
            }
        }
        return res.status(404).send("your username or password is wrong")
    }catch(e){
        return res.writeHead(500)
    }
})

Router.post("/quest", async(req,res)=>{
    try{
        let username = {
            username : req.body.username
        }
        let userInfo = await mongoose.model("member").findOne(username)
        if(userInfo){
            let isMatch = await bcryptjs.compareSync(req.body.password, userInfo.password)

            if(isMatch){
                const token =  await userInfo.userToken()
                let user = {...userInfo._doc}
                delete user.password
                return res.status(200).send({user,token})
            }
        }
        return res.status(404).send("your username or password is wrong")
    }catch(e){
        return res.writeHead(500)
    }
})

module.exports = Router