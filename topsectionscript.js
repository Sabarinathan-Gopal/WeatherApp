var date = new Date().toJSON();
let timer;
var optionBox = document.getElementById("city-option");
let cityObject;
//usage

(function ifeStart() {
  optionBox.addEventListener("change", myFunction);
  function myFunction() {
    totalCityWeather(optionBox.value);
  }
})();

var cityFunction = function () {};

// Set values operation performed for all the needed fields
cityFunction.prototype.setTotalValues = function (citiesTotal) {
  this.citiesTotal = citiesTotal;
};

cityFunction.prototype.setCityName = function (cityName) {
  this.cityName = cityName;
};

cityFunction.prototype.setDateAndTime = function (dateAndTime) {
  this.dateAndTime = dateAndTime;
};

cityFunction.prototype.setTimeZone = function (timeZone) {
  this.timeZone = timeZone;
};

cityFunction.prototype.setTemperature = function (temperature) {
  this.temperature = temperature;
};

cityFunction.prototype.setHumidity = function (humidity) {
  this.humidity = humidity;
};

cityFunction.prototype.setPrecipitation = function (precipitation) {
  this.precipitation = precipitation;
};

cityFunction.prototype.setNextFiveHrs = function (nextFiveHrs) {
  this.nextFiveHrs = nextFiveHrs;
};

// Get values operation performed for all the needed fields

cityFunction.prototype.getTotalValues = function () {
  return this.citiesTotal;
};

cityFunction.prototype.getCityName = function () {
  return this.cityName;
};

cityFunction.prototype.getDateAndTime = function () {
  return this.dateAndTime;
};

cityFunction.prototype.getTimeZone = function () {
  return this.timeZone;
};

cityFunction.prototype.getTemperature = function () {
  return this.temperature;
};

cityFunction.prototype.getHumidity = function () {
  return this.humidity;
};

cityFunction.prototype.getPrecipitation = function () {
  return this.precipitation;
};

cityFunction.prototype.getNextFiveHrs = function () {
  return this.nextFiveHrs;
};

cityFunction.prototype.getTimeStamp = function (val) {
  let timestamp;
  if (val >= 12) {
    timestamp = "AM";
    return timestamp;
  } else {
    timestamp = "PM";
    return timestamp;
  }
};

window.onload = function () {
  var cityOptionbox = document.getElementById("city-options");
  for (var city in totalJsonfile) {
    cityOptionbox.innerHTML =
      cityOptionbox.innerHTML +
      '<option value="' +
      totalJsonfile[city].cityName +
      '">';
  }
  totalCityWeather("Nome");
};

/**
 *To check whether the city selected is present in the JS file
 *Calling the function topSector to perform the remaining functions
 * @param {string} cities
 */
function totalCityWeather(cities) {
  cities = cities.toLowerCase();
  let found = false;
  for (let value in totalJsonfile) {
    if (cities === value) {
      found = true;
    }
  }
  if (found === true) {
    topSector(cities);
    optionBox.setAttribute("style", "border-color:transparent");
    document.getElementById("value-style1").innerText = "C";
    document.getElementById("value-style2").innerText = "F";
  } else {
    clearInterval(timer);
    errorDisplay();
  }
}

/**
 *To display validation if invalid cities entered in datalist
 */
function errorDisplay() {
  let errorItem = document.getElementsByClassName("error-validation");
  let errorImage = document.getElementsByClassName("weather-img");
  optionBox.setAttribute("style", "border-color:red");
  for (let valuei = 0; valuei < errorItem.length; valuei++) {
    errorItem[valuei].innerHTML = "NIL";
  }
  for (let valuei = 0; valuei < errorImage.length; i++) {
    errorImage[valuei].src =
      "./Assets/HTML & CSS/General Images & Icons/warning.svg";
  }
  document.getElementById("value-style1").innerText = "";
  document.getElementById("value-style2").innerText = "";
  document.getElementById("time-state").src =
    "./Assets/HTML & CSS/General Images & Icons/warning.svg";
  document
    .getElementById("city-seperate-image")
    .setAttribute(
      "style",
      "background-image: url('./Assets/HTML & CSS/General Images & Icons/warning.svg')"
    );
}

/**
 *To set DOM functions to the respective div elements
 *To assign city details with the help of the JS file
 * @param {string} cities
 */
