var express = require('express');
var fs = require('fs');

//Reads content from input file
var infile='index.html';
var buf;

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send(buf.toString(fs.readFileSync(infile)));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
