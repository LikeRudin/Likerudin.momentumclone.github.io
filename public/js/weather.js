
const weather = document.querySelector(`.weather__weather`);
const city = document.querySelector(`.weather__city`);


const API_KEY = "7a38e6a93c3e57a925e618636e9ba5fb";

/**
 * show weather and city
 * @param {*} lan: langitude 
 * @param {*} lon: longtitude
 */
const getWeather = function (lan, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lan}&lon=${lon}&appid=${API_KEY}&units=metric`;
     
     fetch(apiUrl)
     .then((response)=> response.json())
     .then((data)=>{
        console.log(data);
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });


}

/**
 * get current position.
 * @param {} position 
 */
const onGeoOk = function (position) {
    const {
            coords: {latitude, longitude}
        } = position;

    
    sessionStorage.setItem("coords", JSON.stringify({latitude, longitude}));
    
    getWeather(latitude, longitude);
   
}

/**show Error message*/
const onGeoError = function() {
    alert(`Can't find you. No weather for you`);
    city.innerText = "Nowhere";
    weather.innerText = "raining quokkas and kangaroos"
}

/** get user's location information from sessionStorage if exists,
 * if doesn't, get that from navigator Object
 * @returns 
 */
const loadWeather = function() {
    const coords = sessionStorage.getItem("coords");
    if (coords !== null) {
        const { latitude, longitude } = JSON.parse(coords);
        getWeather(latitude, longitude);
        return;
    } else {
        navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
    }
}

/*initialize */
const init = function () {
    loadWeather();
}

init();



