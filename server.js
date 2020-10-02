var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5050;

server.listen(port, () => console.log(`Server running on port ${port}`));


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {

    // Welcome message
    socket.broadcast.emit('message', 'Willkommen zum Oktoberfest');

    // User disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'Disconnected');
    });

    // Listen for chat message
    socket.on('chatMessage', msg => {
        io.emit('message', msg);
    });
});


