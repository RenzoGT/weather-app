"use strict";

const searchButton = document.getElementById("search-button");
const cardContainer = document.getElementById("card-container");
const cityName = document.getElementById("city-name");
const cityDescription = document.getElementById("city-description");
const cityTemperature = document.getElementById("city-temperature");
const cityMinMax = document.getElementById("city-min-max-temp");
const countryCode = document.getElementById("country-code");
const countryFlag = document.getElementById("flag");
const svgImg = document.getElementById("svgImg");

let city;

const weatherChanger = (svg, bcColor) => {
  svgImg.setAttribute("src", svg);
  cardContainer.style.backgroundColor = bcColor;
};

const fetchCity = () => {
  city = document.getElementById("city-input").value;

  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=00c7191572228e32b959088766a4c4f0`
  )
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else {
        throw new Error("City not found.");
      }
    })
    .then((data) => {
      console.log(data);
      cityName.innerText = data.name;

      cityDescription.innerText = data.weather[0].main;

      cityTemperature.innerText = `${data.main.temp} °C`;

      cityMinMax.innerText = `Min: ${data.main.temp_min} °C / Max: ${data.main.temp_max} °C`;

      countryCode.innerText = data.sys.country;

      countryFlag.setAttribute(
        "src",
        `https://flagcdn.com/${data.sys.country.toLowerCase()}.svg`
      );

      switch (data.weather[0].main) {
        case "Clouds":
          weatherChanger("/assets/clouds.svg", "darkgrey");
          break;
        case "Sun":
          weatherChanger("/assets/sun.svg", "deepskyblue");
          break;
        case "Thunderstorm":
          weatherChanger("/assets/thunderstorm.svg", "grey");
          break;
        case "Drizzle":
        case "Rain":
          weatherChanger("/assets/rain.svg", "grey");
          break;
        case "Snow":
          weatherChanger("/assets/snow.svg", "#858fd9");
          break;
        case "Clear":
          weatherChanger("/assets/clearsky.svg", "deepskyblue");
          break;
      }
    })
    .catch((err) => alert(err));
};

searchButton.addEventListener("click", () => fetchCity());
window.addEventListener("keypress", (evt) => {
  if (evt.key == "Enter") {
    fetchCity();
  }
});
