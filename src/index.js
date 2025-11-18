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
  
  let address = response.address;
  let days = response.days;

  const container = document.getElementById('weather-table');
  container.innerHTML = '';

  const tableTitle = document.createElement('h2');
  tableTitle.textContent = address;
  tableTitle.id = 'table-title';

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headerRow = document.createElement('tr');

  function createHeaderCell(text) {
    const cell = document.createElement('th');
    cell.textContent = text;
    return cell;
  }

  headerRow.appendChild(createHeaderCell('Date'));
  headerRow.appendChild(createHeaderCell('Min Temperature(°C)'));
  headerRow.appendChild(createHeaderCell('Max Temperature(°C)'));


  thead.appendChild(headerRow);
  table.appendChild(thead);


  for (let i = 0; i < days.length; i++) {
    let maxCelsius = convertToCelsius(days[i].tempmax);
    let minCelsius = convertToCelsius(days[i].tempmin);

    const dataRow = document.createElement('tr');
        
      
    function createDataCell(text) {
        const cell = document.createElement('td');
        cell.textContent = text;
        return cell;
    }

  dataRow.appendChild(createDataCell(days[i].datetime));
  dataRow.appendChild(createDataCell(minCelsius));
  dataRow.appendChild(createDataCell(maxCelsius));

  
  tbody.appendChild(dataRow);
  }
  table.appendChild(tbody);
  container.appendChild(tableTitle);
  container.appendChild(table);
}