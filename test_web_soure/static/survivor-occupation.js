/* 생존자가 점령 지역에 들어오게되면 서버로부터 어떠한 데이터를 받고 survivor-playing에서 자동으로 리디렉션되게 해야함. */

/* 서버로부터 데이터를 받는 코드 */

//서버로부터 데이터를 받았을 때에 survivor-mission.html로 리디렉션 시켜주는 코드

// // let redirectCount = 0; // 리디렉션 횟수 제한 (최대 2번)
// let redirectCount = sessionStorage.getItem('redirectCount') ? parseInt(localStorage.getItem('redirectCount')) : 0;
// let timeLeft = sessionStorage.getItem('timeLeft') ? parseInt(localStorage.getItem('timeLeft')) : 60;

// 리디렉션 횟수와 타이머 남은 시간
let redirectCount = sessionStorage.getItem('redirectCount') ? parseInt(sessionStorage.getItem('redirectCount')) : 0;
let timeLeft = sessionStorage.getItem('timeLeft') ? parseInt(sessionStorage.getItem('timeLeft')) : 60;

// 타이머 설정 함수
function startTimer() {
    // let timeLeft = 60; // 카운트다운 시간 (초)

    const button = document.getElementById('timeButton');
    const timerText = document.getElementById('timerText');

        // 1초마다 실행될 함수
    const countdown = setInterval(() => {
        timeLeft--; // 시간 감소
        localStorage.setItem('timeLeft', timeLeft); //시간 남은 값 저장.
        button.innerText = `${timeLeft}초 남음`; // 버튼에 남은 시간 표시
        timerText.innerText = timeLeft; // 텍스트에 남은 시간 표시

        // 시간이 끝나면 타이머 정지
        if (timeLeft <= 0) {
            clearInterval(countdown);
            button.innerText = "시간 종료"; // 시간 종료 시 버튼 텍스트 변경
            localStorage.removeItem('timeLeft'); //타이머 종료 시에 값 제거
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
                localStorage.setItem('redirectCount', redirectCount);   //리디렉션 횟수 저장
                window.location.href = "/mission"; // 리디렉션
    }
}

// 페이지 로드 시 플래그 확인 및 초기화
window.addEventListener('load', () => {
    // 리다이렉션 후 돌아왔는지 확인
    if (localStorage.getItem('redirected') === 'true') {
        localStorage.removeItem('redirected'); // 플래그 제거
        // 필요한 경우 추가 초기화 작업 수행
    }
    if (timeLeft > 0) {
        startTimer();
    }
});

// 버튼 클릭 시 타이머 시작
document.getElementById('timeButton').addEventListener('click', startTimer);

