const clockTag = document.querySelector(".clock__time");
const date = new Date();


/**show time on screen*/
const setTime = function() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2,"0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = `seconds: ${date.getSeconds().toString().padStart(2, "0")}`;

    const clock = `${hours}:${minutes}`;
    clockTag.innerHTML = `<abbr title="${seconds}">${clock}</abbr>`;

}

setTime();
setInterval(setTime, 1000);