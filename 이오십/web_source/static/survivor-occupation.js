/*생존자가 점령 지역에 들어오게되면 서버로부터 어떠한 데이터를 받고 survivor-playing에서 자동으로 리디렉션되게 해야함.*/

/* 서버로부터 데이터를 받는 코드*/

//서버로부터 데이터를 받았을 때에 survivor-mission.html로 리디렉션 시켜주는 코드

// const min = 1;        //최솟값
// const max = 10;       //최댓값
// const radomInt = Math.floor(Math.random() * (max - min +1)) + min;        //랜덤값
let redirectCount = 0; // 리디렉션 횟수 제한 (최대 2번)  
// 타이머 설정 함수
function startTimer() {
    let timeLeft = 60; // 카운트다운 시간 (초)

    const button = document.getElementById('timeButton');
    const timerText = document.getElementById('timerText');

        // 1초마다 실행될 함수
    const countdown = setInterval(() => {
        timeLeft--; // 시간 감소
        button.innerText = `${timeLeft}초 남음`; // 버튼에 남은 시간 표시
        timerText.innerText = timeLeft; // 텍스트에 남은 시간 표시

        // 시간이 끝나면 타이머 정지
        if (timeLeft <= 0) {
            clearInterval(countdown);
            button.innerText = "시간 종료"; // 시간 종료 시 버튼 텍스트 변경
            window.location.href = "/survivor"; // 리디렉션
        } else {
            checkAndRedirect();
        }
    }, 1000);
}


// 리디렉션 체크 함수
function checkAndRedirect() {
    const randomInt = Math.floor(Math.random() * 10) + 1; // 1부터 10 사이의 랜덤값 생성
    if (randomInt === 5 && redirectCount <= 2) { // 5가 나왔을 때, 최대 두 번만 리디렉션
                redirectCount++;
                window.location.href = "/mission"; // 리디렉션
    }
}

// 버튼 클릭 시 타이머 시작
document.getElementById('timeButton').addEventListener('click', startTimer);
