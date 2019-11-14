const express = require("express")
require("./db/mongoose")
require("./model")
const cors = require("cors")
const socketio = require("socket.io")
const http = require("http")

const app = express()
const port = process.env.PORT
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())
app.use(express.json())

app.use("/api",require("./routers"))
require("./realtime/realtime")(io)

server.listen(port, ()=>{
    console.log("server is on port "+port)
})