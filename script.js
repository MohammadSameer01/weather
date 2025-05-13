const searchInput = document.getElementById("search-city");
const searchButton = document.querySelector(".search-icon-container");
//
//
//
async function getWeather(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
  const apiKey = `e707dcb905a71e4ec1535e4b42453448`;
  const requestUrl = `${apiUrl}${encodeURIComponent(cityName)}&appid=${apiKey}`;

  try {
    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return null;
  }
}
searchButton.addEventListener("click", () => {
  if (navigator) {
    navigator.vibrate(30);
  }
  updateData();
});
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (navigator) {
      navigator.vibrate(30); // Optional: vibration
    }
    updateData();
  }
});
async function updateData() {
  const loader = document.querySelector(".loader");
  try {
    const city = searchInput.value.trim();
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    // Show loader
    loader.style.display = "flex";

    const data = await getWeather(city);
    console.log(data);

    if (!data || data.cod !== 200) {
      alert("City not found or API error.");
      return;
    }
    //
    const countryDetails = findCountry(data.sys.country);
    //
    selectAndUpdate("city-name", data.name);
    selectAndUpdate("country-name", countryDetails.name);
    selectAndUpdate("temp", `${Math.round(data.main.temp)}°`);
    selectAndUpdate("feelsLike", `${Math.round(data.main.feels_like)}°`);
    selectAndUpdate("weather-description", data.weather[0].description);
    selectAndUpdate("humidity", `${data.main.humidity}%`);
    selectAndUpdate("min-temperature", `${Math.round(data.main.temp_min)}°`);
    selectAndUpdate("max-temperature", `${Math.round(data.main.temp_max)}°`);
    selectAndUpdate(
      "sea-level",
      data.main.sea_level ? `${data.main.sea_level}hPa` : "N/A"
    );
    selectAndUpdate(
      "ground-level",
      data.main.grnd_level ? `${data.main.grnd_level}hPa` : "N/A"
    );
    selectAndUpdate("sunrise", sunriseSunset()[0]);
    selectAndUpdate("sunset", sunriseSunset()[1]);
    selectAndUpdate(
      "weather-paragraph",
      weatherParagraph(data.sys.country, data.name)
    );
    //
    //
    //
    function updateFlag(countryCode) {
      const imageTag = document.querySelector(".country-flag");
      if (imageTag && countryCode) {
        imageTag.setAttribute(
          "src",
          `https://flagsapi.com/${countryCode}/flat/64.png`
        );
        imageTag.setAttribute("alt", `Flag of ${countryDetails.name}`);
      } else {
        imageTag.style.display = "none";
      }
    }
    function sunriseSunset() {
      //SunriseSunset TimeStamp to Date
      let sunriseTimestamp = data.sys.sunrise;
      let sunsetTimestamp = data.sys.sunset;
      const sunriseDate = new Date(sunriseTimestamp * 1000);
      const sunsetDate = new Date(sunsetTimestamp * 1000);

      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      return [
        sunriseDate.toLocaleTimeString("en-US", options),
        sunsetDate.toLocaleTimeString("en-US", options),
      ];
    }
    //
    //
    //
    updateFlag(data.sys.country);
    updateBackground(data.weather[0].description);
    searchBarStyles();
    updateWind(data.wind);
    //
    //
    //
    searchInput.value = "";
  } catch (error) {
    console.error("Error in updateData():", error.message);
  } finally {
    loader.style.display = "none";
  }
}
function selectAndUpdate(className, value) {
  if (className) {
    const element = document.querySelector(`.${className}`);
    element.textContent = value;
  }
}
function findCountry(identifier) {
  if (!identifier) return null;

  const searchTerm = identifier.trim().toLowerCase();

  const country = countries.find(
    (c) =>
      c.code.toLowerCase() === searchTerm || c.name.toLowerCase() === searchTerm
  );
  return country || null;
}
function searchBarStyles() {
  let searchInputContainer = document.querySelector(".search-city-section");
  if (document.querySelector(".country-name").textContent == "") {
    searchInputContainer.style.marginTop = "240px";
  } else {
    searchInputContainer.style.marginTop = "0";
  }
}
function updateBackground(weatherDescription) {
  const hero = document.querySelector(".hero-background");
  const metaThemeColor = document.querySelector("meta[name='theme-color']");

  if (!hero || !weatherDescription) return;

  const normalized = weatherDescription.toLowerCase().replace(/\s+/g, "-");
  const root = getComputedStyle(document.documentElement);
  const gradient = root.getPropertyValue(`--${normalized}`).trim();

  if (gradient) {
    hero.style.background = gradient;

    // Extract the first color in the gradient
    const match = gradient.match(/#(?:[0-9a-fA-F]{3}){1,2}/);
    if (match && metaThemeColor) {
      metaThemeColor.setAttribute("content", match[0]);
    }
  } else {
    const fallback = "linear-gradient(to bottom, #c9d6ff, #e2e2e2, #ffffff)";
    hero.style.background = fallback;
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#c9d6ff"); // fallback first color
    }
  }
}
function onStart() {
  searchInput.value = "Hyderabad";
  updateData();
}
function updateWind(windData) {
  if (!windData || typeof windData.speed !== "number") return;

  const speedKmh = (windData.speed * 3.6).toFixed(1);
  const direction = getWindDirection(windData.deg);

  selectAndUpdate("wind-speed", `${speedKmh}km/h`);
  selectAndUpdate("wind-direction", direction);

  // Rotate compass arrow
  const compassNeddle = document.querySelector(".compass-needle");
  if (compassNeddle && typeof windData.deg === "number") {
    compassNeddle.style.transform = `rotate(${windData.deg}deg)`;
  }
}
function getWindDirection(degrees) {
  const directions = [
    "North",
    "NorthEast",
    "East",
    "SouthEast",
    "South",
    "SouthWest",
    "West",
    "NorthWest",
    "North",
  ];
  const index = Math.round(degrees / 45);
  return directions[index];
}
function weatherParagraph(countryCode, cityName) {
  let data = findCountry(countryCode);
  let country = data.name;
  let continent = data.continent;
  let weatherPattern = data.weatherPattern;
  let temperatureRange = data.temperatureRange;
  let notes = data.notes;

  return `${cityName}, located in ${country} (${continent}), typically experiences ${weatherPattern} climate. Temperature ranges from ${temperatureRange}. Notable weather characteristics include: ${notes}`;
}
//
//
//
searchBarStyles();
onStart();
