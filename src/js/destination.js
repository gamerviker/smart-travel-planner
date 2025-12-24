// Read city from URL
const params = new URLSearchParams(window.location.search);
const city = params.get("city");

// DOM elements
const cityName = document.getElementById("cityName");
const loading = document.querySelector("#loading");
const cityInfo = document.querySelector("#cityInfo");
const errorBox = document.querySelector("#error");

// console.log(loading);


const lat = document.querySelector("#lat");
const lon = document.querySelector("#lon");
const country = document.querySelector("#country");
const population = document.querySelector("#population");
const state = document.querySelector("#state");

// API details
const GEODB_API_KEY = "729cfb446amsh7c28abd4fb84ddfp1b52f3jsnde05037bfc40";
const GEODB_HOST = "wft-geo-db.p.rapidapi.com";

// Check if city exists in URL
if (city) {
  cityName.textContent = city;
  loading.classList.add("hidden");

  async function fetchCityDetails(cityNameValue) {
    try {
      const response = await fetch(
        `https://${GEODB_HOST}/v1/geo/cities?namePrefix=${cityNameValue}&limit=1`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": GEODB_API_KEY,
            "X-RapidAPI-Host": GEODB_HOST,
          },
        }
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      if (!data.data || data.data.length === 0) {
        throw new Error("City not found");
      }

      const cityData = data.data[0];

      // Populate UI
      lat.textContent = cityData.latitude;
      lon.textContent = cityData.longitude;
      country.textContent = cityData.country;
      state.textContent = cityData.region || "N/A";
      population.textContent = cityData.population
        ? cityData.population.toLocaleString()
        : "N/A";

      loading.classList.add("hidden");
      cityInfo.classList.remove("hidden");
    } catch (error) {
      console.error(error);
      loading.classList.add("hidden");
      errorBox.classList.remove("hidden");
    }
  }

  fetchCityDetails(city);
} else {
  cityName.textContent = "Unknown City";
  loading.classList.add("hidden");
  errorBox.classList.remove("hidden");
}

document.querySelector("#weatherBtn").href = `weather.html?city=${city}`;
