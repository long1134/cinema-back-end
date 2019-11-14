const mongoose = require("mongoose")

module.exports = io =>{

    io.on("connection", (socket)=>{
        socket.on("testSocket", async (id)=>{
            const showtimes = await mongoose.model("showtimes").findById(id)
            io.emit("testSocket",showtimes.map)
        })
    })

}
