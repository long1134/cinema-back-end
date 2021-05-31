"use strict";

var express = require("express");

require("./db/mongoose");

require("./model");

var cors = require("cors");

var socketio = require("socket.io");

var http = require("http");

var app = express();
var port = process.env.PORT;
var server = http.createServer(app);
var io = socketio(server);
app.use(cors());
app.use(express.json());
app.use("/api", require("./routers"));

require("./realtime/realtime")(io);

server.listen(port, function () {
  console.log("server is on port " + port);
});