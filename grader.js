#!/usr/bin/env node

var sys = require('util');
var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var rest = require('restler');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
var URL_DEFAULT = "http://stormy-lowlands-6355.herokuapp.com/";

var assertFileExists = function(inFile){
	var instr = inFile.toString();
	if(!fs.existsSync(instr)){
		console.log("%s does not exist. Exiting.", instr);
		process.exit(1);
	}
	return instr;
};

var cheerioHtmlFile = function(htmlFile){
	return cheerio.load(fs.readFileSync(htmlFile));
};

var loadChecks = function(checksFile){
	return JSON.parse(fs.readFileSync(checksFile));
};

var checkHtmlFile = function(htmlFile, checksFile){
	$ = cheerioHtmlFile(htmlFile);
	var checks = loadChecks(checksFile).sort();
	var out = {};
	for(var ii in checks){
		var present = $(checks[ii]).length > 0;
		out[checks[ii]] = present;
	}
	return out;
};

var buildJsonFromUrl = function(checksFile){
	var checkUrl = function(result, response){
		if (result instanceof Error){
			sys.puts('Error: ' + result.message);
		} else {
			$ = cheerio.load(result);
			var checks = loadChecks(checksFile).sort();
			var out = {};
			for(var ii in checks){
				var present = $(checks[ii]).length > 0;
				out[checks[ii]] = present;
			}
			printCheckJson(out);
		}
	};
	return checkUrl;
};

var handleUrl = function(url, checksFile){
	var urlToCheck = buildJsonFromUrl(checksFile);
	rest.get(url).on('complete', urlToCheck)
};

var clone = function(fn){
	return fn.bind({});
};

function printCheckJson (content){
	var outJson = JSON.stringify(content, null,4);
	console.log(outJson);
}

if(require.main==module){
	program
		.option('-c, --checks <check_file>', 'Path to checks-json', clone(assertFileExists), CHECKSFILE_DEFAULT)
		.option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
		.option('-u, --url <url_file>', 'Url to get')
		.parse(process.argv);
	if(program.url){
		console.log("Reading from url: %s\n", program.url);
		handleUrl(program.url, program.checks);		
	} else if (program.file) {
		console.log("Reading from file...\n");
		var checkJson = checkHtmlFile(program.file, program.checks);
		var outJson = JSON.stringify(checkJson, null, 4);
		console.log(outJson);
	} else {
		console.log("Please indicate a file or url.");
		process.exit(1);
	}
} else {
	exports.checkHtmlFile = checkHtmlFile;
	exports.getUrlContent = getUrlContent;
}
