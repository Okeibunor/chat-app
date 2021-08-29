// initial Express
const express = require('express');
const app = express();

// create a http server
const http = require('http');
const server = http.createServer(app);

// instantiate websocket with socket.io
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// handle client connection to websocket server
io.on('connection', (socket) => {
    console.log('a user connected');
    // handle event
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    });
    // handle disconnection
    socket.on('disconnect', () => {
        // console.log('user disconnected')
        io.emit('disconnects', 'A user has disconnected')
    });
});
// listen on port for server. 
server.listen(3000, () => {
    console.log('listening on *:3000');
});