from flask import Flask, render_template, request

# pull 절대 주의  다 날라감!!!!!!!!!!!!!!!#

# 관리자 IP 나(손승민) 

app = Flask(__name__)

@app.route('/')
def home():
    client_ip = request.remote_addr  # 요청한 클라이언트의 IP 주소 확인
    if client_ip == "192.168.0.6":
        return render_template('admin.html')  # 손승민 관리자 페이지
        
    # elif client_ip == "192.168.0.4":
    #     return render_template('admin.html')  # 김동현 관리자 페이지

    else:
        return render_template('index.html')  # 다른 IP에서 접근 시 게스트 페이지

if __name__ == "__main__":
    # 모든 네트워크 인터페이스에서 접근 가능하게 설정 (host="0.0.0.0")
    app.run(host="0.0.0.0", port=5000, ssl_context=('static/server.crt', 'static/server.key'))
