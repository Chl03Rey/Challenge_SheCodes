function currentTime() {
  let today = new Date();
  let currentDay = today.getDay();
  let currentHours = today.getHours();
  let currentMinutes = today.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[currentDay]} ${currentHours}:${currentMinutes}`;
}
let dateDisplay = document.querySelector("#currentDate");
dateDisplay.innerHTML = currentTime();

function searchCity(event) {
  event.preventDefault();
  let apiKey = "627863a58e36a8002df35a69076af8ab";
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchCity);

function displayWeather(response) {
  document.querySelector("#cityDisplay").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#descriptionWeather").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidityInfo").innerHTML =
    response.data.main.humidity;
  document.querySelector("#windInfo").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feelsTemperature").innerHTML = Math.round(
    response.data.main.feels_like
  );
}

function currentCity(position) {
  let apiKey = "627863a58e36a8002df35a69076af8ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCity);
}

currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
