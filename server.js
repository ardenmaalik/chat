//-----------------------------------------------------------------------------
// Configure Express.
//-----------------------------------------------------------------------------
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');
var users = {};
var name = '';
var moment = require('moment');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

server.listen(process.env.PORT || 3000, function () {
    console.log('Server is listening');
});

//-----------------------------------------------------------------------------
// Routes.
//-----------------------------------------------------------------------------
app.get("/:name", function (req, res) {
    name = req.params.name;
    res.render("chat");
});

//-----------------------------------------------------------------------------
// Configure web sockets.
//-----------------------------------------------------------------------------
io.on("connection", (socket) => {
    users[socket.id] = name;
    console.log(users[socket.id] + ' connected')
    socket.broadcast.emit("new-user", users[socket.id] +
        " has joined");

    socket.on("chat-message", (message) => {
        io.sockets.emit("chat-message", users[socket.id] +
            ": " + message + '<br>' + moment().calendar());

    });

});