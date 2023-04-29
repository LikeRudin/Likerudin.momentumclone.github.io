const settingBtn = document.querySelector(".settings__button");
const settingsBox = document.querySelector(".settings__settings");


const backgroundSetBtn = settingsBox.querySelector(".settings__settings__background input");
const weatherSetBtn = settingsBox.querySelector(".settings__settings__weather input");
const quokkaSetBtn = settingsBox.querySelector(".settings__settings__quokka input");
const clockSetBtn = settingsBox.querySelector(".settings__settings__clock input");
const quotesSetBtn = settingsBox.querySelector(".settings__settings__quotes input");


const okBtn = settingsBox.querySelector(".settings__settings__finish button");

const weatherDiv = document.querySelector(".weather");
const quokkaDiv = document.querySelector(".quokka");
const clockDiv = document.querySelector(".clock");
const quotesDiv = document.querySelector(".quotes");



settingBtn.addEventListener("click", ()=> {
    settingsBox.classList.remove("hidden");
});

backgroundSetBtn.addEventListener("click", () =>{
    if( backgroundSetBtn.checked) {
    window.drawBackgroundImage();
    } else {
        window.initBackgroundImage();
    }
});

weatherSetBtn.addEventListener("click", () =>{
    if (weatherSetBtn.checked) {
        weatherDiv.classList.remove("hidden");
    }
    else {
        weatherDiv.classList.add("hidden");
    }
});

quokkaSetBtn.addEventListener("click", () => {
    if (quokkaSetBtn.checked) {
        quokkaDiv.classList.remove("hidden");
    }
    else{
        quokkaDiv.classList.add("hidden")
    };
});

clockSetBtn.addEventListener("click", ()=>{
    if (clockSetBtn.checked) {
        clockDiv.classList.remove("hidden");
    } else {
        clockDiv.classList.add("hidden");
    }
});

quotesSetBtn.addEventListener("click", ()=> {
    if(quotesSetBtn.checked) {
        quotesDiv.classList.remove("hidden");
    } else {
        quotesDiv.classList.add("hidden");
    }
});

okBtn.addEventListener("click", ()=> {
    settingsBox.classList.add("hidden");
});