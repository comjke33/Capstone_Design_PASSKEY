MIN_DISTANCE_TO_SEEKER = 1.2
MIN_DISTANCE_TO_MISSION = 1.2

MISSION_AREA_CNT = 3

WARNING_VELOCITY_SEEKER = 2.2
MAX_VELOCITY_SEEKER = 2.73

WARNING_VELOCITY_SURVIVOR = 1.7
MAX_VELOCITY_SURVIVOR = 2.4

import random
from collections import Counter

# Player 클래스
class Player:
    def __init__(self, id, team, role):
        self.id = id
        self.team = team # seeker OR survivor
        self.role = role # normal OR others

        # TODO -> 삭제 가능성 높음
        self.position = [0,0,0] # z, x, y
        self.velocity = 0

    # TODO -> 삭제 가능성 높음
    # player의 위치 설정
    def set_position(self, x, y, z):
        self.position = [z, x, y]

    # TODO -> 삭제 가능성 높음
    # player의 위치 반환
    def get_position(self):
        return self.position
    
# 술래 클래스
class Seeker(Player):
    def __init__(self, id, role):
        super().__init__(id, "seeker", role)

        # 술래 id
        self.id = id

    # TODO -> 삭제 가능성 높음
    # 생존자를 찾았을 때 호출
    def find_survivor(self, survivor_id):
        pass

    # TODO -> 프론트단에서 처리 가능
    # 속도 검사
    def check_velocity(self):
        if self.velocity > MAX_VELOCITY_SEEKER:
            return "Max"
        elif self.velocity > WARNING_VELOCITY_SURVIVOR:
            return "Warning"
        else:
            return None
        
# 생존자 클래스
class Survivor(Player):
    def __init__(self, id, role):
        super().__init__(id, "survivor", role)
        
        # 생존자의 id
        self.id = id

        # 현재 생존자의 상태
        # 0: 최초 / 1: 부활 / 2: 수감 대기 / 3: 수감 중 / 4: 영구 탈락 / 5: 미션 수행 중 
        self.status = 0
        self.distance_from_seeker = 0 
        self.distance_from_mission = [0] * MISSION_AREA_CNT

    # 탈출 수행
    def escape(self):
        self.status = 1

    # TODO -> 프론트단에서 처리 가능
    # 속도 검사
    def check_velocity(self):
        if self.velocity > MAX_VELOCITY_SURVIVOR:
            return "Max"
        elif self.velocity > WARNING_VELOCITY_SEEKER:
            return "Warning"
        else:
            return None
    
    # 거리 계산 수행 
    def calculate_distance_from_seeker(self):
        if self.distance_from_seeker <= MIN_DISTANCE_TO_SEEKER:
            return True
        return None
    
    # TODO -> 프론트단에서 처리 가능
    # 미션과의 거리 판단
    def calculate_distance_from_mission(self):
        for idx in range(MISSION_AREA_CNT):
            if self.distance_from_mission[idx] <= MIN_DISTANCE_TO_MISSION:
                return idx
        return None
            

# 미션 클래스
class Mission:
    def __init__(self, id):
        self.id = id
        self.cooltime = 0.0
        self.is_cooltime = False
        self.progress = 0.0
        self.survivor_cnt = 0

