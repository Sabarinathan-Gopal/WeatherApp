const fs = require("fs");
const http = require("http");
const path = require("path");
const {
  allTimeZones,
  timeForOneCity,
  nextNhoursWeather,
} = require("./timeZone.js");
const PORT = 8000;
let data;
let cityData;
const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "application/javascript",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};
const STATIC_PATH = path.join(process.cwd(), "./");
const toBool = [() => true, () => false];
const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith("/")) paths.push("index.html");
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : STATIC_PATH + "/404.html";
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};
http
  .createServer(async (req, res) => {
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    res.writeHead(statusCode, { "Content-Type": mimeType });
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
    if (req.url === "/all-timezone-cities") {
      res.writeHead(200, { "Content-Type": "text/json" });
      data = allTimeZones();
      res.write(JSON.stringify(data));
      res.end();
    } else if (req.url.split("=")[0] === "/?city") {
      res.writeHead(200, { "Content-Type": "text/json" });
      let cityName = req.url.split("=")[1];
      cityData = timeForOneCity(cityName);
      res.write(JSON.stringify(cityData));
      res.end();
    } else if (req.url === "/hourly-forecast") {
      res.writeHead(200, { "Content-Type": "text/json" });
      if (cityData.city_Date_Time_Name) {
        hourlyForecast = nextNhoursWeather(
          cityData.city_Date_Time_Name,
          6,
          data
        );
        res.write(JSON.stringify(hourlyForecast));
        res.end();
      }
    }
  })
  .listen(PORT);
console.log(`Server running at http://127.0.0.1:${PORT}/`);
