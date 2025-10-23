const apiKey = "e600c8a9abbf7e3b4a73e32bca0d0864";
const city = "Hacienda Heights";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;

function applyAQITheme(aqiNum) {
  const card = document.getElementById("aqiCard");
  card.classList.remove("aqi-good","aqi-fair","aqi-moderate","aqi-poor","aqi-verypoor");

  let qualityText = "", themeClass = "aqi-good";
  if (aqiNum === 1) { qualityText = "GOOD"; themeClass = "aqi-good"; }
  else if (aqiNum === 2) { qualityText = "FAIR"; themeClass = "aqi-fair"; }
  else if (aqiNum === 3) { qualityText = "MODERATE"; themeClass = "aqi-moderate"; }
  else if (aqiNum === 4) { qualityText = "POOR"; themeClass = "aqi-poor"; }
  else if (aqiNum === 5) { qualityText = "VERY POOR"; themeClass = "aqi-verypoor"; }

  card.classList.add(themeClass);
  document.getElementById("aqiQuality").textContent = `QUALITY: ${qualityText}`;
}

function setWeatherIcon(main) {
  const weatherIcon = document.getElementById("weatherIcon");
  if (main === "Clear") weatherIcon.src = "sunny.png";
  else if (main === "Clouds") weatherIcon.src = "cloudy.png";
  else if (main === "Rain") weatherIcon.src = "rainy.png";
  else if (main === "Snow") weatherIcon.src = "snowy.png";
  else weatherIcon.src = "partial.png";
}

fetch(url)
  .then(res => res.json())
  .then(data => {
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const mainWeather = data.weather[0].main;
    setWeatherIcon(mainWeather);

    const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    return fetch(aqiUrl);
  })
  .then(res => res.json())
  .then(aqiData => {
    const aqiValue = aqiData.list[0].main.aqi; // 1–5
    document.getElementById("aqiNum").textContent = aqiValue;
    applyAQITheme(aqiValue);
  })
  .catch(err => {
    console.error("Error:", err);
    document.getElementById("aqiNum").textContent = "--";
    document.getElementById("aqiQuality").textContent = "QUALITY: --";
  });

const inhalerExpiration = "March 9, 2026";
const lastEntryDate = "9/21/2025 @ 14:20";

document.querySelector(".simple-card .warning").textContent = `Expiration: ${inhalerExpiration}`;
document.querySelectorAll(".simple-card p.muted")[1].textContent = `Last entry: ${lastEntryDate}`;

const userName = "[Name]";
document.getElementById("userName").textContent = userName;
