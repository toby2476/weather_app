const searchQuery = document.getElementById("search-query");
const apiKey = "23b1899a10efc4a4f9c618a45f98498d";

async function getWeather() {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery.value}&appid=${apiKey}`;

    const response = await fetch(endpoint);
    const json = await response.json();

    if (json.cod === "404") {
        return;
    }

    document.getElementById("city-name").innerHTML = json.name;

    const temp_scale = document.getElementsByName("temp_scale");
    if (temp_scale[0].checked) {
        document.getElementById("temperature").innerHTML = Math.floor(json.main.temp - 273.15) + "°C";
    } else {
        document.getElementById("temperature").innerHTML = Math.floor(((json.main.temp - 273.15) * (9/5)) + 32) + "°F";
    }

    const words = json.weather[0].description.split(" ");
    const desc_with_capitals = words.map(word => word[0].toUpperCase() + word.substring(1)).join(" ");
    document.getElementById("description").innerHTML = desc_with_capitals;

    const weatherElement = document.querySelector(".weather");
    const weatherMain = json.weather[0].main;

    switch(weatherMain) {
        case "Clear":
            weatherElement.style.backgroundImage = "url(./images/clear_sky.jpg)";
            document.querySelector("h1").style.color = "black";
            document.querySelector("h2").style.color = "black";
            document.querySelector("h3").style.color = "grey";
            break;
        case "Clouds":
            weatherElement.style.backgroundImage = "url(./images/cloudy.jpg)";
            document.querySelector("h1").style.color = "black";
            document.querySelector("h2").style.color = "black";
            document.querySelector("h3").style.color = "grey";
            break;
        case "Snow":
            weatherElement.style.backgroundImage = "url(./images/snow.jpg)";
            document.querySelector("h1").style.color = "black";
            document.querySelector("h2").style.color = "black";
            document.querySelector("h3").style.color = "grey";
            break;            
        case "Rain":
            weatherElement.style.backgroundImage = "url(./images/rain.jpg)";
            document.querySelector("h1").style.color = "white";
            document.querySelector("h2").style.color = "white";
            document.querySelector("h3").style.color = "lightgrey";
            break;
        case "Thunderstorm":
            weatherElement.style.backgroundImage = "url(./images/thunderstorm.png)";
            document.querySelector("h1").style.color = "white";
            document.querySelector("h2").style.color = "white";
            document.querySelector("h3").style.color = "lightgrey";
            break;
        case "Drizzle":
            weatherElement.style.backgroundImage = "url(./images/drizzle.jpg)";
            document.querySelector("h1").style.color = "white";
            document.querySelector("h2").style.color = "white";
            document.querySelector("h3").style.color = "lightgrey";
            break;
        default:
            weatherElement.style.backgroundImage = "url(./images/fog.jpg)";
            document.querySelector("h1").style.color = "black";
            document.querySelector("h2").style.color = "black";
            document.querySelector("h3").style.color = "grey";
            break;
    }

    weatherElement.style.visibility = "visible";

}

const searchButton = document.getElementById("search-button");
searchButton.addEventListener('click', getWeather);