//생존자 1,2,3의 미션 코드
/*각각의 생존자는 미션 지역에 들어왔을 경우 랜덤하게 버튼을 클릭해야하는 것이 출력됨.*/
/*버튼을 누르면 playing.html로 넘어갈 수 있게*/
//버튼을 누르면 각각의 페이지로 리디렉션됨.

const occupation_button = document.getElementById("occupation_button");
const playing_button = document.getElementById("playing_button");

// occupation_button 클릭 시 점령 페이지로 이동
occupation_button.addEventListener("click", function() {
    window.location.href = "/occupation"; // 점령 페이지의 URL
});

// playing_button 클릭 시 플레이 페이지로 이동
playing_button.addEventListener("click", function() {
    window.location.href = "/playing"; // 플레이 페이지의 URL
});


let a = 1;
let b = 2;
document.write(a + b);

