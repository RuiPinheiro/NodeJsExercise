var help = require('./help')

Object.keys(process).forEach(function (value){
	console.log(value);
});




var options = process.argv.slice(2);
if(options.length < 1){
	return;
}else if(options[0].length > 1){
	help.showOptions();
}
console.log(options[0].length);