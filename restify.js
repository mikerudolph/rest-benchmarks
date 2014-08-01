var restify = require('restify');
var server = restify.createServer();
var jsonFile = require('./small.json');

server.get('/api/:file/benchmark', function(req, res, next) {
  res.send(jsonFile);
  next();
});

server.listen(3004);
