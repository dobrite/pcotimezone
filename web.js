// web.js
var express = require("express");
var logfmt = require("logfmt");
var tzwhere = require("tzwhere");
var app = express();

tzwhere.init();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  var lat = req.query.lat;
  var lng = req.query.lng;
  var tz  = tzwhere.tzNameAt(lat, lng);
  res.json({tz: tz});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
