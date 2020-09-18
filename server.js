const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const server = app.listen(port);


var socket = require("socket.io")
var socketServer = socket(server);

socketServer.on("connect", function (socket) {
    console.log(socket.id);
    
    socket.on("message", function (message) {
        console.log(message.type);
        socket.broadcast.emit("notice", message);

    });
});


