var Hapi = require('hapi');
var jsonFile = require('./small.json');
var server = new Hapi.Server('localhost', 3002);

server.route({
  method: 'GET',
  path: '/benchmark',
  handler: function(req, rep) {
    rep(jsonFile);
  }
});

server.start();
