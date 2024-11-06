// 버튼 클릭 시 위치 출력, 소리 재생, 진동 기능
document.getElementById("playButton").addEventListener("click", function() {
    displayLocation();
    playSound();
    triggerVibration();
});

// 현재 위치를 표시하는 함수
function displayLocation() {
    // 위치 권한 요청
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location-display").innerText = "이 브라우저는 위치 정보를 지원하지 않습니다.";
    }
}

// 위치 정보를 화면에 표시하는 함수
function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    document.getElementById("location-display").innerText = "위도: " + latitude + ", 경도: " + longitude;
}

// 위치 정보 오류 처리 함수
function showError(error) {
    switch(error.code) {
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
    var sound = document.getElementById("sound");
    if (sound) {
        sound.play()
            .then(() => {
                console.log("소리가 재생되었습니다.");
            })
            .catch(error => {
                console.error("소리 재생 중 오류 발생:", error);
            });
    } else {
        console.error("오디오 요소를 찾을 수 없습니다.");
    }
}

// 진동 기능을 트리거하는 함수
function triggerVibration() {
    if (navigator.vibrate) {
        navigator.vibrate(10000); // 10초 동안 진동
    } else {
        console.log("이 기기는 진동 기능을 지원하지 않습니다.");
    }
}