function topSector(cities) {
  cityObject = new cityFunction();
  cityObject.setTotalValues(totalJsonfile);
  cityObject.setCityName(totalJsonfile[cities].cityName);
  cityObject.setDateAndTime(totalJsonfile[cities].dateAndTime);
  cityObject.setTemperature(totalJsonfile[cities].temperature);
  cityObject.setHumidity(totalJsonfile[cities].humidity);
  cityObject.setNextFiveHrs(totalJsonfile[cities].nextFiveHrs);
  cityObject.setTimeZone(totalJsonfile[cities].timeZone);
  cityObject.setPrecipitation(totalJsonfile[cities].precipitation);
  var tempCelsius = document.getElementById("temperature-celsius");
  var tempFarenheit = document.getElementById("temperature-farenheit");
  var tempCurrent = document.getElementById("current-time");
  var currentImagei = document.getElementById("current-image");
  var tempHumidity = document.getElementById("humidity-value");
  var tempPrecipitation = document.getElementById("precipitation-value");
  tempCelsius.innerText = cityObject.getTemperature();
  var actualCeliusval = tempCelsius.innerText.substring(
    0,
    tempCelsius.innerText.indexOf("C") - 1
  );
  var currenTime = document.getElementById("current-time");
  var currentSeconds = document.getElementById("subscript-seconds");
  var currentDate = document.getElementById("date-log");
  var currentHours;
  var currentTimezone;
  /**
   *Allows the system to take the current time of the selected city using timezone
   */
  function mytimer() {
    currentTimezone = new Date().toLocaleString("en-US", {
      timeZone: cityObject.getTimeZone(),
      //timeZone: totalJsonfile[cities].timeZone,
    });
    currentHours = new Date(currentTimezone).getHours() % 12;
    if (new Date(currentTimezone).getHours() >= 12) {
      document.getElementById("time-state").src =
        "./Assets/HTML & CSS/General Images & Icons/pmState.svg";
    } else {
      document.getElementById("time-state").src =
        "./Assets/HTML & CSS/General Images & Icons/amState.svg";
    }
    const date = new Date(currentTimezone).getDate();
    currentDate.innerText =
      (date < 10 ? "0" + date : date) +
      "-" +
      new Date().toLocaleString(
        "en-US",
        { month: "short" },
        { timeZone: currentTimezone }
      ) +
      "-" +
      new Date(currentTimezone).getFullYear();
    if (currentHours === 0) {
      currentHours = 12;
    }
    currenTime.innerText =
      (currentHours < 10 ? "0" + currentHours : currentHours) +
      ":" +
      (new Date(currentTimezone).getMinutes() < 10
        ? "0" + new Date(currentTimezone).getMinutes()
        : new Date(currentTimezone).getMinutes());
    currentSeconds.innerText =
      new Date(currentTimezone).getSeconds() < 10
        ? "0" + new Date(currentTimezone).getSeconds()
        : new Date(currentTimezone).getSeconds();
    console.log(currenTime + " " + currentSeconds + " " + currentTimezone);
  }
  mytimer();
  clearInterval(timer);
  timer = setInterval(mytimer, 500);
  tempFarenheit.innerText = parseFloat(
    (actualCeliusval * 9) / 5 + 32 + " F"
  ).toFixed(1);
  tempCelsius.innerText = tempCelsius.innerText.slice(
    0,
    tempCelsius.innerText.length - 2
  );
  tempImage(tempCelsius.innerText, currentImagei);
  document.getElementById("timecurrent").innerText =
    tempCelsius.innerText.split();
  tempHumidity.innerText = cityObject.getHumidity();
  tempPrecipitation.innerText = cityObject.getPrecipitation();
  document
    .getElementById("city-seperate-image")
    .setAttribute(
      "style",
      "background-image: url('./Assets/HTML & CSS/Icons for cities/" +
        cities +
        ".svg')"
    );
  var currentHour = new Date(currentTimezone).getHours();
  tempFunction(currentHour, cities);
}

/**
 *To set the timestamp for the next five hours
 * @param {Number} currentHour
 * @param {string} cities
 */
function tempFunction(currentHour, cities) {
  for (let valuei = 0; valuei < 5; valuei++) {
    var timelog = document.getElementById("timelog" + i);
    if (Number(currentHour) + valuei + 1 > 24) {
      currentHour = currentHour - 24;
    }
    if (Number(currentHour) + valuei + 1 < 12) {
      timelog.innerText = Number(currentHour) + (valuei + 1) + "AM";
    } else if (Number(currentHour) + valuei + 1 === 12) {
      timelog.innerText = Number(currentHour) + (i + 1) + "PM";
    } else if (Number(currentHour) + valuei + 1 === 24) {
      timelog.innerText = 12 + "AM";
    } else {
      timelog.innerText = Number(currentHour) + (valuei + 1) - 12 + "PM";
    }

    if (valuei === 4) {
      var temphour = document.getElementById("time" + valuei);
      temphour.innerText = 2;
    } else {
      var temphour = document.getElementById("time" + valuei);
      temphour.innerText = totalJsonfile[cities].nextFiveHrs[valuei].slice(
        0,
        totalJsonfile[cities].nextFiveHrs[i].length - 2
      );
    }
    var currentImage = document.getElementById("current-image" + valuei);
    tempImage(temphour.innerText, currentImage);
  }
}

/**
 *To set the current weather icon for the next five hours
 * @param {*} temperature
 * @param {*} currentImage
 */
function tempImage(temperature, currentImage) {
  if (temperature >= 23 && temperature <= 29) {
    currentImage.src = "./Assets/HTML & CSS/Weather Icons/cloudyIcon.svg";
  }
  if (temperature >= 18 && temperature <= 22) {
    currentImage.src = "./Assets/HTML & CSS/Weather Icons/windyIcon.svg";
  }
  if (temperature < 18) {
    currentImage.src = "./Assets/HTML & CSS/Weather Icons/rainyIcon.svg";
  }
  if (temperature > 29) {
    currentImage.src = "./Assets/HTML & CSS/Weather Icons/sunnyIcon.svg";
  }
}
