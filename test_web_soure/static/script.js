// // playButton 버튼을 눌렀을 때, 위치 추적 시작하고 소리와 진동 울림.
// document.getElementById("playButton").addEventListener("click", function() {
//     startTracking();  //위치 추적 시작(속도 계산 포함)
//     // playSound();        // 소리 재생
//     // triggerVibration(); // 진동 시작(10초동안)
//     // 버튼 텍스트를 "속도 측정 중"으로 변경
//     this.innerText = "속도 측정 중";  // 또는 this.textContent = "속도 측정 중";    
// });

// let lastPosition = null;    //마지막 위치와 시간을 저장할 변수(위도, 경도)
// let lastTime = null;        // 이전 시간 (속도 계산을 위한 시간 차이 계산)
// // let watchID = null;         //watchPosition ID를 저장하여 추적을 중지할 수 있도록 함.
// let trackingInterval = null;  // 주기적인 위치 측정을 위한 변수

// // 위치 추적 및 속도 계산을 시작하는 함수
// function startTracking() {
//     if (navigator.geolocation) {
//         // 위치 정보가 업데이트될 때마다 updatePosition 함수 호출
//         // getCurrentPosition은 한 번만 위치를 가져오는 반면, watchPosition은 계속해서 위치를 추적
//         // watchID = navigator.geolocation.watchPosition(
//         //     updatePosition, 
//         //     showError,
//         // {
//         //     enableHighAccuracy: false,    // 높은 정확도로 위치 업데이트 요청
//         //     timeout: 10000,              // 각 위치 요청의 타임아웃 설정 (10초)
//         //     maximumAge: 30000                // 마지막 위치 정보를 캐시하지 않음            
//         // }
//         // );
//             // 주기적으로 위치를 측정하는 설정 (5초마다 위치 업데이트)
//     trackingInterval = setInterval(updatePosition, 5000);  // 5000ms = 5초마다 updatePosition 함수 호출
//     } else {
//         document.getElementById("location-display").innerText = "이 브라우저는 위치정보를 나타내지 않습니다.";
//     }
// }

// // 위치가 업데이트될 때마다 속도를 계산하는 함수
// function updatePosition(position) {
//     const currentTime = Date.now();     // 현재 시간을 밀리초 단위로 가져옴
//     const latitude = position.coords.latitude.toFixed(5);   // 위도 소수점 5자리
//     const longitude = position.coords.longitude.toFixed(5); // 경도 소수점 5자리
    
//     if (lastPosition && lastTime) {     // 이전 위치와 시간이 존재할 때만 속도 계산
//         const timeElasped = (currentTime - lastTime) / 1000; //시간 간격(초단위)계산

//         const distance = getDistanceFromLatLonInM(      // 두 위치 간의 거리 계산 (미터 단위)
//             lastPosition.latitude, lastPosition.longitude,      // 이전 위치
//             currentPosition.latitude, currentPosition.longitude     // 현재 위치
//         );
//         // document.getElementById("status-print").innerText = lastPosition;
//         // 속도 계산 (m/s 단위로 반환)
//         const speed = distance / timeElapsed; // 속도 = 거리 / 시간
//         document.getElementById("location-display").innerText = `속도: ${speed.toFixed(2)} m/s`;
//     }
//     //현재 위치와 시간을 저장하여 다음 업데이트 시 속도를 계산할 수 있도록 함.
//     lastPosition = currentPosition;     // 현재 위치를 이전 위치로 업데이트
//     lastTime = currentTime;             // 현재 시간을 이전 시간으로 업데이트
//     // 현재 위치가 업데이트될 때만 위도와 경도를 출력
//     if (currentPosition.latitude && currentPosition.longitude) {
//         document.getElementById("status-print").innerText = 
//             `현재 위치 - 위도: ${currentPosition.latitude.toFixed(6)}, 경도: ${currentPosition.longitude.toFixed(6)}`;
//     } else {
//         document.getElementById("status-print").innerText = "위치 정보를 불러오는 중...";
//     }
//     //소리 재생(위치 업데이트 시 마다)
//     //playSound();
//     triggerVibration();
// }

// // 두 위치 간의 거리를 계산하는 함수 (Haversine 공식 사용)
// // Haversine 공식은 두 지점 간의 구면 거리 계산을 위한 공식입니다.
// // 사용시 더 정교하게 속도가 측정 가능하다고 함.
// function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
//     const R = 6371000; // 지구 반경 (미터)
//     const dLat = (lat2 - lat1) * Math.PI / 180;     // 위도 차이를 라디안 단위로 변환
//     const dLon = (lon2 - lon1) * Math.PI / 180;     // 경도 차이를 라디안 단위로 변환
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//               Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//               Math.sin(dLon / 2) * Math.sin(dLon / 2);      
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));       // 두 지점 간의 중앙각
//     return R * c;       // 구면거리 반환 (미터 단위)

