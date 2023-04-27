const pomodoroState = document.querySelector(".main-screen__pomodoro__state");
const pomodoroTimer = document.querySelector(".main-screen__pomodoro__timer");
const startBtn = document.querySelector(".pomodoro__start");
const resetBtn = document.querySelector(".pomodoro__reset");

pomodoroTimer.innerText = "00 : 00"
pomodoroState.innerText = "Pomodoro"

const POMODOROSECOND = 1500;
const RESTSECOND = 300;
let pomodoroTime = 5;
let reps = 0;

const timer = document.querySelector(".main-screen__pomodoro__timer");

/**start 버튼 무력화 */
let countInterval = null;


const countWork = function () {
    const minute = parseInt(pomodoroTime / 60);
    const second = pomodoroTime - minute * 60;
    const minuteText = minute.toString().padStart(2,"0");
    const secondText = second.toString().padStart(2,"0");
    
    pomodoroTimer.innerText= `${minuteText} : ${secondText}`;
    pomodoroTime -= 1;
    if (pomodoroTime < 0) {
        clearInterval(countInterval);
        countInterval = null;
        if (reps % 2 == 0){
            pomodoroState.innerText = "Focus"
            pomodoroState.classList.remove("rest");
        } else {    
            pomodoroState.innerText = "Rest"
            pomodoroState.classList.remove("focus");
        
        }


    }
}

const startPomodoro = function() {
    if (countInterval === null){
        if (reps % 2 == 0 ){
            pomodoroState.classList.add("focus");
            pomodoroState.innerText = "Focus"
            pomodoroTime = POMODOROSECOND;
        }
        else {
            pomodoroState.classList.add("rest");
            pomodoroState.innerText = "Rest"
            pomodoroTime = RESTSECOND;
        }
        reps += 1;
        countInterval = setInterval(countWork, 1000);
    }
    }


const alertReset = function () {
    const choie = confirm(`Are you want to reset
    pomodoro logs? `)
    if (choie) {
        reps = 0;
        clearInterval(countInterval);
        pomodoroTimer.innerText = "00 : 00";
        pomodoroState.innerText = "Pomodoro";
        pomodoroState.classList.remove("focus");
        pomodoroState.classList.remove("rest");

        countInterval = null;
    }
 }

startBtn.addEventListener("click", startPomodoro);
resetBtn.addEventListener("click", alertReset);
