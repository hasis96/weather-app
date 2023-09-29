const userLocation = document.getElementById('userLocation');
const headerLocation = document.getElementById('headerLocation');
const searchButton = document.getElementById('searchButton');
const convertButton = document.getElementById('convertButton');
const form = document.getElementById('form');
const today = document.getElementsByClassName('today');
const tomorrow = document.getElementsByClassName('tomorrow');
const nextDay = document.getElementsByClassName('nextDay');
let tempDay;

async function updateDayFarenheit(data, day) {
  switch (day) {
    case 0:
      tempDay = today;
      tempDay.currentTemp.textContent = `${Math.floor(data.current.temp_f)}°`;
      tempDay.feelsLike.textContent = `feels like: ${Math.floor(data.current.feelslike_f)}°`;
      break;
    case 1:
      tempDay = tomorrow;
      tempDay.avgTemp.textContent = `${Math.floor(data.forecast.forecastday[day].day.avgtemp_f)}°`;
      break;
    case 2:
      tempDay = nextDay;
      tempDay.avgTemp.textContent = `${Math.floor(data.forecast.forecastday[day].day.avgtemp_f)}°`;
      break;
    default:
      console.error('error occured');
  }

  tempDay.condition.textContent = `${data.forecast.forecastday[day].day.condition.text.toLowerCase()}`;
  tempDay.lowTemp.textContent = `L: ${Math.floor(data.forecast.forecastday[day].day.mintemp_f)}° `;
  tempDay.highTemp.textContent = `H: ${Math.floor(data.forecast.forecastday[day].day.maxtemp_f)}°`;
  tempDay.humidity.textContent = `humidity: ${data.forecast.forecastday[day].day.avghumidity}%`;
  tempDay.precip.textContent = `precipitation: ${data.forecast.forecastday[day].day.totalprecip_in} in`;
  tempDay.wind.textContent = `winds: ${data.forecast.forecastday[day].day.maxwind_mph}mph`;
}

async function updateDayCelsius(data, day) {
  switch (day) {
    case 0:
      tempDay = today;
      tempDay.currentTemp.textContent = `${Math.floor(data.current.temp_c)}°`;
      tempDay.feelsLike.textContent = `feels like: ${Math.floor(data.current.feelslike_c)}°`;
      break;
    case 1:
      tempDay = tomorrow;
      tempDay.avgTemp.textContent = `${Math.floor(data.forecast.forecastday[day].day.avgtemp_c)}°`;
      break;
    case 2:
      tempDay = nextDay;
      tempDay.avgTemp.textContent = `${Math.floor(data.forecast.forecastday[day].day.avgtemp_c)}°`;
      break;
    default:
      console.error('error occured');
  }

  tempDay.condition.textContent = `${data.forecast.forecastday[day].day.condition.text}`;
  tempDay.lowTemp.textContent = `L: ${Math.floor(data.forecast.forecastday[day].day.mintemp_c)}° `;
  tempDay.highTemp.textContent = `H: ${Math.floor(data.forecast.forecastday[day].day.maxtemp_c)}°`;
  tempDay.humidity.textContent = `humidity: ${data.forecast.forecastday[day].day.avghumidity}%`;
  tempDay.precip.textContent = `precipitation: ${data.forecast.forecastday[day].day.totalprecip_mm} mm`;
  tempDay.wind.textContent = `winds: ${data.forecast.forecastday[day].day.maxwind_kph}kph`;
}

async function getWeatherFarenheit(place) {
  try {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=dce20a773104456c989234619230409&q= ${place} &days=3`;
    const response = await fetch(url, { mode: 'cors' });
    const weatherData = await response.json();
    const location = weatherData.location.name;
    headerLocation.textContent = location.toLowerCase();
    console.log(weatherData);
    updateDayFarenheit(weatherData, 0);
    updateDayFarenheit(weatherData, 1);
    updateDayFarenheit(weatherData, 2);
  } catch (error) {
    console.log(`an error occurred: ${error}`);
  }
}

async function getWeatherCelsius(place) {
  try {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=dce20a773104456c989234619230409&q= ${place} &days=3`;
    const response = await fetch(url, { mode: 'cors' });
    const weatherData = await response.json();
    const location = weatherData.location.name;
    headerLocation.textContent = location.toLowerCase();
    console.log(weatherData);
    updateDayCelsius(weatherData, 0);
    updateDayCelsius(weatherData, 1);
    updateDayCelsius(weatherData, 2);
  } catch (error) {
    console.log(`an error occurred: ${error}`);
  }
}

searchButton.addEventListener('click', () => {
  localStorage.setItem('location', userLocation.value);
  getWeatherFarenheit(userLocation.value);
  form.reset();
  console.log(localStorage.getItem('location'));
});

convertButton.addEventListener('click', () => {
  const tempLocation = localStorage.getItem('location');
  console.log(tempLocation);
  if (convertButton.classList == 'farenheit') {
    getWeatherFarenheit(tempLocation);
    convertButton.classList = 'celsius';
  } else if (convertButton.classList == 'celsius') {
    getWeatherCelsius(tempLocation);
    convertButton.classList = 'farenheit';
  }
});

getWeatherFarenheit('los angeles');
localStorage.setItem('location', 'los angeles');