// }

// // 위치 정보 오류 처리 함수
// function showError(error) {
//     switch(error.code) {
//         // 오류 코드에 따라 다른 메시지를 표시
//         case error.PERMISSION_DENIED:
//             // 사용자가 위치 정보 제공을 거부한 경우
//             document.getElementById("location-display").innerText = "사용자가 위치 정보 제공을 거부했습니다.";
//             break;
//         case error.POSITION_UNAVAILABLE:
//             // 위치 정보를 사용할 수 없는 경우 (GPS나 네트워크 오류 등)
//             document.getElementById("location-display").innerText = "위치 정보를 사용할 수 없습니다.";
//             break;
//         case error.TIMEOUT:
//             // 위치 정보를 가져오는 데 시간이 초과된 경우
//             document.getElementById("location-display").innerText = "위치 정보를 가져오는 데 시간이 초과되었습니다.";
//             break;
//         case error.UNKNOWN_ERROR:
//             // 알 수 없는 오류 발생
//             document.getElementById("location-display").innerText = "알 수 없는 오류가 발생했습니다.";
//             break;
//     }
// }

// // 소리를 재생하는 함수
// function playSound() {
//     var sound = document.getElementById("sound");   // HTML 오디오 요소 (id가 'sound'인 요소)
//     if (sound) {
//         // 소리 재생을 시도하고 오류가 발생하면 에러 메시지를 콘솔에 출력
//         sound.play().catch(error => {
//             console.error("소리 재생 중 오류 발생:", error);
//         });
//     } else {
//         // 'sound' id를 가진 오디오 요소가 없으면 오류 메시지를 출력
//         console.error("오디오 요소를 찾을 수 없습니다.");
//     }
// }

// // 진동 기능을 트리거하는 함수
// function triggerVibration() {
//     // 진동 기능 지원 여부 확인
//     if (navigator.vibrate) {
//         // 진동 기능을 지원하는 기기에서만 진동을 시작 (10초 동안)
//         navigator.vibrate(100); // 10초 동안 진동
//     } else {
//         // 진동을 지원하지 않는 기기에서는 콘솔에 메시지를 출력
//         console.log("이 기기는 진동 기능을 지원하지 않습니다.");
//     }
// }

// // 위치 추적 중지를 위한 함수
// // 사용자가 추적을 중지할 수 있도록 하는 함수
// function stopTracking() {
//     if (watchID !== null) {
//          // 위치 추적을 중지하기 위해 watchPosition ID를 사용하여 clearWatch 호출
//         navigator.geolocation.clearWatch(watchID);
//         watchID = null; // watchID 초기화
//         // 추적 중지 후 화면에 메시지 표시
//         document.getElementById("location-display").innerText = "위치 추적이 중지되었습니다.";
//     }
// }


//두번째 시도 coords.speed를 사용해봄.....

let previousLatitude = null;
let previousLongitude = null;
let previousTime = null;
let speed = 0;

navigator.geolocation.watchPosition(
    function(position) {
      const speed = position.coords.speed;  // 이동 속도 (m/s)
      
      if (speed !== null) {
        console.log(`현재 속도: ${speed.toFixed(1)} m/s`);  // m/s로 출력
        // HTML에 속도 출력
        document.getElementById("status-print").innerText = `속도: ${speed.toFixed(1)} m/s`;
      } else {
        console.log("속도를 측정할 수 없습니다.");
      }
    },
    function(error) {
      console.error("위치를 가져오는 데 실패했습니다:", error);
    },
    {
      enableHighAccuracy: true,  // 높은 정확도로 위치를 추적
      maximumAge: 0,            // 이전에 저장된 위치 데이터 사용하지 않음
      timeout: 5000             // 최대 대기 시간 (5초)
    }
  );
  

// 두 지점 간의 거리 계산 함수 (Haversine 공식을 사용)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // 지구 반경 (단위: 킬로미터)
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // 킬로미터 단위로 반환
}

// 도를 라디안으로 변환하는 함수
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

  


// 정확도: getCurrentPosition은 실제 위치를 반환할 때까지 시간이 걸리기 때문에 두 번의 호출이 너무 짧은 간격에서 발생할 경우 정확한 결과를 얻기 어려울 수 있습니다. 가능하다면 측정 간격을 더 늘려 정확한 값을 얻을 수 있습니다.

// 속도 계산: 측정 간격을 늘리거나, 두 위치 간의 이동 거리가 적을 경우 속도가 0에 가까운 값으로 나올 수 있습니다. 이 부분을 개선하려면 이동 거리가 일정 이상일 때만 속도를 계산하도록 조건을 추가할 수 있습니다.