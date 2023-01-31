var summerCountries = [];
var winterCountries = [];
var rainyCountries = [];
var numberOption = document.getElementById("number-option");
var currentInputValue = 3;
var currentSummerValue = 0;
var currentWinterValue = 0;
var currentRainyValue = 0;
var elementCard = document.querySelector("#city-card0");
let timer1;
numberOption.addEventListener("change", getNumberValue);

(function () {
  var icon = "sunnyIcon";
  summerCountries = Object.values(totalJsonfile).filter(
    (city) =>
      Number(city.precipitation.substring(0, city.precipitation.length - 1)) >=
        50 &&
      Number(city.humidity.substring(0, city.humidity.length - 1)) < 50 &&
      Number(city.temperature.substring(0, city.temperature.length - 2)) > 29
  );
  summerCountries.sort((a, b) => {
    return b.temperature - a.temperature;
  });
  document.getElementById("total-cards").replaceChildren();
  clearBorder();
  document
    .getElementById("icon1")
    .setAttribute("style", "border-bottom-style: solid");
  document.getElementById("total-cards").replaceChildren();
  document
    .getElementById("icon1")
    .setAttribute("style", "border-bottom-style: solid");
  for (let j = 0; j < currentInputValue; j++) {
    var clone = elementCard.cloneNode(true);
    clone.id = "city-card" + j;
    document.getElementById("total-cards").appendChild(clone);
    midcardUpdateValues(clone, summerCountries, j,icon);
  }
  currentSummerValue = currentInputValue;
  cardAlignment(currentInputValue, summerCountries.length);
})();


/**
 *To store the current Input number
 *To direct the working to respective function according to user's selection
 */
function getNumberValue() {
  currentInputValue = Number(numberOption.value);
  if (
    document
      .getElementById("icon1")
      .getAttribute("style", "border-bottom-style") ==
    "border-bottom-style: solid"
  ) {
    summerFunction();
  } else if (
    document
      .getElementById("icon2")
      .getAttribute("style", "border-bottom-style") ==
    "border-bottom-style: solid"
  ) {
    winterFunction();
  }
  if (
    document
      .getElementById("icon3")
      .getAttribute("style", "border-bottom-style") ==
    "border-bottom-style: solid"
  ) {
    rainyFunction();
  }
}

document
  .getElementById("icon1")
  .addEventListener("click", () => summerFunction());
document
  .getElementById("icon2")
  .addEventListener("click", () => winterFunction());
document
  .getElementById("icon3")
  .addEventListener("click", () => rainyFunction());
document
  .getElementById("scroll1")
  .addEventListener("click", () => midScroll(-29));
document
  .getElementById("scroll2")
  .addEventListener("click", () => midScroll(29));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


/**
 *Performing scroll operations
 * @param {Number} val
 */
async function midScroll(val) {
  for (let i = 0; i < 10; i++) {
    await sleep(60);
    document.getElementById("card-container").scrollLeft += val;
  }
}


/**
 *Sort out cities according to the summer weather
 */
