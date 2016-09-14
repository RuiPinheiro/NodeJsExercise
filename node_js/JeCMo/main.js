var express = require('express');
var app = express();
var fs = require("fs");
var formidable = require("formidable");
var util = require("util");

var bodyParser = require('body-parser')

function get(req,res){
		console.log("4254356345645");
		displayForm(res);
}

function post(req,res){
	console.log("asddsw");
	if(req.body){console.log(req.body)}
	var name = req.body.name_;
	var rel  = req.body.religion;

	console.log(name);

	res.send(200, req.body);
	
}


function getListenerMesssage(){
	console.log("Testando meu código");
}

function displayForm(res){

		fs.readFile("index.html", function(err,data){
			res.writeHead(200,{
				'Content-Type': 'text/html',
		                'Content-Length': data.length
		});

		res.write(data);
		res.end();

	});
}

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/",post);



app.get("/",get);


app.listen(3000,getListenerMesssage());
