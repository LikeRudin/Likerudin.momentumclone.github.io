const weatherElement = document.querySelector(`.weather__weather`);
const cityElement = document.querySelector(`.weather__city`);


const API_KEY = "7a38e6a93c3e57a925e618636e9ba5fb";

const fetchDayWeather =  async (lan, lon) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lan}&lon=${lon}&appid=${API_KEY}&units=metric`;    
    const response = await fetch(apiUrl)
    const data = response.json();
    return data;    
}

const paintWeather = (data) => {
    const {
        name,
        weather:{0: {main: weather}} ,
        main: { temp },
        } = data;
    cityElement.innerText = name;
    weatherElement.innerText = `${weather} / ${temp}`;
}

const paintError = () => {
    cityElement.innerText = "no where";
    weatherElement.innerText = "nothing";
}

const fetchFiveDayWeather = async (lat,lon)=> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data
}

const printFiveDayForecast = (data) =>{
    const weatherList = data["list"]; 
    const fiveWeathers = [];
    for (let i = 7; 40 > i ; i += 8) {
        const {dt_txt, weather} = weatherList[i]; 
        fiveWeathers.push([dt_txt, weather[0]["main"]]);  
    }
    console.log(fiveWeathers);
}

const onGeoOk = (position) => {
    const {
        coords: {latitude, longitude}
    } = position;
    sessionStorage.setItem("coords", JSON.stringify({latitude, longitude}));   
}

const onGeoError = () => {
    console.log("위치정보를 찾을 수 없습니다.");
}


const loadCoords = async () => {
    const coords = sessionStorage.getItem("coords");

    if (coords !== null) {
        const { latitude, longitude } = JSON.parse(coords);
        return {latitude, longitude}
    } else {
        const position = await new Promise((onGeoOk, onGeoError) =>{
            navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
        });
        const {latitude, longitude} = position.coords
        return {latitude, longitude}
}}


/*initialize */
const init =  async () => {
    try{
        const {latitude, longitude} = await loadCoords();
        
        const weatherData = await fetchDayWeather(latitude, longitude);
        paintWeather(weatherData);
        
        const forecastData = await fetchFiveDayWeather(latitude, longitude);
        printFiveDayForecast(forecastData);

    } catch (error){
        console.log(error);
        alert("failed to load");
        paintError();
    }
}

init();



