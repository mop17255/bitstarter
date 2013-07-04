var express = require('express');
var fs = require('fs');

var readFile = function(in){
	var buf = new Buffer(255);
	buf = fs.readFileSync(in);
	return buf;
}

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
	var inFile = 'index.html';
	var bufCont = readFile(inFile);
	var strCon = bufCont.toString('utf8',0,bufCont.length);
  	response.send(strCon);
	//response.send('Hello');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
