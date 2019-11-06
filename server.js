const http = require('http');
const app = require('express')();
// const server = http.Server(app);
// const path = require('path');


app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
})


app.get('/second', function(req, res){
	res.sendFile(__dirname+'/second.html');
})

app.listen(3000, 'localhost', function() {
	console.log('Server running');
});


// app.get(/)
// app.get(/second)
// app.get(new_article)

// app.post(/new_article)