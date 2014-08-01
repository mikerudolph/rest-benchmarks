var koa = require('koa');
var app = koa();
var jsonFile = require('./small.json');
var route = require('koa-route');

app.use(route.get('/api/:file/benchmark', bench));

function *bench(file) {
  this.set = 'Content-Type', 'application/json';

  this.body = jsonFile;
}

app.listen(3003);
