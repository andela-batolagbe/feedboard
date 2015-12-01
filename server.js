'use strict';

var express = require('express');
var app = express();

var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

//parse body contents as a JSON objects
app.use(bodyParser.json());

app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/'));

app.get('*', function(req, res) {
  res.sendFile(process.cwd() + '/index.html');
})

app.listen(port);

console.log('app listening on ' + port);

module.exports = app;
