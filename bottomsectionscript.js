let currentContinentArrow = "arrowDown";
let currentTemperatureArrow = "arrowUp";
let i = 0;
var elementCard = document.querySelector("#continent-box0");
let topCountries = Object.values(totalJsonfile);
let timer2;
document
  .getElementById("continent-arrow")
  .addEventListener("click", () => continentSort());
document
  .getElementById("temperature-arrow")
  .addEventListener("click", () => temperatureSort());

(function () {
  document.getElementById("thirdcontainer-city").replaceChildren();
  i = 0;
  for (let element in totalJsonfile) {
    if (i < 12) {
      var clone = elementCard.cloneNode(true);
      clone.id = "continent-box" + i;
      document.getElementById("thirdcontainer-city").appendChild(clone);
      midcardUpdateValues(clone, element);
      i++;
    } else {
      break;
    }
  }
  updateWithSort(topCountries);
})();

function continentSort() {
  if (currentContinentArrow == "arrowDown") {
    currentContinentArrow = "arrowUp";
    document.getElementById("continent-arrow").src =
      "./Assets/HTML & CSS/General Images & Icons/arrowUp.svg";
  } else if (currentContinentArrow == "arrowUp") {
    currentContinentArrow = "arrowDown";
    document.getElementById("continent-arrow").src =
      "./Assets/HTML & CSS/General Images & Icons/arrowDown.svg";
  }
}

function temperatureSort() {
  if (currentTemperatureArrow == "arrowUp") {
    currentTemperatureArrow = "arrowDown";
    document.getElementById("temperature-arrow").src =
      "./Assets/HTML & CSS/General Images & Icons/arrowDown.svg";
  } else if (currentTemperatureArrow == "arrowDown") {
    currentTemperatureArrow = "arrowUp";
    document.getElementById("temperature-arrow").src =
      "./Assets/HTML & CSS/General Images & Icons/arrowUp.svg";
  }
}

function updateWithSort(currentList) {
  document.getElementById("thirdcontainer-city").replaceChildren();
  i = 0;
  for (let element in currentList) {
    if (i < 12) {
      var clone = elementCard.cloneNode(true);
      clone.id = "continent-box" + i;
      document.getElementById("thirdcontainer-city").appendChild(clone);
      element = currentList[element].cityName.toLowerCase();
      midcardUpdateValues(clone, element);
      i++;
    } else {
      break;
    }
  }
}

function midcardUpdateValues(val, currentCountry) {
  var currentCity = totalJsonfile[currentCountry].cityName.toLowerCase();
  val.querySelector("#thirdcontainer-continent").innerText = totalJsonfile[
    currentCity
  ].timeZone.substring(0, totalJsonfile[currentCity].timeZone.indexOf("/"));
  val.querySelector("#thirdcontainer-temperature").innerText =
    totalJsonfile[currentCity].temperature;
  val.querySelector("#thirdcontainer-humidity").innerText =
    totalJsonfile[currentCity].humidity;
  var currentHours;
  var currentTimezone;
  var timestamp;
  mytimer2();
  clearInterval(timer2);
  timer2 = setInterval(mytimer2, 500);
  function mytimer2() {
    currentTimezone = new Date().toLocaleString("en-US", {
      timeZone: totalJsonfile[currentCity].timeZone,
    });
    currentHours = new Date(currentTimezone).getHours() % 12;
    if (new Date(currentTimezone).getHours() >= 12) {
      timestamp = "PM";
    } else {
      timestamp = "AM";
    }
    if (currentHours == 0) {
      currentHours = 12;
    }
    val.querySelector("#thirdcontainer-country").innerText =
      totalJsonfile[currentCountry].cityName +
      "," + ' ' +
      (currentHours < 10 ? "0" + currentHours : currentHours) +
      ":" +
      (new Date(currentTimezone).getMinutes() < 10
        ? "0" + new Date(currentTimezone).getMinutes()
        : new Date(currentTimezone).getMinutes()) +
      " " +
      timestamp;
    timer2 = setInterval(mytimer2, 500);
    clearInterval(timer2);
  }
}