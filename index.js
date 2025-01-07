// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  const date = Number(req.params.date)
    ? req.params.date * 1000
    : req.params.date;

  if (req.params.date === undefined) {
    res.json({
      unix: new Date().getTime() / 1000,
      utc: new Date().toUTCString(),
    });
    return;
  }

  if (isNaN(new Date(date))) {
    res.json({ error: "Invalid Date" });
    return;
  }

  const unix = Math.floor(new Date(date).getTime() / 1000);
  const utc = new Date(date);
  res.json({ unix: unix, utc: utc.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
