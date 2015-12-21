var http = require('http');

var server = http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type' : 'text/html'});
	// Current server does not utilize any html files
	res.end('<h1 style="text-align: center">roomTap...</h1>');
});

// Allows the port to either read off the environment variable (e.g. heroku) or set it to 3000
var path = Number(process.env.PORT || 3000);

server.listen(path);

console.log('Server listening on: ', path);