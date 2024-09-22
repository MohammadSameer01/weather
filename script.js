let searchButton = document.querySelector(".searchIcon");
let searchInput = document.getElementById("seachInput");

let weatherContainer = document.querySelector(".weatherContainer");
let resultContainer = document.querySelector(".resultContainer");
let errorMsgCnt = document.querySelector(".errorMsg");

let cityName = document.querySelector(".cityName");
let countryImageClass = document.querySelector(".countryImageClass img");
let degree = document.querySelector(".degree");
let description = document.querySelector(".description");
let weatherImage = document.querySelector(".tempIcon img");
let windSpeed = document.querySelector(".windCnt span");
let humidity = document.querySelector(".humidityCnt span");
let minimumTemperature = document.querySelector(".minTemp span");
let maximumTemperature = document.querySelector(".maxTemp span");
let seaLevel = document.querySelector(".seaLevel span");
let groundLevel = document.querySelector(".groundLevel span");
let sunrise = document.querySelector(".sunrise span");
let sunset = document.querySelector(".sunset span");

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

async function searchWeather() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
  let apiKey = ` &appid=e707dcb905a71e4ec1535e4b42453448`;

  let requestUrl = `${apiUrl}${searchInput.value}${apiKey}`;
  response = await fetch(requestUrl);
  response = await response.json();
  console.log(response);

  if (response.cod < 400) {
    resultContainer.classList.add("result200");
    weatherContainer.style.transform = "translate(0)";
    errorMsgCnt.style.display = "none";

    let countryImageUrl = `https://flagsapi.com/${response.sys.country}/flat/64.png`;
    countryImageClass.src = countryImageUrl;

    //SunriseSunset TimeStamp to Date
    let sunriseTimestamp = response.sys.sunrise;
    let sunsetTimestamp = response.sys.sunset;

    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunsetDate = new Date(sunsetTimestamp * 1000);

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    let stateName = response.sys.country;

    cityName.innerHTML = `${response.name} , <span class= 'stateNameClass'>${stateName}</span>`;
    degree.innerHTML = `${Math.round(
      response.main.temp
    )}&deg <span>Celsius</span>`;
    description.innerText = response.weather[0].description;
    weatherImage.src = `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`;
    windSpeed.innerText = `${(response.wind.speed * 3.6).toFixed(2)}km/h`;
    humidity.innerText = `${response.main.humidity}%`;
    minimumTemperature.innerText = `${response.main.temp_min}`;
    maximumTemperature.innerText = `${response.main.temp_max}`;
    seaLevel.innerText = `${response.main.sea_level}Hpa`;
    groundLevel.innerText = `${response.main.grnd_level}Hpa`;
    sunrise.innerText = sunriseDate.toLocaleTimeString("en-US", options);
    sunset.innerText = sunsetDate.toLocaleTimeString("en-US", options);
  } else {
    resultContainer.classList.remove("result200");
    errorMsgCnt.style.display = "block";
    errorMsgCnt.innerHTML = `
    <div>${response.cod}</div>
    <div>${response.message}</div>
    `;
  }
}

searchButton.addEventListener("click", () => {
  searchWeather();
  //   cityImage();
});

// async function cityImage() {
//   let tempAndDis = document.querySelector(".resultContainer");
//   city = searchInput.value;
//   console.log(city);
//   apiUrl = `https://pixabay.com/api/?key=46101161-7ebe95dd89ed1db19aa6c30ad&q=${city}&image_type=photo&pretty=true`;

//   let response = await fetch(apiUrl);
//   response = await response.json();
//   console.log(response.hits[0].largeImageURL);

//   tempAndDis.style.backgroundImage = ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)),url(${response.hits[0].largeImageURL})`;
//   tempAndDis.style.backgroundSize = `cover`;
//   tempAndDis.style.backgroundPosition = `center`;
// }

(function onLoadValues() {
  searchInput.value = "Warangal";
  searchWeather();
})();