# 게임 관리 클래스
class Game:
    def __init__(self, game_setting):
        self.turns = game_setting['turn']
        self.current_turn = 0
        self.result = None
        
        self.total_mission_cnt = game_setting["mission_num"]
        self.complete_mission_cnt = 0
        self.missions = [Mission(i) for i in range(0, game_setting["mission_num"])]

        self.seekers = [Seeker(i, "normal") for i in range(0, game_setting["seeker_num"])]
        self.survivors = [Survivor(i, "normal") for i in range(0, game_setting["survivor_num"])]

    # TODO
    # 센서값으로 멤버 변수 업데이트
    def update_sensor_state(self):
        pass

    # TODO
    # MYSQL 업데이트
    def update2DB(self):
        pass

    # 미션 상태 업데이트
    def update_mission_state(self, mission_counts, mission_progress, mission_cooltime):
        for i in range(MISSION_AREA_CNT):
            # 미션 지역 생존자 수 업데이트
            self.missions[i].survivor_cnt = mission_counts[i]

            # 미션 성공 여부 업데이트   
            self.missions[i].progress = mission_progress[i]

            # 미션 쿨타임 업데이트
            self.missions[i].cooltime = mission_cooltime[i]

            # 미션 가능 여부 업데이트
            if self.missions[i].cooltime == 0.0:
                self.missions[i].is_cooltime = False
            else:
                self.missions[i].is_cooltime = True

    # 게임 시작
    def start_game(self):
        print("Game Started!")
        for survivor in self.survivors:
            survivor.status = 0  # 생존자 상태 초기화

        for i in range(self.turns):
            self.play_turn()

    # 턴 진행
    def play_turn(self):            
        # 현재 턴 출력
        print(f"\n--- Turn {self.current_turn + 1} ---")

        # 한 턴 시작
        while True:
            # TODO
            # 데이터 업데이트 + ESP32과의 UDP 통신 후 받아옴
            self.update_sensor_state()

            # TODO
            # DB 업데이트 + MYSQL 연동
            self.update2DB()

            # TODO            
            # 게임 진행 
            # flag 각각 검사

            # 각 생존자의 술래와의 거리 계산
            for s in self.survivors:
                if s.calculate_distance_from_seeker():
                    if s.status == 0:
                        s.status = 2
                    elif s.status == 1:
                        s.status = 4
                    elif s.status == 2:
                        pass
                    elif s.status == 3:
                        pass
                    elif s.status == 4:
                        pass
            
            mission_counts = Counter()
            
            # TODO
            # 미션 진행도는 프론트 단에서 넘겨줘야함
            mission_progress = [] 

            # TODO
            # 미션 쿨타임은 프론트 단에서 넘겨줘야함
            mission_cooltime = [] 
            
            # 미션과의 거리 계산
            for s in self.survivors:
                mission_idx = s.calculate_distance_from_mission()

                if mission_idx is not None:
                    s.status = 5
                    mission_counts[mission_idx] += 1
            
            # 미션 상태 업데이트
            self.update_mission_state(mission_counts, mission_progress, mission_cooltime)

            # 한 턴이 종료되었을 때 
            self.result = self.check_game_over()
            if self.result == "Tagger Win":
                # TODO
                # 술래 승리 상황
                # flask와의 통신

                self.current_turn += 1
                break

            elif self.result == "Survivor Win":
                # TODO
                # 생존자 승리 상황
                # flask와의 통신
                
                self.current_turn += 1
                break

    # 게임 오버 체크
    def check_game_over(self):
        # 술래 승리
        # 모두가 잡혔을 때 (survivor.status == 4 : 영구 탈락)
        all_captured = all(survivor.status == 4 for survivor in self.survivors)
        if all_captured:
            print("All survivors are caught! Game Over.")
            return "Tagger Win"
        
        # 생존자 승리
        # 생존자의 미션 진행도가 일정 이상일 때
        if self.complete_mission_cnt == self.total_mission_cnt:
            return "Survivor Win"
        
        # 아직 결론 나지 않음
        return None


# ====================== 게임 시작 ======================

setting_complete = False
game_setting = {}

while True:
    # TODO
    # 게임 세팅을 받는 부분
    # 만약 게임 세팅 정보를 넘겨받았다면 -> 조건 수정
    if True:
        setting_complete = True
        game_setting = {
            "turn" : 1, 
            "player_num" : 5,
            "seeker_num" : 1,
            "survivor_num" : 4,
            "mission_num" : 7
        }

    # 게임 세팅이 완료되었다면 게임 시작
    if setting_complete == True:     
        # 게임 객체 선언
        game = Game(game_setting)
        # 게임 시작
        game.start_game()
