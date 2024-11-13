let countdown = 10;
const timeElement = document.getElementById("time");

// 카운트다운 타이머
const timer = setInterval(() => {
    if (countdown >= 1) {
        timeElement.textContent = `${countdown}초 뒤에 게임을 시작합니다.`;
        countdown--;
    } else {
        timeElement.textContent = "게임을 시작합니다.";
        clearInterval(timer);
        setTimeout(() => {
            window.location.href = targetPage; // 카운트다운 후 target_page로 리디렉션
        }, 1000);
    }
}, 1000); // 1초마다 카운트다운
