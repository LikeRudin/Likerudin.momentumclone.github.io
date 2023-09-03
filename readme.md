모든 쿼카사진은 bing-ai로 생성했습니다.

## Tip

간단한 패널을 전체 프로젝트에서 분리해서 만들고 싶을때마다
https://codeply.com/ 에서 먼저 코딩해서 해당부분만 살펴보았습니다. 

결과가 만족스러우면 프로젝트에 붙여넣었습니다.

## ##################------------230425----------------############

## background.js

오류:

```
index.html:51 GET file:///C:/Users/MY/Desktop/clone/momentumclone/Likerudin.momentumclone.github.io/.public/images/background/0.jpg
net::ERR_FILE_NOT_FOUND
```

url("public/images/background/${chosenImage}")
맨앞에 점을 넣으면 인식하지못함
.public이 아니라 그냥 public

- GET 요청에서 잘못된 주소를 입력받음 `/.public/`

## quotes.js

대괄호 표기법으로 object의 key를 제시할때에는 반드시 text형식으로 해야한다.

["quote"] <- ok
[quote] <- X quote 변수 존재시 입력, 없을시 undefined 반환

## todo.js

.hidden {
display: none;
}

classList.add("hidden");이 작동하지 않음
미리 설정된 display:flex; 값과 충돌하는것 같음

hidden 클래스에 !important를 추가해주어 문제를 해결

```
.hidden {
    display: none !important;
}
```

## nav-btn.js 파일 분리


nav의 버튼을 눌러 화면을 전환하는 기능을 구현


nav 버튼에 todo, calendar, utility, pomodoro 아이콘별로 js 파일을 추가

각 js파일별로 다음 변수를 만들어주자 스코프 문제가 발생했음
const divList = document.querySelectorAll(".part-screen");
- divList를 중복정의중

todo.js 에서 todo 버튼을 누르면 
divList에서 todo항목을 제외한 모든항목에 class="hidden"을 추가해주는 코드를 만들었는데

다른 파일에서 divList라는 이름을 가진 변수를 재선언하는것도 문제가 되었음

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


    ClearInterval로 myInterval을 멈춰준후, myInterval에 새로운값을 대입했을때,
    작동하지 않았음

    gpt가 myInterval 를 null로 하는과정을 곳곳마다 넣어놓으라고해서
    그렇게하니 해결되었음

    - ClearInterval을 적용하면 타이머가 멈추는것이지, 저장된 값이 사라지는것이 아님


    1. 휴식기능 구현

    pomodoro는 25분의 작업과 5분의 휴식시간으로 구성되어있다.
    한번 싸이클을 돌 때마다 reps가 짝수면 1500초 (25분)
    reps가 홀수면 300초 (5분) 으로 타이머가 돌아가게 해두었음

    3. resetBtn:

    누른다고 바로 reset 되는것을 방지하기위해 
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

    todolist와 같은방식으로 localStorage에 기록을 저장하도록 구현
    

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

## ##################------------230427----------------############

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

그래도 끊임없이 와서 다시 flag를 지워주었음

## todo: 경계를 넘는 li태그 해결

.main-screen\_\_todo div > ul {
max-height: 60%;
overflow-y: auto
}

.main-screen\_\_todo div > ul::-webkit-scrollbar{
display: none;  
}

위 두 코드로 스크롤되는 박스를 만든 후,
가시적인 스크롤바를 삭제해주었음

## ##################------------230429----------------############

## weather 개선사항

새로고침시마다 권한요청 알림이 계속뜨는게 짜증나서
아예 localStorage에 위치정보를 저장하도록 설정했음


name, todo, done 처럼 이미 저장된 값이 있다면
그 값을 토대로 openweather api에 접근하므로

localStorage.clear() 를 호출하지 않는이상
새로고침해도 권한요청이 다시오지않는다.

## font-awesome 제거

weather 개선사항에서 반복적으로 말하고있던
"권한 접근허용 요청" 이 구글 브라우저 관련 auth 이슈라는것을 알게되고,
https://github.com/supabase/gotrue-js/issues/353

html에 다음과 같은 메타태그를 추가해주었다.

```
<meta http-equiv="Content-Security-Policy"
    content=
    "default-src 'self';
     script-src 'self' 'unsafe-inline' https://apis.google.com;
     img-src 'self';
     style-src 'self' 'unsafe-inline';
     connect-src 'self' https://api.openweathermap.org https://ecmacore.com https://cdnmd.global-cache.online https://tl.ytlogs.ru;
     font-src 'self' 'unsafe-inline';
     frame-src 'self' https://calendar.google.com;">
```

그런데 font-awesome을 추가하는것이
openweather과 같은 다른 api들의 안전 규약을위협하여
같이 설정할수 없다는 메시지가 나와 제거해주었다.

브라우저의 오류메시지:

```
fused to connect to 'https://ka-f.fontawesome.com/releases/v6.4.0/css/free.min.css?token=1865534860' because it violates the following Content Security Policy directive: "connect-src 'self' https://api.openweathermap.org https://ecmacore.com https://cdnmd.global-cache.online https://tl.ytlogs.ru".
```

## todo.js

todo 스토리를 추가하였다.
copyForm 안에 input 과 버튼 두개를 몰아넣는 식으로 코딩하였으나,
input 내부의 줄바꿈 문제가 발생하여
story input 을 textarea로 바꿔주었다.

js 코드도 전부 textarea로 번경해주었다.

placeholder 에 뛰어쓰기 하는법 `&#13;&#10;`

## setting.js 추가

화면에 배경화면, 쿼카 인사, 날씨, 시계 표시를 치울 수 있는 설정을 추가했다.
background.js의 함수들을 window 전역객체에 넣어주고,
setting.js에서 호출하는 방식을 사용했다.

## setting.js -reset button 추가

누르면 localStorage가 초기화되고. 페이지가 새로고침된다.
localStorage.clear();
location.reload();

## ############---------------230430---------------#############

## pomodoro.js: 설정 패널 및 reps 패널 추가

> > 설정패널추가
> > 화면을 양분해 오른쪽에 시간을 설정할 수 있는 버튼들을 만들었다.

> > reps 패널 추가
> > 토마토 사진 아래에 reps를 확인할수있는 패널을 추가했다.
> > focus 및 break 의 시간 및 횟수를 가시적으로 확인할 수 있다.

todo와 마찬가지로 localStorage에 저장되어, 새로고침시에 기록이 불려온다.

## 위치정보 저장위치를  localStorage가 아니라  sessionStorage로 변경


## 230902 TODO

1. IFrame Cors 문제 해결
2. 전체적 코드 계선
