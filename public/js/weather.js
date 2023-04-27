
const weather = document.querySelector(`.weather__weather`);
const city = document.querySelector(`.weather__city`);


const API_KEY = "7a38e6a93c3e57a925e618636e9ba5fb";

const onGeoOk = function (position) {
    const {
            coords: {latitude, longitude}
        } = position;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
     
     fetch(apiUrl)
     .then((response)=> response.json())
     .then((data)=>{
        console.log(data);
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });

}

const onGeoError = function() {
    alert(`Can't find you. No weather for you`);
    city.innerText = "Nowhere";
    weather.innerText = "raining quokkas and kangaroos"
}


navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);




