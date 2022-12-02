// Date
function formattedDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${minutes}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

let currentDate = document.querySelector("#current-date");
let currentTime = new Date();

currentDate.innerHTML = formattedDate(currentTime);

// Display weather (from 'Searched' and 'Current Location')

function displayWeather(response) {
  console.log(response);
  document.querySelector("#city-name").innerHTML =
    response.data.name;
  document.querySelector("#current-temp").innerHTML =
    Math.round(response.data.main.temp);
  document.querySelector("#feels-like").innerHTML =
    Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

//Search City

function searchCity(city) {
  let apiEndpoint =
    "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiKey = "f5e814a04eddfab1740f07bf0328eee2";

  let apiUrl = `${apiEndpoint}q=${city.value}&units=${units}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(displayWeather);
}

// Get city name

function handleCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input");
  searchCity(city);
}

let searchEngine = document.querySelector("#search-city");
searchEngine.addEventListener("submit", handleCity);

// Search Current Location

function getLocation(position) {
  let apiEndpoint =
    "https://api.openweathermap.org/data/2.5/weather?";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `f5e814a04eddfab1740f07bf0328eee2`;
  let units = "metric";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let locationButton = document.querySelector(
  "#location-button"
);
locationButton.addEventListener("click", getPosition);

// Convert to Celcious or Fahrenheit
function convertToCelcius(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML = "C";
}

function convertToFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML = "F";
}

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", convertToCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener(
  "click",
  convertToFahrenheit
);
