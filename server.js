// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", ( req, res )=> {
  console.log(req.params.date_string)
  if(req.params.date_string === undefined){
    const date = new Date();
    res.json({ unix: date.getTime(), utc : date.toUTCString() });
    return;
  }
  // const date_string = new Date(req.params.date_string);
  // const date_string1 = new Date(req.params.date_string);
  if( (new Date(req.params.date_string)).toString() !== "Invalid Date"){
    const date = new Date(req.params.date_string);
    console.log("normaldate", date)
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    })
  }
  else if( (new Date((req.params.date_string/1000)*1000)).toString() !== "Invalid Date" ){
    const date = new Date((req.params.date_string/1000)*1000);
    console.log("unixdate", date)
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    })
  }
  else{
     res.json({"error" : "Invalid Date" });
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
