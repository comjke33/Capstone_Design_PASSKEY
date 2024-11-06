// 이전 위치 저장용 변수
let previousPosition = null;

// 속도 측정 주기 (2초)
const CHECK_INTERVAL = 2000;

// 속도 측정 함수
function startMeasurement() {
    const speedDisplay = document.getElementById("speed-display");
    const positionDisplay = document.getElementById("position-display");
    const audio = document.getElementById("sound");

    // 위치가 변할 때마다 위치와 속도를 측정
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const currentPosition = { latitude, longitude };

            // 위치 정보 업데이트
            positionDisplay.innerText = `위치: 위도 ${latitude}, 경도 ${longitude}`;

            // 이전 위치가 있다면 속도 계산
            if (previousPosition) {
                const distance = calculateDistance(previousPosition, currentPosition);
                const speed = (distance / (CHECK_INTERVAL / 1000)).toFixed(2);

                // 5미터 이상 이동 시 속도 업데이트
                if (distance >= 5) {
                    speedDisplay.innerText = `속도: ${speed} m/s`;

                    // 소리와 진동 출력
                    audio.play();
                    navigator.vibrate(200);
                }
            }

            // 현재 위치를 이전 위치로 업데이트
            previousPosition = currentPosition;
        },
        (error) => {
            console.error("위치 접근 오류:", error);
            alert("위치 접근 권한을 허용해 주세요.");
        },
        { enableHighAccuracy: true, maximumAge: CHECK_INTERVAL, timeout: 5000 }
    );
}

// 두 위치 간 거리 계산 함수 (단위: 미터)
function calculateDistance(pos1, pos2) {
    const R = 6371e3; // 지구 반지름 (단위: 미터)
    const lat1 = (pos1.latitude * Math.PI) / 180;
    const lat2 = (pos2.latitude * Math.PI) / 180;
    const deltaLat = ((pos2.latitude - pos1.latitude) * Math.PI) / 180;
    const deltaLon = ((pos2.longitude - pos1.longitude) * Math.PI) / 180;

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}