function summerFunction() {
  var icon = "sunnyIcon";
  summerCountries = Object.values(totalJsonfile).filter(
    (city) =>
      Number(city.precipitation.substring(0, city.precipitation.length - 1)) >=
        50 &&
      Number(city.humidity.substring(0, city.humidity.length - 1)) < 50 &&
      Number(city.temperature.substring(0, city.temperature.length - 2)) > 29
  );
  summerCountries.sort((a, b) => {
    return b.temperature - a.temperature;
  });
  document.getElementById("total-cards").replaceChildren();
  clearBorder();
  document
    .getElementById("icon1")
    .setAttribute("style", "border-bottom-style: solid");
  if (summerCountries.length >= 3) {
    if (currentSummerValue < currentInputValue) {
      if (summerCountries.length <= currentInputValue) {
        document.getElementById("total-cards").replaceChildren();
        document
          .getElementById("icon1")
          .setAttribute("style", "border-bottom-style: solid");
        for (let j = 0; j < summerCountries.length; j++) {
          var clone = elementCard.cloneNode(true);
          clone.id = "city-card" + j;
          document.getElementById("total-cards").appendChild(clone);
          midcardUpdateValues(clone, summerCountries, j, icon);
        }
      } else {
        document.getElementById("total-cards").replaceChildren();
        document
          .getElementById("icon1")
          .setAttribute("style", "border-bottom-style: solid");
        for (let j = 0; j < currentInputValue; j++) {
          var clone = elementCard.cloneNode(true);
          clone.id = "city-card" + j;
          document.getElementById("total-cards").appendChild(clone);
          midcardUpdateValues(clone, summerCountries, j, icon);
        }
        currentSummerValue = currentInputValue;
      }
    } else if (currentSummerValue > currentInputValue) {
      document.getElementById("total-cards").replaceChildren();
      for (let j = 0; j < currentInputValue; j++) {
        var clone = elementCard.cloneNode(true);
        clone.id = "city-card" + j;
        document.getElementById("total-cards").appendChild(clone);
        midcardUpdateValues(clone, summerCountries, j, icon);
      }
      currentSummerValue = currentInputValue;
    } else if (currentSummerValue == currentInputValue) {
      for (let i = 0; i < currentSummerValue; i++) {
        var clone = elementCard.cloneNode(true);
        clone.id = "city-card" + i;
        document.getElementById("total-cards").appendChild(clone);
        midcardUpdateValues(clone, summerCountries, i, icon);
      }
    }
  } else if (summerCountries.length < 3) {
    for (let j = 0; j < summerCountries.length; j++) {
      var clone = elementCard.cloneNode(true);
      clone.id = "city-card" + j;
      document.getElementById("total-cards").appendChild(clone);
      midcardUpdateValues(clone, summerCountries, j, icon);
    }
    currentSummerValue = summerCountries.length;
  }
  cardAlignment(currentInputValue, summerCountries.length);
}


/**
 *Sort out cities according to the winter weather
 */
function winterFunction() {
  var icon = "snowflakeIcon";
  winterCountries = Object.values(totalJsonfile).filter(
    (city) =>
      Number(city.precipitation.substring(0, city.precipitation.length - 1)) <
        50 &&
      Number(city.humidity.substring(0, city.humidity.length - 1)) > 50 &&
      Number(city.temperature.substring(0, city.temperature.length - 2)) >=
        20 &&
      Number(city.temperature.substring(0, city.temperature.length - 2)) <= 28
  );
  winterCountries.sort((a, b) => {
    return b.precipitation - a.precipitation;
  });
  document.getElementById("total-cards").replaceChildren();
  clearBorder();
  document
    .getElementById("icon2")
    .setAttribute("style", "border-bottom-style: solid");
  if (winterCountries.length >= 3) {
    if (currentWinterValue < currentInputValue) {
      if (winterCountries.length <= currentInputValue) {
        document.getElementById("total-cards").replaceChildren();
        document
          .getElementById("icon2")
          .setAttribute("style", "border-bottom-style: solid");
        for (let j = 0; j < winterCountries.length; j++) {
          var clone = elementCard.cloneNode(true);
          clone.id = "city-card" + j;
          document.getElementById("total-cards").appendChild(clone);
          midcardUpdateValues(clone, winterCountries, j, icon);
        }
      } else {
        document.getElementById("total-cards").replaceChildren();
        document
          .getElementById("icon2")
          .setAttribute("style", "border-bottom-style: solid");
        for (let j = 0; j < currentInputValue; j++) {
          var clone = elementCard.cloneNode(true);
          clone.id = "city-card" + j;
          document.getElementById("total-cards").appendChild(clone);
          midcardUpdateValues(clone, winterCountries, j, icon);
        }
        currentWinterValue = currentInputValue;
      }
    } else if (currentWinterValue > currentInputValue) {
      document.getElementById("total-cards").replaceChildren();
      for (let j = 0; j < currentInputValue; j++) {
        var clone = elementCard.cloneNode(true);
        clone.id = "city-card" + j;
        document.getElementById("total-cards").appendChild(clone);
        midcardUpdateValues(clone, winterCountries, j, icon);
      }
      currentWinterValue = currentInputValue;
    } else if (currentWinterValue == currentInputValue) {
      for (let i = 0; i < currentWinterValue; i++) {
        var clone = elementCard.cloneNode(true);
        clone.id = "city-card" + i;
        document.getElementById("total-cards").appendChild(clone);
        midcardUpdateValues(clone, winterCountries, i, icon);
      }
    }
  } else if (winterCountries.length < 3) {
    for (let j = 0; j < winterCountries.length; j++) {
      var clone = elementCard.cloneNode(true);
      clone.id = "city-card" + j;
      document.getElementById("total-cards").appendChild(clone);
      midcardUpdateValues(clone, winterCountries, j, icon);
    }
    currentWinterValue = winterCountries.length;
  }
  cardAlignment(currentInputValue, winterCountries.length);
}


