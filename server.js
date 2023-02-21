let cityData;
let data;
const fs = require("fs");
const http = require("http");
const path = require("path");
const {
  allTimeZones,
  timeForOneCity,
  nextNhoursWeather,
} = require("./timeZone.js");

var express = require("express");
var app = express();

//To get all the details of the cities
app.get("/all-timezone-cities", (req, res) => {
  res.json(allTimeZones());
  data = allTimeZones();
});

//To get the timeline of the respective city
app.get("/", (req, res) => {
  var cityName = req.query.city;
  if(cityName)
  {
    res.json(timeForOneCity(cityName));
    cityData = timeForOneCity(cityName);
  }
  else if(req.url.endsWith("/"))
  {
    app.use(express.static("./"));
    res.sendFile(__dirname + "/index.html");
  }
  else
  {
    res.status(404).json({Error:"Not a Valid EndPoint.Please check API Doc"});
  }

});

//To get the temperature
app.post("/hourly-forecast",(req,res)=>{
  let cityDTN = cityData.city_Date_Time_Name;
  if(cityDTN)
  {
    res.json(nextNhoursWeather(cityDTN, 6, data));
  }
  else
  {
    res.status(404).json({Error:"Not a Valid EndPoint.Please check API Doc"});
  }
})

//Server Creation and listening process performed
const server = http.createServer(app);
const PORT = 8000;
server.listen(PORT);
console.log(`Server running at http://127.0.0.1:${PORT}/`);
