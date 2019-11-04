var http = require('http');
var fs = require('fs');


var server = http.createServer(function(req, res) {
	// res.statusCode = 200;
	fs.readFile('index.html', function(err, data){
		if(err){
			res.setHeader('Content-Type', 'text/plain')
			res.statusCode = 404;
			res.end('file not found');
		}
		res.setHeader('Content-Type', 'text/html');
		res.statusCode = 200;
		res.end(data);
	})
});
server.listen(3000, 'localhost', function() {
	console.log('Server running');
});