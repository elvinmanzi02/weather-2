const choosenCity = document.querySelector("#myInput");

choosenCity.value = "Kigali";

async function getWeather() {

    let inputValue = choosenCity.value;
    let location = inputValue;


    let output = document.querySelector(".output");
    output.classList.add("outputOnclick");


    try {

        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=154e5dff6dc142acbaf112503232707&q=${location}&aqi=yes`, { mode: 'cors' });
        const data = await response.json();
        console.log(data);

        const giphyUrl = data.current.condition.icon;
        const text = data.current.condition.text;
        const time = data.location.localtime;

        const locationElement = document.querySelector("#location");
        location = location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();
        locationElement.innerHTML = `${location}`;

        const localTime = document.querySelector("#timeZone");
        localTime.textContent  = time;

        const descriptionElement = document.querySelector("#textDisplay");
        descriptionElement.textContent = text;

        const celciusElement = document.querySelector("#celciusDisplay");
        const celcius = data.current.temp_c;

        const fahrenheitElement = document.querySelector("#fahneitDisplay");
        const fahrenheit = data.current.temp_f;

        const celciusBtn = document.querySelector("#celciusBtn");
        const fahrenheitBtn = document.querySelector("#fahneitBtn");

        celciusElement.innerHTML = `${celcius} &deg;C `;

        const giphyDisplayElement = document.querySelector("#gifDisplay");
        giphyDisplayElement.src = giphyUrl;
        giphyDisplayElement.style.backgroundImage = `url(${giphyUrl})`;
        giphyDisplayElement.classList.add ("Onclick");

    

        celciusBtn.addEventListener("click", () =>{
            celciusElement.innerHTML = `${celcius} &deg;C `;
        })

        fahrenheitBtn.addEventListener("click", () =>{
            celciusElement.innerHTML = `${fahrenheit} &deg;F `;
        })


    } catch (error) {
        console.log(error);
        window.alert(`City choosen ${location}, was not found !!!!`) 
        };
    }


searchBtn = document.querySelector("#search");
searchBtn.addEventListener("click", function () {

    getWeather();
    choosenCity.value = "";

})


choosenCity .addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {

        getWeather();
        choosenCity.value = "";
    }
});



document.addEventListener("DOMContentLoaded", () => {
    getWeather();  
    choosenCity.value = "";
});
