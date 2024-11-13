import socket

def udp_listner():
    UDP_IP = "192.168.0.3"
    UDP_PORT = 1234

    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind((UDP_IP, UDP_PORT))

    print("UDP listner start")

    while True:
        data, addr = sock.recvfrom(1024)
        message = data.decode()
        print(f"Received message: , {data.decode()} from {addr}")

        with open("data.txt", "a") as file:
            file.write(f"{message}\n")

if __name__ == "__main__":
    udp_listner()
              