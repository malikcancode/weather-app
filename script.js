const apikey = "679c4c1b18a725557e04c0296c12acc7";

const city = document.querySelector("city");
const description = document.querySelector("description");
const temp = document.querySelector("temp");
const details = document.querySelector("details");
const cityInput = document.getElementById("city-input");
const submit = document.getElementById("submit");
const form = document.querySelector("form");


form.addEventListener("submit", function (event) {
    event.preventDefault();
    const cityValue = cityInput.value;
    getWeather(cityValue);
})


async function getWeather(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        if (!response.ok) {
            throw new Error("Error Happened");
        }
        const data = await response.json();
        console.log(data);
        const temprature = Math.round(data.main.temp);
        const cityName = data.name;
        const descriptions = data.weather[0].description;
        const icon = data.weather[0].icon;
        const detailed = [
            `Feels like :${Math.round(data.main.feels_like)}`,
            `Humidity :${data.main.humidity}%`,
            `Wind Speed :${data.wind.speed} m/s`
        ];

        form.querySelector(
            ".icon"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

        form.querySelector(".description").textContent = `${descriptions}`;
        form.querySelector(".city").textContent = `${cityName}`;
        form.querySelector(".temp").textContent = `${temprature} °C`;
        form.querySelector(".details").innerHTML = detailed
            .map((detail) => `<div>${detail}</div>`)
            .join("");

    } catch (error) {
        form.querySelector(".temp").textContent = "";
        form.querySelector(".description").textContent = "An error happened, please try again later";
        form.querySelector(".details").innerHTML = "";
    }

}


