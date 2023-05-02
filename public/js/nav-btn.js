/*
** nav-btn and main-screen (part-screens)
*/

const divList = document.querySelectorAll(".part-screen");

const todoBtn = document.querySelector(".todo button");
const todoDiv = document.querySelector(".main-screen__todo");

const pomodoroBtn = document.querySelector(".pomodoro button");
const pomodoroDiv = document.querySelector(".main-screen__pomodoro");

const calendarBtn = document.querySelector(".calendar button");
const calendarDiv = document.querySelector(".main-screen__calendar");

const utilityBtn = document.querySelector(".utility button");
const utilityDiv = document.querySelector(".main-screen__utility");


const HIDDEN_CLASSNAME = "hidden";

/**
 * login screen
 */
const mainScreen = document.querySelector(".main-screen");
const loginScreen = document.querySelector(".login-screen");
const loginForm = document.getElementById("loginForm");

const headText = document.querySelector(".quokka__message__text h1");
const headImg = document.querySelector(".quokka__image");

const basicScreen = document.querySelector(".main-screen__basic");


let name ="";

const greetArray = [
`Rise and shine, it's a brand new day!`,
`Hello there, ready to seize the day?`,
`Feel is good , make today amazing!`,
`Embrace the day with a smile!`,
`Hey, let's make today count!`,
`Welcome back, let's tackle this day together!`,
`Here's to a day full of possibilities!`,
`Carpe diem, my friend!`,
`Good to see you, let's conquer the day!`,
`Greetings, time to create some memorable moments!`,
];

const utilityGreetArray = [
    `Enjoy your journey`,
    `What's your destination this time?`,
    `Wishing you a wonderful adventure!`,
    `Have a nice trip!`,
    `where are you going?`,
    `Take lots of codes`,
    `What exciting places do you have checked?`,
    `Have an amazing exploring time`,

];

const todoGreetArray = [
    `What do you want to do?`,
    `Stay positive and keep pushing forward!`,
    `what goals are you working towards`,
    `Don't worry, belive in yourself`,
    `Keep going, you are making progress`,
    `have another great day`,
    `you made it!`,
];

const calendarGreetArray = [
    `Life is short, check your time`,
    `A well-thought-out plan is the foundation of success.`,
    `Always be prepared, failing to plan is planning to fail.`,
    `A solid plan enables you to allocate resources effectively and efficiently.`,
    `Long time no see`,
    `plan is nothing, but plan is everything`,
];

const pomodoroGreetArray = [
    `Tomato is super food`,
    `25minutes for one tomato! it's easy~`,
    `Concentration is not that hard.`,
    `Eat another one!`,
    `Want some more?`,
    `You made it!`,
    `Nico loves tomato`,
    `Be the food fighter!!`,
    `All you need is tomato`,
];

const getGreet = function(sentenceArray) {
    const lenArray = sentenceArray.length;
    const index = Math.floor(Math.random() * lenArray);
    return sentenceArray[index]
};


/** hide login screen and show mainScreen */
const changeScreen = function (name){
    headText.innerText = `welcome, ${name}`
    loginScreen.classList.add(HIDDEN_CLASSNAME);
    mainScreen.classList.remove(HIDDEN_CLASSNAME);
    const basicGreet = basicScreen.querySelector(".main-screen__basic__greet");
    basicGreet.innerText = getGreet(greetArray);
}
/** save submitted name */
const handleLogin = function(event) {
    event.preventDefault();
    const input = loginForm.querySelector("input");
    const nameValue = input.value;
    input.value = "";

    name = nameValue;

    localStorage.setItem("userName", nameValue);
    changeScreen(nameValue);

}

if (localStorage.getItem("userName")) {
     name = localStorage.getItem("userName");
    changeScreen(name);
} else {
    
mainScreen.classList.add(HIDDEN_CLASSNAME);
}

loginForm.addEventListener("submit", handleLogin);


/**
 * TODO:
 * 일일히 hidden을 반복 추가 및 삭제하는 대신
 *  flag를 만들어 현재 활성 화면치우게 해보자
 */



todoBtn.addEventListener("click", (event)=>{
    
    event.preventDefault();
    headText.innerText = getGreet(todoGreetArray) + ", " + name;
    headImg.src = `public/images/fairy/1.jpg`;
    
    divList.forEach((partScreen) => {
        partScreen.classList.add(HIDDEN_CLASSNAME);
    });
    todoDiv.classList.remove(HIDDEN_CLASSNAME);
    todoBtn.innerHTML = `<img src="public/images/nav/todoE.png" alt=""></img>`;
    calendarBtn.innerHTML = `<img src="public/images/nav/calendar.png" alt=""></img>`;
    utilityBtn.innerHTML = `<img src="public/images/nav/link.png" alt=""></img>`;
    pomodoroBtn.innerHTML = `<img src="public/images/nav/tomato.png" alt=""></img>`;

});


calendarBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    headText.innerText = getGreet(calendarGreetArray) + ", " + name;
    headImg.src = `public/images/fairy/2.jpg`;
    
    divList.forEach((partScreen) => {
        partScreen.classList.add(HIDDEN_CLASSNAME);
    });
    calendarDiv.classList.remove(HIDDEN_CLASSNAME);
    todoBtn.innerHTML = `<img src="public/images/nav/todo.png" alt=""></img>`;
    calendarBtn.innerHTML = `<img src="public/images/nav/calendarE.png" alt=""></img>`;
    utilityBtn.innerHTML = `<img src="public/images/nav/link.png" alt=""></img>`;
    pomodoroBtn.innerHTML = `<img src="public/images/nav/tomato.png" alt=""></img>`;

});


utilityBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    headText.innerText = getGreet(utilityGreetArray) + ", " + name;
    headImg.src = `public/images/fairy/3.jpg`;
    divList.forEach((partScreen) => {
        partScreen.classList.add(HIDDEN_CLASSNAME);
    });
    utilityDiv.classList.remove(HIDDEN_CLASSNAME);
    todoBtn.innerHTML = `<img src="public/images/nav/todo.png" alt=""></img>`;
    calendarBtn.innerHTML = `<img src="public/images/nav/calendar.png" alt=""></img>`;
    utilityBtn.innerHTML = `<img src="public/images/nav/linkE.png" alt=""></img>`;
    pomodoroBtn.innerHTML = `<img src="public/images/nav/tomato.png" alt=""></img>`;

});


pomodoroBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    headText.innerText = getGreet(pomodoroGreetArray) + ", " + name;
    headImg.src = `public/images/fairy/4.jpg`;
    divList.forEach((partScreen) => {
        partScreen.classList.add(HIDDEN_CLASSNAME);
    });
    pomodoroDiv.classList.remove(HIDDEN_CLASSNAME);
    todoBtn.innerHTML = `<img src="public/images/nav/todo.png" alt=""></img>`;
    calendarBtn.innerHTML = `<img src="public/images/nav/calendar.png" alt=""></img>`;
    utilityBtn.innerHTML = `<img src="public/images/nav/link.png" alt=""></img>`;
    pomodoroBtn.innerHTML = `<img src="public/images/nav/tomatoE.png" alt=""></img>`;

});