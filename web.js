// web.js
var express = require("express");
var logfmt = require("logfmt");
var tzwhere = require("tzwhere");
var app = express();

tzwhere.init();

app.use(logfmt.requestLogger());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function(req, res, next) {
  var lat = req.query.lat;
  var lng = req.query.lng;
  var tz  = tzwhere.tzNameAt(lat, lng);
  res.json({tz: tz});
});

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log("Listening on " + port);
});
