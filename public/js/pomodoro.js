const pomodoroState = document.querySelector(".main-screen__pomodoro__state");
const pomodoroTimer = document.querySelector(".main-screen__pomodoro__timer");
const startBtn = document.querySelector(".pomodoro__start");
const resetBtn = document.querySelector(".pomodoro__reset");


const focusUl = document.querySelector(".ul__focus");
const breakUl = document.querySelector(".ul__break");

/**
 * paint reps on screen
 * add li to ul
 * @param {*} UL focusUL 또는 breakUL
 * @param {*} MINUTE POMODOROTIME reps
 */
const paintReps = function(UL, MINUTE){
    const li = document.createElement("li");
    li.innerText = MINUTE;
    UL.appendChild(li);
}

/**save reps number to localStorage */
const saveRepsNum = function() {
    localStorage.setItem("repsNum", reps.toString());
}

const saveFocusReps = function(){
    const focusLis = focusUl.querySelectorAll("li");
    const focusArray = [];
    focusLis.forEach((li) => {
        focusArray.push(li.innerText);
    });
    localStorage.setItem("focusReps", JSON.stringify(focusArray));
}

const saveBreakReps = function () {
    const breakLis = breakUl.querySelectorAll("li");
    const breakArray = [];
    breakLis.forEach((li) => {
        breakArray.push(li.innerText);
    });
    localStorage.setItem("breakReps", JSON.stringify(breakArray));
}

/**
 * load reps logs from localStorage
 */
const loadRepsLog = function() {
    
    const focusArrayString = localStorage.getItem("focusReps");
    const focusArray = JSON.parse(focusArrayString);
    
    if (focusArray !== null) {
        
        focusUl.innerHTML = "";
        
        focusArray.forEach((log)=> {
        paintReps(focusUl, log);
        });
    }

    const breakArrayString= localStorage.getItem("breakReps");
    const breakArray = JSON.parse(breakArrayString);
    
    if (breakArray !== null) {
        
        breakUl.innerHTML = "";

        breakArray.forEach((log) => {
        paintReps(breakUl, log);
        });
    }
}
/* load reps from localStorage */
const loadRepsNum = function () {
    const loadedReps = localStorage.getItem("repsNum");
    if (loadedReps !== null) {
        reps = parseInt(loadedReps);
    }
}

pomodoroTimer.innerText = "00 : 00"
pomodoroState.innerText = "Pomodoro"

let POMODOROSECOND = 1500;
let BREAKSECOND = 300;
let pomodoroTime = 5;
let reps = 0;

const timer = document.querySelector(".main-screen__pomodoro__timer");

//start 버튼 무력화
let countInterval = null;


/**draw timer.*/
const countWork = function () {
    const minute = parseInt(pomodoroTime / 60);
    const second = pomodoroTime - minute * 60;
    const minuteText = minute.toString().padStart(2,"0");
    const secondText = second.toString().padStart(2,"0");
    
    pomodoroTimer.innerText= `${minuteText} : ${secondText}`;
    pomodoroTime -= 1;

    if (pomodoroTime < 0) { // 타이머 종료
        clearInterval(countInterval);
        countInterval = null;
        saveFocusReps();
        saveBreakReps();
        if (reps % 2 == 0){ // 휴식종료

            pomodoroState.innerText = "Focus";
            pomodoroState.classList.remove("break");
            
        } else { //집중 종료

            pomodoroState.innerText = "Break";
            pomodoroState.classList.remove("focus");
        
        }


    }
}


/** start pomodoro Timer */
const startPomodoro = function() {
    if (countInterval === null){
        if (reps % 2 == 0 ){
            pomodoroState.classList.add("focus");
            pomodoroState.innerText = "Focus"
            pomodoroTime = POMODOROSECOND;

            const repTime = pomodoroTime / 60;
            paintReps(focusUl, repTime);
            // //Test
            // pomodoroTime = 2;
        }
        else {
            pomodoroState.classList.add("break");
            pomodoroState.innerText = "Break"
            pomodoroTime = BREAKSECOND;
            
            const repTime = pomodoroTime / 60;
            paintReps(breakUl, repTime);
            // //Test
            // pomodoroTime = 2;


        }
        reps += 1;
        countInterval = setInterval(countWork, 1000);
        saveRepsNum();
    }
    }


/** reset pomodoro logs and reps */
const alertReset = function () {
    const choice = confirm(`Do you want to reset pomodoro logs? `)
    if (choice) {
        clearInterval(countInterval);
        countInterval = null;

        pomodoroTimer.innerText = "00 : 00";
        pomodoroState.innerText = "Pomodoro";

        pomodoroState.classList.remove("focus");
        pomodoroState.classList.remove("rest");
       
        reps = 0;
        saveRepsNum();
        
        focusUl.innerHTML="<li>F</li>";
        saveFocusReps();
        
        breakUl.innerHTML="<li>B</li>";
        saveBreakReps();
    }
 }

startBtn.addEventListener("click", startPomodoro);
resetBtn.addEventListener("click", alertReset);

// detail control pannel

const focusSetBtns = document.querySelectorAll(".focus__btn > *");
const focusIncrementBtn = focusSetBtns[2];
const focusTimeInput = focusSetBtns[1];
const focusDecrementBtn = focusSetBtns[0];

const breakSetBtns = document.querySelectorAll(".break__btn > *");
const breakIncrementBtn = breakSetBtns[2];
const breakTimeInput = breakSetBtns[1];
const breakDecrementBtn = breakSetBtns[0];

focusTimeInput.addEventListener("input", ()=> {
    const minutes = parseInt(focusTimeInput.value);
    if (14 < minutes && minutes < 51){
        POMODOROSECOND = minutes * 60;
    } else {
        focusTimeInput.value = 25;
        POMODOROSECOND = 1500;
    }
});

focusIncrementBtn.addEventListener("click", ()=>{
    const minutes = parseInt(focusTimeInput.value);
    if (minutes< 46) {
    const newValue = minutes + 5 ;
    focusTimeInput.value = newValue;
    POMODOROSECOND = newValue * 60;
    } 
});

focusDecrementBtn.addEventListener("click", ()=>{
    const minutes = parseInt(focusTimeInput.value);
    if (minutes > 19) {
    const newValue = minutes - 5 ;
    focusTimeInput.value = newValue;
    POMODOROSECOND = newValue * 60;
    } 
});


breakTimeInput.addEventListener("input", ()=> {
    const minutes = parseInt(breakTimeInput.value);
    if (0 < minutes < 26){
        BREAKSECOND = minutes * 60;
    } else {
        breakTimeInput.value = 5;
        BREAKSECOND = 300;
    }
});

breakIncrementBtn.addEventListener("click", ()=>{
    const minutes = parseInt(breakTimeInput.value);
    if (minutes < 24){
    const newValue = minutes + 2 ;
    breakTimeInput.value = newValue; 
    BREAKSECOND = newValue * 60;
    }
});

breakDecrementBtn.addEventListener("click", ()=>{
    const minutes = parseInt(breakTimeInput.value);
    if (minutes > 2){
    const newValue = minutes - 2;
    breakTimeInput.value = newValue;
    BREAKSECOND = newValue * 60;
    }
});

loadRepsNum();
loadRepsLog();