import "./style.css";

let key = '7NT5VL6DQ7MGTQWQ9ATHL5PBK';

const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const country = document.getElementById('country').value;
  const city = document.getElementById('city').value;

  console.log(country, city);
  getWeather(country, city)
  form.reset(); 
})

async function getWeather(country,city) {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${country}/?key=${key}`, {
      method: 'GET',
      headers: {

      },
    });

    if (!response.ok) {
      throw new Error(`Http error! Status: ${response.status}`);
    }

    const data = await response.json();
    processWeatherData(data);
  } catch (error){
    console.error("An error occurred while retrieving weather data:", error);
  }
}

const convertToCelsius = function(fahrenheit) {
  return Math.round((fahrenheit - 32) * (5 / 9) * 10) / 10;
};

function processWeatherData(response) {
  
  let location = response.resolvedAddress;
  let days = response.days;
  console.log("Location: "+ location);
  for (let i=0; i < days.length; i++) {
    let maxCelsius = convertToCelsius(days[i].tempmax);
    let minCelsius = convertToCelsius(days[i].tempmin);
    console.log(days[i].datetime+": tempmax = "+maxCelsius+"°C, tempmin = "+minCelsius+"°C");
  }
}