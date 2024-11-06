// // 이전 위치 저장용 변수
// let previousPosition = null;

// // 속도 측정 주기 (2초)
// const CHECK_INTERVAL = 2000;

// // 속도 측정 함수
// function startMeasurement() {
//     const speedDisplay = document.getElementById("speed-display");
//     const positionDisplay = document.getElementById("position-display");
//     const audio = document.getElementById("sound");

//     // 위치가 변할 때마다 위치와 속도를 측정
//     navigator.geolocation.watchPosition(
//         (position) => {
//             const { latitude, longitude } = position.coords;
//             const currentPosition = { latitude, longitude };

//             // 위치 정보 업데이트
//             positionDisplay.innerText = `위치: 위도 ${latitude}, 경도 ${longitude}`;

//             // 이전 위치가 있다면 속도 계산
//             if (previousPosition) {
//                 const distance = calculateDistance(previousPosition, currentPosition);
//                 const speed = (distance / (CHECK_INTERVAL / 1000)).toFixed(2);

//                 // 5미터 이상 이동 시 속도 업데이트
//                 if (distance >= 5) {
//                     speedDisplay.innerText = `속도: ${speed} m/s`;

//                     // 소리와 진동 출력
//                     audio.play();
//                     navigator.vibrate(200);
//                 }
//             }

//             // 현재 위치를 이전 위치로 업데이트
//             previousPosition = currentPosition;
//         },
//         (error) => {
//             console.error("위치 접근 오류:", error);
//             alert("위치 접근 권한을 허용해 주세요.");
//         },
//         { enableHighAccuracy: true, maximumAge: CHECK_INTERVAL, timeout: 5000 }
//     );
// }

// // 두 위치 간 거리 계산 함수 (단위: 미터)
// function calculateDistance(pos1, pos2) {
//     const R = 6371e3; // 지구 반지름 (단위: 미터)
//     const lat1 = (pos1.latitude * Math.PI) / 180;
//     const lat2 = (pos2.latitude * Math.PI) / 180;
//     const deltaLat = ((pos2.latitude - pos1.latitude) * Math.PI) / 180;
//     const deltaLon = ((pos2.longitude - pos1.longitude) * Math.PI) / 180;

//     const a =
//         Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
//         Math.cos(lat1) * Math.cos(lat2) *
//         Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c;
// }

function displayLocation() {
    // 위치 권한 요청
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location-display").innerText = "이 브라우저는 위치 정보를 지원하지 않습니다.";
    }

    // 진동 기능 (1초 진동)
    if (navigator.vibrate) {
        navigator.vibrate(1000);
    }

    // 소리 출력
    var sound = document.getElementById("sound");
    sound.play();
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    document.getElementById("location-display").innerText = "위도: " + latitude + ", 경도: " + longitude;
}

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


