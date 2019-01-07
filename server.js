//-----------------------------------------------------------------------------
// Configure Express.
//-----------------------------------------------------------------------------
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

server.listen(process.env.PORT || 3000, function () {
    console.log('Server is listening');
});

//-----------------------------------------------------------------------------
// Routes.
//-----------------------------------------------------------------------------
app.get("/", function (req, res) {
    res.render("chat");
});

//-----------------------------------------------------------------------------
// Configure web sockets.
//-----------------------------------------------------------------------------
io.on('connection', socket => {
	console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('message', message => {
		console.log('message: ' + message);
		//Broadcast the message to everyone
		io.emit('message', message);
	});
});