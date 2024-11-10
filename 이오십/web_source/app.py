import os
from flask import Flask, render_template, request, url_for


#occupation=점령
#mission=생존자 미션


app = Flask(__name__)   #flask app생성

@app.route('/')         #기본경로 '/'에 대한 라우팅 설정 

# def index():
#     return render_template('index.html')  # 'templates/index.html' 파일을 렌더링합니다.

def home():
    client_ip = request.remote_addr  # 요청한 클라이언트의 IP주소 확인
    if client_ip == "192.168.0.4":
        return render_template('index.html')  #관리자(나)인 경우 index.html로 렌더링
        
    elif client_ip == "192.168.0.3":
        target_page = url_for('seeker')     #술래 단말기의 경우 seeker페이지 할당        
    elif client_ip == "192.168.0.8":
        target_page = url_for('survivor')      # 생존자1에게 survivor-playing 페이지 할당  
    # elif client_ip == "":                       
    #     target_page = url_for('survivor')      # 생존자2에게 survivor-playing 페이지 할당(아이피 주소 미정)
    # elif client_ip == "":
    #     target_page = url_for('survivor')      # 생존자3에게 survivor-playing 페이지 할당(아이피 주소 미정)
    else:
        return render_template('survivor-occupation.html')        # 내 핸드폰으로 접속하면 occupation으로 접속됨.
    # else:
    #     target_page = url_for('survivor-occupation')
    

    return render_template('main.html', target_page=target_page)    # main.html 템플릿으로 렌더링하며 target_page 변수 전달

# 각 HTML 파일에 대한 별도의 라우트를 설정하여 templates 폴더 내 파일을 렌더링
@app.route('/seeker')
def seeker():
    return render_template('seeker.html')   # seeker 페이지 라우트: 'templates/seeker.html' 파일 렌더링

@app.route('/survivor')
def survivor():
    return render_template('survivor-playing.html')    # survivor 페이지 라우트: 'templates/survivor1.html' 파일 렌더링

# @app.route('/survivor-occupation')
# def occupation():
#     return render_template('survivor-mission.html')    # survivor 미션 페이지 라우트: 'templates/survivor-mission.html' 파일 렌더링

# '생존자 점령' 페이지 렌더링
# 사용자가 '/occupation' URL에 접근하면 'survivor-occupation.html' 템플릿을 렌더링하여 반환
@app.route('/occupation')
def occupation():
    return render_template('survivor-occupation.html')

# '생존자 미션' 페이지 렌더링
# 사용자가 '/mission' URL에 접근하면 'survivor-mission.html' 템플릿을 렌더링하여 반환
@app.route('/mission')
def mission():
    return render_template('survivor-mission.html')

# '플레이 페이지' 렌더링
# 사용자가 '/playing' URL에 접근하면 'survivor-playing.html' 템플릿을 렌더링하여 반환
@app.route('/playing')
def playing():
    return render_template('survivor-playing.html')

# 메인 프로그램 실행 시 HTTPS 서버 시작
if __name__ == "__main__":
    ## 현재 파일의 절대 경로 기준으로 static 폴더 내 인증서 파일 위치 설정
    base_dir = os.path.dirname(os.path.abspath(__file__))
    cert_path = os.path.join(base_dir, 'static', 'cert.pem')    # SSL 인증서 경로
    key_path = os.path.join(base_dir, 'static', 'key.pem')      # SSL 개인 키 경로
    
    ssl_context = (cert_path, key_path)                         # SSL 인증서를 사용하여 HTTPS 서버 실행 (포트 443)
    app.run(host="0.0.0.0", port=443, ssl_context=ssl_context, debug=True)