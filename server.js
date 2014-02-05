var express	= require('express')
var app		= require('express')()
var server	= require('http').createServer(app)
var io		= require('socket.io').listen(server);
server.listen(8000);

app.use(express.static(__dirname + '/'))

io.set('log level', 1);
io.sockets.on('connection', function (socket) {
	socket.on('echoMessage', function (data) {
		// console.log('received data to echo')
		socket.broadcast.emit('echoMessage', data)
	});
});