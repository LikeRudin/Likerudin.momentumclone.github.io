모든 쿼카사진은 bing-ai로 생성했습니다.

## background.js

url(".public/images/background/0.jpg")
index.html:51 GET file:///C:/Users/MY/Desktop/clone/momentumclone/Likerudin.momentumclone.github.io/.public/images/background/0.jpg
net::ERR_FILE_NOT_FOUND
url("public/images/background/${chosenImage}")
맨앞에 점 넣으면 인식못함.

## quotes.js

대괄호 표기법으로 object의 key를 제시할때에는 반드시 text형식으로 해야한다.
["quote"] <- ok
[quote] <- X 변수가대입된다.

## todo.js

.hidden {
display: none;
}

classList.add("hidden");이 작동하지 않는다.

아마도 미리 설정된 display:flex; 값에 혼동을 주는것 같았다.

## nav-btn.js 파일 분리

nav 버튼에
todo, calendar, utility, pomodoro 아이콘별로
js 파일을 추가했다.

nav의 버튼을 누를경우 화면 배치가 바뀌는것을
각각의 js에 구현해주자

"스코프 문제가 발생했다."

const divList = document.querySelectorAll(".part-screen");

divList를 중복정의해줄 수 없다.

todo.js 에서 todo 버튼을 누르면 화면 목록인
divList에서

todo항목을 제외한 모든항목에 class="hidden"을 추가해주는 코드를 만들었는데

비슷한 코드를 반복해서 4개의 파일에 훑어놓는것도 문제이고
또 결정적으로
다른 파일에서 divList라는 이름을 가진 변수를 재선언하는것이불가능했다.

## pomodoro 구현

    0. timer 구현:

    let pomodorotime = 0;
    let myInterval = null;

    const countFunction = function() {

        // pomodoroTime에대한 시간을 게산하여
        //분과 초를 화면에 띄어준다

    if(pomodoroTime < 0) {
        clearInterval(myInterval);
        myInterval = null;
        }
    }

    const startPomodoro = function() {
    pomodorotime = 1500;
    myInterval = setInterval("countFunction", 1000)
    }


    startBtn.addEventListener("click", startPomodoro)

    myInterval을 null로 해주는 이유는
    clearInterval로 myInterval을 멈춰준후,
    myInterval에 새로운값을 대입하면, 작동하지 않았다.
    어째서인지 모르겠다.

    gpt가 myInterval 를 null로 하는과정을 곳곳마다 넣어놓으라고해서
    그렇게했다.



    1. 휴식기능 구현

    pomodoro는 25분의 작업과 5분의 휴식시간으로 구성되어있다.
    한번 싸이클을 돌 때마다 reps가 짝수면 1500초 (25분)
    reps가 홀수면 300초 (5분) 으로 타이머가 돌아가게 해두었다.


    3. resetBtn:

    누른다고 바로 reset 되는것을 방지하자.
    -alert함수와 비슷하지만 yes or no 선택지가 주어지는
    알림창을 호출한다.

    yes를 선택할시 true, no 를 선택할시 false를 반환한다.
    다음과 같이 사용할 수 있다.

    resetBtn.addEventListener("click") = > ({
    const choice = confirm("select yes or no")
    if (chioce) {}
    else {}
    })

    4. reps 기록보기 구현

    이건하자.

## utility 구현

검색창을 구현했다

1. form.action = 연결되는 웹페이지 주소

const setSearchEngine = function () {
const selectedEngine = searchEngine.value;
searchForm.action = `https://www.${selectedEngine}.com/search`;
}

2. select.addEventListener("change", setSearchEngine)

3. input 의 name="q"
   google과 bing 모두 검색엔진의 query parameter를 q로 하고있기 때문에 이렇게
   설정해주어야한다.

<a href="https://www.flaticon.com/free-icons/algorithm" title="algorithm icons">Algorithm icons created by Becris - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/pomodoro" title="pomodoro icons">Pomodoro icons created by Flat Icons - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/letter-t" title="letter t icons">Letter t icons created by Md Tanvirul Haque - Flaticon</a>

## nav-btn

basic-screen 을 만들었다.
nav-btn.js에서

querySelector의 점 하나를 생략하자 전체파일의 작동이 멈추었다.

## weather.js

브라우저에 위치정보 접근허용 알림이끊임없이와서
단 한번만 알림을 받기위해 flag를 추가했다.

let requestedAlready = false;

window.addEventListener("load",()=>{
if (!requestedAlready) {
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
requestedAlready = true;
}});

그래도 끊임없이 오는데 어떡하지..
다시 flag를 지워주었다.

## todo: 경계를 넘는 li태그 해결

.main-screen\_\_todo div > ul {
max-height: 60%;
overflow-y: auto
}

.main-screen\_\_todo div > ul::-webkit-scrollbar{
display: none;  
}

위 두 코드로 스크롤되는 박스를 만든 후,
가시적인 스크롤바를 삭제해주었다.
