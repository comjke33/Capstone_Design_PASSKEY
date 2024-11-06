import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')  # 'templates/index.html' 파일을 렌더링합니다.

if __name__ == "__main__":
    # 현재 디렉토리를 기준으로 static 폴더 내 인증서 파일 경로 설정
    base_dir = os.path.dirname(os.path.abspath(__file__))
    cert_path = os.path.join(base_dir, 'static', 'cert.pem')
    key_path = os.path.join(base_dir, 'static', 'key.pem')
    
    ssl_context = (cert_path, key_path)
    app.run(host="0.0.0.0", port=443, ssl_context=ssl_context)

