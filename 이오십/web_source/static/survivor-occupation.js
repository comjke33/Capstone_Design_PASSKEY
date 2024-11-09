/*생존자가 점령 지역에 들어오게되면 서버로부터 어떠한 데이터를 받고 survivor-playing에서 자동으로 리디렉션되게 해야함.*/

/* 서버로부터 데이터를 받는 코드*/

//서버로부터 데이터를 받았을 때에 survivor-mission.html로 리디렉션 시켜주는 코드

let min = 1;        //최솟값
let max = 10;       //최댓값
let radomInt = Math.floor(Math.random() * (max - min +1)) + min;        //랜덤값
