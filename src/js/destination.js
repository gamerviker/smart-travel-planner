const params = new URLSearchParams(window.location.search);

const city = params.get("city");

const cityName = document.getElementById("cityName");

let GEODB_API_KEY = "729cfb446amsh7c28abd4fb84ddfp1b52f3jsnde05037bfc40";
let GEODB_HOST = "wft-geo-db.p.rapidapi.com";

if (city) {
  cityName.textContent = city;
  async function fetchCityDetails(cityName) {
    try {
      let response = await fetch(
        `https://${GEODB_HOST}/v1/geo/cities?namePrefix=${cityName}&limit=1`,
        {
          method: "GET",
          headers: {
            "X-Rapidapi-Key": GEODB_API_KEY,
            "X-Rapidapi-Host": GEODB_HOST,
          },
        }
      );

    //   console.log(response);

        if (!response.ok) {
            console.log("API not fetched....");
        }

        let data = await response.json();
        console.log(data);
        if(!data.data || data.data.length === 0) {
            console.log("City not found");
        }
        let cityData = data.data[0];
        console.log(cityData);
        
            
            


    } catch (error) {
      console.error(error);
    }
  }

  fetchCityDetails(city);
} else {
  cityName.textContent = "Unknown City";
}
