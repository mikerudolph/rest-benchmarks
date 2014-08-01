var express = require('express');
var router = express.Router();
var app = express();
var jsonFile = require('./small.json');

router.get('/benchmark', function(req, res) {
  res.json(jsonFile);
});

app.use('/', router);

app.listen(3001);
