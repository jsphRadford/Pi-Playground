var http = require('http').createServer(handler); // require http server, and create server with function handler()
var fs = require('fs'); // require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)

http.listen(8080); // listen on port 8080

function handler (req, res) { //  create server
	fs.readFile(__dirname + '/public/index.html', function(err, data) { // read file index.html in public folder
		if (err) {
			res.writeHead(404, {'Content-Type': 'text/html'}); // display 404 on error
			return res.end("404 Not Found");
		}
		res.writeHead(200, {'Content-Type': 'text/html'}); // write HTML
		res.write(data); // write data from index.html
		return res.end();
	});
}

io.sockets.on('connection', function(socket) {//WebSocket Connection
	var lightvalue = 0; //static variable for current status
	socket.on('light', function(data) { //Get light switch status from client
		lightvalue = data;
		if (lightvalue) {
			console.log(lightValue); //turn LED on or off, for now just log in console
		}
	});
});
