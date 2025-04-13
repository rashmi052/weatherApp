let userName = '';
let userLocation = '';

document.addEventListener('DOMContentLoaded', () => {
  const namePage = document.getElementById('namePage');
  const locationPage = document.getElementById('locationPage');
  const weatherPage = document.getElementById('weatherPage');
  const nameInput = document.getElementById('nameInput');
  const locationInput = document.getElementById('locationInput');
  const greetMsg = document.getElementById('greetMsg');
  const weatherHeader = document.getElementById('weatherHeader');
  const weatherCards = document.getElementById('weatherCards');

  document.getElementById('nameSubmit').addEventListener('click', () => {
    const input = nameInput.value.trim();
    if (input) {
      userName = input;
      namePage.style.display = 'none';
      locationPage.style.display = 'block';
      greetMsg.textContent = `Hi ${userName}, please enter the location you want weather info for:`;
    }
  });

  document.getElementById('locationSubmit').addEventListener('click', () => {
    const input = locationInput.value.trim();
    if (input) {
      userLocation = input;
      locationPage.style.display = 'none';
      weatherPage.style.display = 'block';
      fetchWeather(userLocation);
    }
  });

  document.getElementById('changeLocation').addEventListener('click', () => {
    weatherPage.style.display = 'none';
    locationPage.style.display = 'block';
    locationInput.value = '';
  });

  document.getElementById('backToName').addEventListener('click', () => {
    weatherPage.style.display = 'none';
    namePage.style.display = 'block';
    nameInput.value = '';
  });

  document.getElementById('darkModeToggle').addEventListener('change', function () {
    document.body.classList.toggle('dark-mode', this.checked);
  });
});

function fetchWeather(location) {
  const apiKey = '7c2857d3ddfd4e058c5102005251204';
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
      alert("Couldn't fetch weather. Check the location and try again.");
    });
}

function displayWeather(data) {
  const weatherHeader = document.getElementById('weatherHeader');
  const weatherCards = document.getElementById('weatherCards');
  weatherHeader.textContent = `Weather in ${data.location.name}, ${data.location.country}`;
  weatherCards.innerHTML = '';

  const cardData = [
    { label: 'Temperature', value: `${data.current.temp_c}°C` },
    { label: 'Pressure', value: `${data.current.pressure_mb} mb` },
    { label: 'Humidity', value: `${data.current.humidity}%` },
    { label: 'Wind Speed', value: `${data.current.wind_kph} kph` },
    { label: 'Air Quality', value: data.current.air_quality.pm2_5 ? `${data.current.air_quality.pm2_5.toFixed(2)} (PM2.5)` : 'N/A' },
    { label: 'Condition', value: data.current.condition.text }
  ];

  cardData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card animate';
    card.innerHTML = `<strong>${item.label}</strong><br>${item.value}`;
    weatherCards.appendChild(card);
  });
}
