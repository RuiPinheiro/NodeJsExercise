var http = require("http");
var natural = require("natural");
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');

var tokenizer = new natural.WordTokenizer();

http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        //processAllFieldsOfTheForm(req, res);
		 processFormFieldsIndividual(req, res);
    }
}).listen(8081);

function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processFormFieldsIndividual(req, res) {
    //Store the data from the fields in your data store.
    //The data store could be a file or database or any other store based
    //on your application.
	classifier = new natural.BayesClassifier();
    classifier.addDocument("no crimes", 'not guilty');
    classifier.addDocument("i have done crimes", 'guilty');
    classifier.train();	
	
	
    var fields = [];
    var form = new formidable.IncomingForm();
    form.on('field', function (field, value) {
        console.log(field);
        console.log(value);
        fields[field] = value;
		
		console.log(tokenizer.tokenize(value));
		console.log(classifier.classify(value));
    });

    form.on('end', function () {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields
        }));
    });
    form.parse(req);
}
// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

 
   
   
   console.log(tokenizer.tokenize("your dog has flees")[0]);
   
   var stemmer = natural.PorterStemmer;
   var stem = stemmer.stem('stems');
   console.log(stem);
   stem = stemmer.stem('stemming');
   console.log(stem);
   stem = stemmer.stem('stemmed');
   console.log(stem);
   stem = stemmer.stem('stem');
   console.log(stem);
   
   stemmer.attach();
   stem = 'stemming'.stem();
   console.log(stem+"ola");
   
   phonetic = natural.Metaphone;
   var wordA = 'phonetics';
   var wordB = 'fonetix';
   if(phonetic.compare(wordA, wordB))
    console.log('they sound alike!');
	
   classifier = new natural.BayesClassifier();
   classifier.addDocument("my unit-tests failed.", 'software');
   classifier.addDocument("tried the program, but it was buggy.", 'software');
   classifier.addDocument("the drive has a 2TB capacity.", 'hardware');
   classifier.addDocument("i need a new power supply.", 'hardware');
   classifier.train();	
	
   console.log(classifier.classify('did the tests pass?'));
   console.log(classifier.classify('did you buy a new drive?')); 
         