/**
 *Sort out cities according to the rainy weather
 */
function rainyFunction() {
  var icon = "rainyIcon";
  rainyCountries = Object.values(totalJsonfile).filter(
    (city) =>
      Number(city.humidity.substring(0, city.humidity.length - 1)) >= 50 &&
      Number(city.temperature.substring(0, city.temperature.length - 2)) < 20
  );
  rainyCountries.sort((a, b) => {
    return b.humidity - a.humidity;
  });
  document.getElementById("total-cards").replaceChildren();
  clearBorder();
  document
    .getElementById("icon3")
    .setAttribute("style", "border-bottom-style: solid");
  if (rainyCountries.length >= 3) {
    if (currentRainyValue < currentInputValue) {
      if (rainyCountries.length <= currentInputValue) {
        document.getElementById("total-cards").replaceChildren();
        document
          .getElementById("icon3")
          .setAttribute("style", "border-bottom-style: solid");
        for (let j = 0; j < rainyCountries.length; j++) {
          var clone = elementCard.cloneNode(true);
          clone.id = "city-card" + j;
          document.getElementById("total-cards").appendChild(clone);
          midcardUpdateValues(clone, rainyCountries, j, icon);
        }
      } else {
        document.getElementById("total-cards").replaceChildren();
        document
          .getElementById("icon3")
          .setAttribute("style", "border-bottom-style: solid");
        for (let j = 0; j < currentInputValue; j++) {
          var clone = elementCard.cloneNode(true);
          clone.id = "city-card" + j;
          document.getElementById("total-cards").appendChild(clone);
          midcardUpdateValues(clone, rainyCountries, j, icon);
        }
        currentRainyValue = currentInputValue;
      }
    } else if (currentRainyValue > currentInputValue) {
      for (let j = 0; j < currentInputValue; j++) {
        var clone = elementCard.cloneNode(true);
        clone.id = "city-card" + j;
        document.getElementById("total-cards").appendChild(clone);
        midcardUpdateValues(clone, rainyCountries, j, icon);
      }
      currentRainyValue = currentInputValue;
    } else if (currentRainyValue == currentInputValue) {
      for (let i = 0; i < currentRainyValue; i++) {
        var clone = elementCard.cloneNode(true);
        clone.id = "city-card" + i;
        document.getElementById("total-cards").appendChild(clone);
        midcardUpdateValues(clone, rainyCountries, i, icon);
      }
    }
  } else if (rainyCountries.length < 3) {
    for (let j = 0; j < rainyCountries.length; j++) {
      var clone = elementCard.cloneNode(true);
      clone.id = "city-card" + j;
      document.getElementById("total-cards").appendChild(clone);
      midcardUpdateValues(clone, rainyCountries, j, icon);
    }
    currentRainyValue = rainyCountries.length;
  }
  cardAlignment(currentInputValue, rainyCountries.length);
}


