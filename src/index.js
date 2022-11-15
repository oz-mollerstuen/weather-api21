import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getWeather(city, state) {
  let request = new XMLHttpRequest();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},&appid=${process.env.API_KEY}&units=imperial`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, city, state);
    } else {
      printError(this, response, city);
      
    }
  });

  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printElements(apiResponse, city, state) {
  document.querySelector('#showResponse').innerText = `The humidity in ${city} ${state} , is ${apiResponse.main.humidity}%. 
  The temperature in American is ${apiResponse.main.temp} degrees. and ${apiResponse.weather[0].description}`
  
}


function printError(request, apiResponse, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value; 
  document.querySelector('#location').value = null;
  getWeather(city);
}


window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});