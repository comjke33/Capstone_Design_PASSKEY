import os
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
# def index():
#     return render_template('index.html')  # 'templates/index.html' 파일을 렌더링합니다.

def home():
    client_ip = request.remote_addr  # 요청한 클라이언트의 IP 주소 확인
    if client_ip == "192.168.0.4":
        return render_template('index.html')  # 김동현 관리자 페이지
        
    elif client_ip == "192.168.0.3":
        return render_template('seeker.html')   #술래 페이지
    
    elif client_ip == "192.168.0.8":
        return render_template("survivor1.html")    #생존자1 페이지

    else:
        return render_template('index.html')  # 다른 IP에서 접근 시 게스트 페이지


if __name__ == "__main__":
    # 현재 디렉토리를 기준으로 static 폴더 내 인증서 파일 경로 설정
    base_dir = os.path.dirname(os.path.abspath(__file__))
    cert_path = os.path.join(base_dir, 'static', 'cert.pem')
    key_path = os.path.join(base_dir, 'static', 'key.pem')
    
    ssl_context = (cert_path, key_path)
    app.run(host="0.0.0.0", port=443, ssl_context=ssl_context)

