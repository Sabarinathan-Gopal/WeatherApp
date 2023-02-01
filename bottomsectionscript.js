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