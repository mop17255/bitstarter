var express = require('express');
var fs = require('fs');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
	var inFile = "index.html";
	var bufCont = new Buffer(50);
	bufCont = fs.readFileSync(inFile,'utf8');
	var strCon = bufCont.toString('utf8',0,bufCont.length);
  	response.send(strCon);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
