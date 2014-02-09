//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

// serve local dir as static
var static	= require('node-static');
var file	= new static.Server('./');

var app	= require('http').createServer(function( request, response ){
	request.addListener('end', function () {
		file.serve(request, response);
	}).resume()
})

app.listen(8000)

//////////////////////////////////////////////////////////////////////////////////
//		socket.io							//
//////////////////////////////////////////////////////////////////////////////////

var io	= require('socket.io').listen(app)
// limit the log level of socket.io
io.set('log level', 1)


io.sockets.on('connection', function (socket) {
	socket.on('echoMessage', function (data) {
		console.log('Echo message : "'+data.type+'"')
		// process.stdout.write('.');
		socket.broadcast.emit('echoMessage', data)
	});
});