/**
 *To hide the scroll image if the city list is less than the expected number
 * @param {Number} numberOption
 * @param {Number} countryLength
 */
function cardAlignment(numberOption, countryLength) {
  if (numberOption <= 4 && countryLength > 4) {
    document
      .getElementById("total-cards")
      .setAttribute("style", "justify-content: center");
    document
      .getElementById("scroll1")
      .setAttribute("style", "visibility: hidden");
    document
      .getElementById("scroll2")
      .setAttribute("style", "visibility: hidden");
  } else if (countryLength <= 4) {
    document
      .getElementById("total-cards")
      .setAttribute("style", "justify-content: center");
    document
      .getElementById("scroll1")
      .setAttribute("style", "visibility: hidden");
    document
      .getElementById("scroll2")
      .setAttribute("style", "visibility: hidden");
  } else {
    document
      .getElementById("scroll1")
      .setAttribute("style", "visibility: visible");
    document
      .getElementById("scroll2")
      .setAttribute("style", "visibility: visible");
    document
      .getElementById("total-cards")
      .setAttribute("style", "justify-content: normal");
  }
}


/**
 *To clear the previous selected border of the icons
 */
function clearBorder() {
  for (let i = 0; i < 3; i++) {
    document
      .getElementById("icon" + (i + 1))
      .setAttribute("style", "border-bottom-style: none");
  }
}


/**
 *Updating the values of the current city boxes during runtime
 * @param {Number} val
 * @param {list} currentCountry
 * @param {Number} index
 * @param {string} icon
 */
function midcardUpdateValues(val, currentCountry, index, icon) {
  var currentCity = currentCountry[index].cityName.toLowerCase();
  val
    .querySelector("#city-card-image")
    .setAttribute(
      "style",
      "background-image: url('./Assets/HTML & CSS/Icons for cities/" +
        currentCity +
        ".svg')"
    );
  val.querySelector("#middle-temp-icon").src =
    "./Assets/HTML & CSS/Weather Icons/" + icon + ".svg";
  val.querySelector("#middle-city-name").innerText =
    currentCountry[index].cityName;
  val.querySelector("#middle-temperature").innerText =
    currentCountry[index].temperature;
  var currentHours;
  var currentTimezone;
  var timestamp;
  mytimer1();
  clearInterval(timer1);
  timer1 = setInterval(mytimer1, 500);
  function mytimer1() {
    currentTimezone = new Date().toLocaleString("en-US", {
      timeZone: totalJsonfile[currentCity].timeZone,
    });
    currentHours = new Date(currentTimezone).getHours() % 12;
    if (new Date(currentTimezone).getHours() >= 12) {
      timestamp = "PM";
    } else {
      timestamp = "AM";
    }
    const date = new Date(currentTimezone).getDate();
    val.querySelector("#middle-city-date").innerText =
      (date < 10 ? "0" + date : date) +
      "-" +
      new Date().toLocaleString(
        "en-US",
        { month: "short" },
        { timeZone: currentTimezone }
      ) +
      "-" +
      new Date(currentTimezone).getFullYear();
    if (currentHours == 0) {
      currentHours = 12;
    }
    val.querySelector("#middle-city-time").innerText =
      (currentHours < 10 ? "0" + currentHours : currentHours) +
      ":" +
      (new Date(currentTimezone).getMinutes() < 10
        ? "0" + new Date(currentTimezone).getMinutes()
        : new Date(currentTimezone).getMinutes()) +
      " " +
      timestamp;
    timer1 = setInterval(mytimer1, 500);
    clearInterval(timer1);
  }
  val.querySelector("#middle-humidity").innerText =
    currentCountry[index].humidity;
  val.querySelector("#middle-precipitation").innerText =
    currentCountry[index].precipitation;
}
