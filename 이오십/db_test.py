import pymysql

# MySQL 데이터베이스에 연결
conn = pymysql.connect(
    host='192.168.0.16',   # MySQL 서버 주소
    user='root',   # 사용자 이름
    password='passkey0012',   # 비밀번호
    database='flask_db'   # 데이터베이스 이름
)
cursor = conn.cursor()

# 데이터 조회
cursor.execute("SELECT * FROM user")
rows = cursor.fetchall()
print(rows)

# 연결 종료
conn.close()