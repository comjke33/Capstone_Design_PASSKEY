// script.js

let watchID;
const speedThreshold = 0.5; // 0.5 m/s 이하의 속도는 0으로 간주
const speedHistoryLimit = 5; // 평균 계산에 사용할 최대 속도 값 개수
let speedHistory = []; // 최근 속도 값을 저장할 배열

// Player 클래스 정의
class Player {
    constructor(role) {
        this.role = role;
    }

    // 속도가 24m/s 이상일 때 경고
    checkSpeed(speed) {
        if (speed >= 24) {
            this.alertHighSpeed("속도가 너무 빠릅니다! 경고음과 진동 발생.");
        }
    }

    // 경고 발생 시 진동 및 경고음
    alertHighSpeed(message) {
        document.getElementById("speed").innerHTML = message;
        navigator.vibrate(2000); // 2초 진동

        // 경고음 재생
        const audio = new Audio('assets/audio/beep-07.wav');

        audio.play();
    }
}

// Player 인스턴스 생성 (임의 역할 설정)
const player = new Player("술레");

// 시작/중지 버튼 토글 기능
function toggleTracking() {
    if (watchID) {
        stopTracking();
    } else {
        startTracking();
    }
}

function startTracking() {
    if (navigator.geolocation) {
        watchID = navigator.geolocation.watchPosition(calculateSpeed, showError, {
            enableHighAccuracy: true,
            maximumAge: 3000, // 캐시된 위치 정보 허용 시간 (3초)
            timeout: 5000     // 최대 위치 업데이트 대기 시간 (5초)
        });
        document.getElementById("trackingButton").textContent = "측정 중지"; // 버튼 텍스트 변경
    } else {
        document.getElementById("speed").innerHTML = "이 브라우저에서는 위치 정보를 지원하지 않습니다.";
    }
}

function stopTracking() {
    if (watchID) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
        document.getElementById("trackingButton").textContent = "속도 측정 시작"; // 버튼 텍스트 변경
        document.getElementById("speed").innerHTML = "측정 중지됨";
        document.getElementById("currentSpeed").innerHTML = "현재 속도: 0 m/s";
        speedHistory = []; // 속도 기록 초기화
    }
}

function calculateSpeed(position) {
    let speed = position.coords.speed;

    if (speed !== null) {
        // 속도가 임계값 이하일 경우 0으로 설정
        if (speed < speedThreshold) {
            speed = 0;
        }

        // 속도 값 기록을 배열에 추가
        speedHistory.push(speed);

        // 최대 저장 개수 초과 시 가장 오래된 값 제거
        if (speedHistory.length > speedHistoryLimit) {
            speedHistory.shift();
        }

        // 최근 속도 값의 평균 계산
        const averageSpeed = speedHistory.reduce((acc, s) => acc + s, 0) / speedHistory.length;

        document.getElementById("currentSpeed").innerHTML = "현재 속도: " + averageSpeed.toFixed(2) + " m/s";

        // 속도 경고 조건 확인
        player.checkSpeed(averageSpeed);
    } else {
        document.getElementById("currentSpeed").innerHTML = "현재 속도: 측정 불가";
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("speed").innerHTML = "위치 정보 사용을 거부했습니다.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("speed").innerHTML = "위치 정보를 사용할 수 없습니다.";
            break;
        case error.TIMEOUT:
            document.getElementById("speed").innerHTML = "요청 시간이 초과되었습니다.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("speed").innerHTML = "알 수 없는 오류가 발생했습니다.";
            break;
    }
}
