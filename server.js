const { fork } = require("child_process");
const eventEmitter = require("events");
let cityData;
let Data;
const fs = require("fs");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");
var express = require("express");
var app = express();
app.use(bodyParser.json());
const { timeForOneCity } = require("./timeZone.js");

//To get all the details of the cities
app.get("/all-timezone-cities", (req, res) => {
  const allTimedata = fork(__dirname + "/alltimezonedata.js");
  allTimedata.on("message", (info) => {
    Data = info;
    res.json(info);
  });
  allTimedata.send({ messagename: "GetData", messagebody: {} });
});

//To get the timeline of the respective city
app.get("/", (req, res) => {
  var cityName = req.query.city;
  if (cityName) {
    let cityInfo = new eventEmitter();
    cityInfo.on("GetcityInfo", () => {
      cityData = timeForOneCity(cityName);
      res.json(cityData);
    });
    cityInfo.emit("GetcityInfo");
  } else if (req.url.endsWith("/")) {
    app.use(express.static("./"));
    res.sendFile(__dirname + "/index.html");
  } else {
    res
      .status(404)
      .json({ Error: "Not a Valid EndPoint.Please check API Doc" });
  }
});

//To get the temperature
app.post("/hourly-forecast", (req, res) => {
  let temperature = fork(__dirname + "/alltimezonedata.js");
  temperature.on("message", (nextFiveHrs) => {
    res.json(nextFiveHrs);
  });
  temperature.send({
    messagename: "GetTemperature",
    messagebody: {
      cityDTN: req.body.city_Date_Time_Name,
      hours: "6",
      weatherData: Data,
    },
  });
});

//Server Creation and listening process performed
const server = http.createServer(app);
const PORT = 8000;
server.listen(PORT);
console.log(`Server running at http://127.0.0.1:${PORT}/`);
