// web.js
var express   = require("express");
var logfmt    = require("logfmt");
var tzwhere   = require("tzwhere");
var BigNumber = require("bignumber.js");
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

  if (!(lat && lng)) {
    res.statusCode = 422;
    return res.json({error: 'must pass in lat and lng as query args'});
  }

  var bLat = BigNumber(lat);

  if (bLat.gte(BigNumber(85.0)) || bLat.lte(BigNumber(-85.05115))) {
    res.statusCode = 422;
    return res.json({error: 'lat must be between -85.05115 and 85.0'});
  }

  var bLng = BigNumber(lng);

  if (bLng.gte(BigNumber(180.0)) || bLng.lte(BigNumber(-180.0))) {
    res.statusCode = 422;
    return res.json({error: 'lng must be between -180.0 and 180.0'});
  }

  var tz  = tzwhere.tzNameAt(bLat.toFixed(), bLng.toFixed());
  return res.json({tz: tz || 'etc/utc'});
});

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log("Listening on " + port);
});
