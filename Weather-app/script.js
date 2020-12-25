const mainEl = document.getElementById("main");
const formEL = document.getElementById("form");
const searchEl = document.getElementById("search");

const url = "https://api.openweathermap.org/data/2.5/weather?q=";

async function getWeatherByLocation(location) {
  const resp = await fetch(url + location + "&appid=" + apikey);

  const respData = await resp.json();
  console.log(respData, KtoC(respData.main.temp));
  addWeatherToPage(respData);
}

//getWeatherByLocation("Ouagadougou");

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);
  const weather = document.createElement("div");
  const weatherImg =
    "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  weather.classList.add("weather");

  weather.innerHTML = `
    <h2>
        <img src="${weatherImg}" />     ${temp}ºC 
        <img src="${weatherImg}" />
    </h2>
    <small>${data.weather[0].main}</small>
    `;
  //cleanup
  mainEl.innerHTML = "";

  mainEl.appendChild(weather);
}

function KtoC(K) {
  return Math.floor(K - 273.15);
}

formEL.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchEl.value;

  if (location) {
    getWeatherByLocation(location);
  }
});
