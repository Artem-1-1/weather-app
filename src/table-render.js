import * as icons from './icons.js';

const convertToCelsius = function(fahrenheit) {
  return Math.round((fahrenheit - 32) * (5 / 9) * 10) / 10;
};

function processWeatherData(response) {

  let icon =  response.currentConditions.icon;

  let address = response.address;
  let days = response.days;

  const container = document.getElementById('weather-table');
  container.innerHTML = '';

  const headerIcon = document.createElement('div');
  headerIcon.id = 'headerIcon';

  const titleIcon = document.createElement('img');

  switch (icon) {
  case 'clear-day':
    titleIcon.src = icons.clearDay;
    titleIcon.alt = 'Clear Day';
    break;
  case 'clear-night':
    titleIcon.src  = icons.clearNight;
    titleIcon.alt = 'Clear Night';
    break
  case 'cloudy':
    titleIcon.src  = icons.cloudy;
    titleIcon.alt = 'Cloudy';
    break;
  case 'fog':
    titleIcon.src  = icons.fog;
    titleIcon.alt = 'Fog';
    break;
  case 'hail':
    titleIcon.src  = icons.hail;
    titleIcon.alt = 'Hail';
    break;
  case 'partly-cloudy-day':
    titleIcon.src  = icons.partlyCloudyDay;
    titleIcon.alt = 'Fog';
    break;
  case 'partly-cloudy-night':
    titleIcon.src  = icons.partlyCloudyNight;
    titleIcon.alt = 'Partly Cloudy Night';
    break;  
  case 'rain-snow-showers-day':
    titleIcon.src  = icons.rainSnowShowersDay;
    titleIcon.alt = 'Rain Shower Day';
    break;
  case 'rain-snow-showers-night':
    titleIcon.src  = icons.rainSnowShowersNight;
    titleIcon.alt = 'Rain Shower Night';
    break;
  case 'rain-snow':
    titleIcon.src  = icons.rainSnow;
    titleIcon.alt = 'Rain Snow';
    break; 
  case 'rain':
    titleIcon.src  = icons.rain;
    titleIcon.alt = 'Rain';
    break;
    case 'showers-day':
    titleIcon.src  = icons.showersDay;
    titleIcon.alt = 'Showers Day';
    break;   
  case 'showers-night':
    titleIcon.src  = icons.showersNight;
    titleIcon.alt = 'Showers Night';
    break;
    case 'sleet':
    titleIcon.src  = icons.sleet;
    titleIcon.alt = 'Sleet';
    break;      
  case 'snow-showers-day':
    titleIcon.src  = icons.thunderShowersDay;
    titleIcon.alt = 'Thunder Showers Day';
    break;
  case 'snow-showers-night':
    titleIcon.src  = icons.thunderShowersNight;
    titleIcon.alt = 'Thunder Showers Night';
    break;
  case 'snow':
    titleIcon.src  = icons.snow;
    titleIcon.alt = 'Snow';
    break;
  case 'thunder-rain':
    titleIcon.src  = icons.thunderRain;
    titleIcon.alt = 'Thunder Rain';
    break; 
  case 'thunder-showers-day':
    titleIcon.src  = icons.thunderShowersDay;
    titleIcon.alt = 'Thunder Shower Day';
    break;
  case 'thunder-showers-day':
    titleIcon.src  = icons.thunderShowersNight;
    titleIcon.alt = 'Thunder Shower Night';
    break;      
  case 'thunder':
    titleIcon.src  = icons.thunder;
    titleIcon.alt = 'Thunder';
    break;
  case 'wind':
    titleIcon.src  = icons.wind;
    titleIcon.alt = 'Wind';
    break;        
}

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

  headerIcon.appendChild(titleIcon);
  headerIcon.appendChild(tableTitle)
  container.appendChild(headerIcon)
  container.appendChild(table);
}

export { processWeatherData };