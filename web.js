var express = require('express');
var fs = require('fs');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
	//var inFile = 'index.html';
  	//var buf = new Buffer(255);
	//response.send(buf.toString(fs.readFileSync(infile)));
	response.send('Hello');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
