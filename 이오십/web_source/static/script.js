// playButton 버튼을 눌렀을 때, 위치 추적 시작하고 소리와 진동 울림.
document.getElementById("playButton").addEventListener("click", function() {
    displayLocation();  // 현재 위치를 표시
    playSound();        // 소리 재생
    triggerVibration(); // 진동 시작
});

// 현재 위치를 표시하는 함수
function displayLocation() {
    // 위치 권한 요청
    if (navigator.geolocation) {
        // 위치 정보를 요청하고 성공하면 showPosition 함수 호출, 오류 시 showError 함수 호출
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        // 위치 권한이 없으면 위치 정보 지원 불가 메시지를 표시
        document.getElementById("location-display").innerText = "이 브라우저는 위치 정보를 지원하지 않습니다.";
    }
}

// 위치 정보를 화면에 표시하는 함수
function showPosition(position) {
    // 위치 좌표 정보 (위도와 경도) 가져오기
    var latitude = position.coords.latitude;        // 위도 정보
    var longitude = position.coords.longitude;      // 경도 정보
    // 위치 정보를 화면의 location-display 요소에 텍스트로 표시
    document.getElementById("location-display").innerText = "위도: " + latitude + ", 경도: " + longitude;
}

// 위치 정보 오류 처리 함수
function showError(error) {
    switch(error.code) {
        // 오류 코드에 따라 다른 메시지를 표시
        case error.PERMISSION_DENIED:
            document.getElementById("location-display").innerText = "사용자가 위치 정보 제공을 거부했습니다.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location-display").innerText = "위치 정보를 사용할 수 없습니다.";
            break;
        case error.TIMEOUT:
            document.getElementById("location-display").innerText = "위치 정보를 가져오는 데 시간이 초과되었습니다.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location-display").innerText = "알 수 없는 오류가 발생했습니다.";
            break;
    }
}

// 소리를 재생하는 함수
function playSound() {
    var sound = document.getElementById("sound");   //html 테그에서 오디오 id를 가져오기
    if (sound) {
        // 소리를 재생하고 성공하면 콘솔에 메시지 출력
        sound.play()
            .then(() => {
                console.log("소리가 재생되었습니다.");
            })
            // 오류 발생 시 콘솔에 에러 메시지 출력
            .catch(error => {
                console.error("소리 재생 중 오류 발생:", error);
            });
    } else {
        // 오디오 요소가 없으면 콘솔에 오류 메시지 출력
        console.error("오디오 요소를 찾을 수 없습니다.");
    }
}

// 진동 기능을 트리거하는 함수
function triggerVibration() {
    // 진동 기능 지원 여부 확인
    if (navigator.vibrate) {
        navigator.vibrate(10000); // 10초 동안 진동
    } else {
        // 진동 기능이 없으면 콘솔에 지원 불가 메시지 출력
        console.log("이 기기는 진동 기능을 지원하지 않습니다.");
    }
}
