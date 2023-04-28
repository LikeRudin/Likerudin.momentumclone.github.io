

const todoForm = document.getElementById("todoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todoList");
const todoCopyBtn = document.getElementById("todoBtn");

const doneList = document.getElementById("doneList");
const doneCopyBtn = document.getElementById("doneBtn");


let todoStorage = {};
let doneStorage = {};

const TODOS_KEY = "todos";
const DONES_KEY = "dones";

/*TOdo를 LocalStorage에 저장합니다.*/
const saveTodo = function() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todoStorage));
};

const saveDone = function() {
    localStorage.setItem(DONES_KEY, JSON.stringify(doneStorage));
}

/**
 * 화면에 DONE을 추가합니다.
 * @param {*} newDone  
 * @param {*} doneKey 
 */
const paintDone = function(newDone, doneKey){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    li.id = doneKey
    span.innerText = `[✔] ${newDone} 😊`;
    deleteBtn.innerText = "X";

    deleteBtn.addEventListener("click", deleteDone);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    doneList.appendChild(li);
    
}


/**
 * X버튼을 통해 
 * todo를 삭제합니다.
 * @param {*} event 
 */
const deleteTodo = function(event) {
    const target = event.target.parentElement;
    const targetId = target.id;
    target.remove();
    delete todoStorage[targetId];
    saveTodo();
}
/**
 * ✔ 버튼을 통해 
 * todo를 DOne으로바꿔줍니다.
 * @param {*} event 
 */
const completeTodo = function (event) {
    const target = event.target.parentElement;
    const targetId = target.id;
    const newDone = target.querySelector("span").innerText;
    
    target.remove();
    delete todoStorage[targetId];
    saveTodo();
    
    doneStorage[targetId] = newDone;
    saveDone();
    paintDone(newDone, targetId);

}

const deleteDone = function(event) {
    const target = event.target.parentElement;
    const targetId = target.id;
    target.remove();
    delete doneStorage[targetId];
    saveDone();
}



/**
 * 화면에 TODO를 추가합니다.
 * @param {*} newTodo : input 입력받은값 
 * @param {*} todoKey : Date().getTime()으로 생성한 키
 */
const paintTodo = function(newTodo, todoKey) {

    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const completeBtn = document.createElement("button");
    
    li.id = todoKey;
    span.innerText = `${newTodo} `;
    deleteBtn.innerText = "X";
    completeBtn.innerText = "✔";


    deleteBtn.addEventListener("click", deleteTodo);
    completeBtn.addEventListener("click", completeTodo);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(completeBtn);
    todoList.appendChild(li);
};




/**
 * local Storage에 저장된 
 * todo를 불러옵니다.
 */

const loadTodo = function() {
    todoStorage = {};
    const todoData = localStorage.getItem(TODOS_KEY);
    const loadedObj = JSON.parse(todoData);
    if (loadedObj !== null) {
        const keyArray = Object.keys(loadedObj);
        keyArray.forEach((key) => {
            const todo = loadedObj[key];
            todoStorage[key] = todo;
            paintTodo(todo, key);
        });
    }

}

const loadDone = function() {
    doneStorage = {};
    const doneData = localStorage.getItem(DONES_KEY);
    const loadedObj = JSON.parse(doneData);
    if (loadedObj !==null) {
        const keyArray = Object.keys(loadedObj);
        keyArray.forEach((key) => {
            const done = loadedObj[key];
            doneStorage[key] = done;
            paintDone(done, key);
        });
    }
}

const handleTodoSubmit = function (event){
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    const todoKey = new Date().getTime().toString();
    todoStorage[todoKey] = newTodo;

    paintTodo(newTodo, todoKey);
    saveTodo();
}

loadTodo();
loadDone();

todoForm.addEventListener("submit", handleTodoSubmit);

/**
 * 말머리(오늘날짜 + End!) 및 
 * DONEs 를 복사합니다.
 */
doneCopyBtn.addEventListener("click", () =>{
    const doneSpanArray = doneList.querySelectorAll("li > span");
    const date = new Date()
    const todayEnd = `${date.getFullYear()}/${date.getMonth() +1}/${date.getDate()} End!`; 
    const doneTextArray = [];
    doneTextArray.push(todayEnd); 
    doneSpanArray.forEach((span) => {
        doneTextArray.push(span.innerText); 
    });

    const textToCopy = doneTextArray.join(`\n`); // 한줄씩 띄어써진 문자열로 변환

    navigator.clipboard.writeText(textToCopy).then(() =>{ 
        doneCopyBtn.innerText = `Copied!`; // 복사후 copy 버튼 글씨번경 
        setTimeout(()=>{
            doneCopyBtn.innerText = `Copy`;
        }, 1500)
    }).catch((err) => {
        doneCopyBtn.innerText = `failed.`;
        console.error(`failed to copy text ${err}`);
    });

});


todoCopyBtn.addEventListener("click", () =>{
    const todoSpanArray = todoList.querySelectorAll("li > span");
    const date = new Date()
    const todayStart = `${date.getFullYear()}/${date.getMonth() +1}/${date.getDate()} start!`; 
    const todoTextArray = [];
    todoTextArray.push(todayStart); //오늘 날짜 + start
    todoSpanArray.forEach((span) => {
        todoTextArray.push(`[]` + span.innerText ); 
    });

    const textToCopy = todoTextArray.join(`\n`); //todo 리스트를 한줄씩 입력한 스트링

    navigator.clipboard.writeText(textToCopy).then(() =>{
        todoCopyBtn.innerText = `Copied!`;
        setTimeout(()=>{
            todoCopyBtn.innerText = `Copy`;
        }, 1500)
    }).catch((err) => {
        todoCopyBtn.innerText = `failed.`;
        console.error(`failed to copy text ${err}`);
    });

});