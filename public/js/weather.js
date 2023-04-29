
const weather = document.querySelector(`.weather__weather`);
const city = document.querySelector(`.weather__city`);


const API_KEY = "7a38e6a93c3e57a925e618636e9ba5fb";

/**
 * 날씨와 시간을 화면에 표시합니다.
 * @param {*} lan 
 * @param {*} lon 
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
 * 위치를 가져옵니다.
 * @param {} position 
 */
const onGeoOk = function (position) {
    const {
            coords: {latitude, longitude}
        } = position;

    
    localStorage.setItem("coords", JSON.stringify({latitude, longitude}));
    
    getWeather(latitude, longitude);
   
}

/**
 * 위치정보에 접근 할 수없을떄
 * 실행됩니다.
*/
const onGeoError = function() {
    alert(`Can't find you. No weather for you`);
    city.innerText = "Nowhere";
    weather.innerText = "raining quokkas and kangaroos"
}

/**
 * 위치정보를 가져옵니다.
 * 
 * localStorage에 위치정보가
 * 있다면  그대로 사용합니다
 * 없다면 navgator로 입력받습니다.
 * @returns 
 */

const loadWeather = function() {
    const coords = localStorage.getItem("coords");
    if (coords !== null) {
        const { latitude, longitude } = JSON.parse(coords);
        getWeather(latitude, longitude);
        return;
    } else {
        navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
    }
}

const init = function () {
    loadWeather();
}

init();



