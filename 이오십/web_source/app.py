import os
from flask import Flask, render_template, request, url_for

app = Flask(__name__)

@app.route('/')

# def index():
#     return render_template('index.html')  # 'templates/index.html' 파일을 렌더링합니다.

def home():
    client_ip = request.remote_addr  # 요청한 클라이언트의 IP주소 확인
    if client_ip == "192.168.0.4":
        return render_template('index.html')  # 김동현 관리자 페이지
        
    elif client_ip == "192.168.0.3":
        target_page = url_for('seeker')        
    elif client_ip == "192.168.0.8":
        target_page = url_for('survivor1')  
    else:
        return render_template('index.html')
    
    # main.html로 렌더링하고 타겟 페이지 정보 전달
    return render_template('main.html', target_page=target_page)

# 각 HTML 파일에 대한 별도의 라우트를 설정하여 templates 폴더 내 파일을 렌더링
@app.route('/seeker')
def seeker():
    return render_template('seeker.html')

@app.route('/survivor1')
def survivor1():
    return render_template('survivor1.html')



if __name__ == "__main__":
    # 현재 디렉토리를 기준으로 static 폴더 내 인증서 파일 경로 설정
    base_dir = os.path.dirname(os.path.abspath(__file__))
    cert_path = os.path.join(base_dir, 'static', 'cert.pem')
    key_path = os.path.join(base_dir, 'static', 'key.pem')
    
    ssl_context = (cert_path, key_path)
    app.run(host="0.0.0.0", port=443, ssl_context=ssl_context, debug=True)