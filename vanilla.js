var http = require('http');
var jsonFile = require('./small.json');

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type':'application/json'});
  res.end(JSON.stringify(jsonFile));
}).listen(3005, '127.0.0.1');
