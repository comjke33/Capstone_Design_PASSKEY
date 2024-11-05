function displayLocation() {
    // 진동 및 소리 재생
    playSound();
    vibrate();

    // Geolocation API로 현재 위치 가져오기
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location-display").innerText = "Geolocation을 지원하지 않는 브라우저입니다.";
    }
}

function showPosition(position) {
    // 위치 정보 출력
    const locationDisplay = document.getElementById("location-display");
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    locationDisplay.innerText = `위도: ${latitude}, 경도: ${longitude}`;
}

function showError(error) {
    const locationDisplay = document.getElementById("location-display");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            locationDisplay.innerText = "위치 정보 접근이 거부되었습니다.";
            break;
        case error.POSITION_UNAVAILABLE:
            locationDisplay.innerText = "위치 정보를 사용할 수 없습니다.";
            break;
        case error.TIMEOUT:
            locationDisplay.innerText = "위치 정보 요청 시간이 초과되었습니다.";
            break;
        case error.UNKNOWN_ERROR:
            locationDisplay.innerText = "알 수 없는 오류가 발생했습니다.";
            break;
    }
}

function playSound() {
    // 오디오 요소 선택 및 재생
    const audio = document.getElementById("sound");
    audio.play();
}

function vibrate() {
    // 진동 200ms
    if (navigator.vibrate) {
        navigator.vibrate(200);
    } else {
        console.log("이 장치는 진동을 지원하지 않습니다.");
    }
}
