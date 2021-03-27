const axios = require('axios');
const express = require('express');
const app = express();
const server = require('http').createServer(app);


const io = require('socket.io')(server, {
    cors: {origin: "*"}
});

server.listen( process.env.PORT || 3001, () => {
    console.log("Server running on port 3001!");
});

io.on('connection', (socket) => {
    console.log("User connected " + socket.id);
    setInterval( () => {
        axios.get('https://api.coinbase.com/v2/prices/BTC-INR/spot').then( (res) => {
            socket.emit('refresh', res.data.data.amount);
        }).catch((err) => {
            console.log(err);
        });
    }, 500);
})