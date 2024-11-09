document.getElementById("playButton").addEventListener("click", function() 
{
    //startTracking();  //위치 추적 시작(속도 계산 포함)
    playSound();        // 소리 재생
    triggerVibration(); // 진동 시작(10초동안)
    // 버튼 텍스트를 "속도 측정 중"으로 변경
    this.innerText = "진동10초 작동과 소리 재생 중.";  // 또는 this.textContent = "";    
});

function playSound() {
    var sound = document.getElementById("sound");   // HTML 오디오 요소 (id가 'sound'인 요소)
    if (sound) {
        // 소리 재생을 시도하고 오류가 발생하면 에러 메시지를 콘솔에 출력
        sound.play().catch(error => {
            innerText.error("소리 재생 중 오류 발생:", error);
        });
    } else {
        // 'sound' id를 가진 오디오 요소가 없으면 오류 메시지를 출력
        innerText.error("오디오 요소를 찾을 수 없습니다.");
    }
}

// 진동 기능을 트리거하는 함수
function triggerVibration() {
    // 진동 기능 지원 여부 확인
    if (navigator.vibrate) {
        // 진동 기능을 지원하는 기기에서만 진동을 시작 (10초 동안)
        navigator.vibrate(10000); // 10초 동안 진동
    } else {
        // 진동을 지원하지 않는 기기에서는 콘솔에 메시지를 출력
        innerText.log("이 기기는 진동 기능을 지원하지 않습니다.");
    }
}

