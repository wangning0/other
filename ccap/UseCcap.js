var http = require('http');
var ccap = require('ccap')({
	width: 256, //set width,default is 256

	height: 60, //set height,default is 60

	offset: 40, //set text spacing,default is 40

	quality: 100, //set pic quality,default is 50

	fontsize: 57, //set font size,default is 57
});

http.createServer(function(req, res) {
	if (req.url == '/favicon.ico') {
		return res.end('');
	}
	var ary = ccap.get();
	var txt = ary[0];
	var buf = ary[1];
	res.end(buf);
	console.log(txt);
}).listen(8080);

console.log('8080');