
import random

# Player 클래스
class Player:
    def __init__(self, id, team, role):
        self.id = id
        self.team = team # seeker OR survivor
        self.role = role # normal OR others

        self.position = [0,0,0] # z, x, y
        self.velocity = 0

    # player의 위치 설정
    def set_position(self, x, y, z):
        self.position = [z, x, y]

    # player의 위치 반환
    def get_position(self):
        return self.position
    
# 술래 클래스
class Seeker(Player):
    def __init__(self, id, role):
        super().__init__(id, "seeker", role)
            
    # 생존자를 찾았을 때 호출
    def find_survivor(self, suvivors_id):
        pass

    # 거리 계산 수행 -> 삭제 가능성 높음
    def calculate_distance(self,):
        pass

    # 속도 검사
    def check_velocity(self,):
        pass
    
        
# 생존자 클래스
class Survivor(Player):
    def __init__(self, id, role):
        super().__init__(id, "survivor", role)
        self.in_prison = False
        self.found_cnt = 0    
        self.dead = False

    def is_found(self):
        self.found_cnt = self.found_cnt + 1
        if self.found_cnt == 2 and self.role == "normal":
            self.dead = True
            return "dead"

        elif self.found_cnt == 2 and self.role == "others": # 용병 캐릭터 시 실행
            pass 

        else: # 부활 시 또는 found_cnt == 1일 때 감옥 처리
            self.in_prison == True
            pass

    # 탈출 수행
    def escape(self):
        pass

    # 속도 검사
    def check_velocity(self,):
        pass

# 게임 관리 클래스
class Game:
    def __init__(self, game_setting):
        self.seeker = [Seeker(i+1, game_setting["seeker_role_list"][i]) for i in range(0, game_setting["seeker_num"])]
        self.survivors = [Survivor(i+1, game_setting["survivor_role_list"][i]) for i in range(0, game_setting["survivor_num"])]
        self.turns = game_setting['turn']
        self.current_turn = 0
        self.status
        self.total_mission_cnt
        self.complete_mission_cnt

    # 게임 시작
    def start_game(self):
        print("Game Started!")
        for survivor in self.survivors:
            survivor.is_captured = False  # 생존자 상태 초기화

        for i in range(self.turns):
            self.play_turn()

    # 턴 진행
    def play_turn(self):            
        # 턴만큼 계속 진행
        while not self.check_game_over():
            # 현재 턴 출력
            print(f"\n--- Turn {self.current_turn + 1} ---")
            
            # 게임 진행 
            



            # TODO
            # 한 턴이 종료되었을 때 
            if True:
                self.current_turn += 1
                break

    # 게임 오버 체크
    def check_game_over(self):
        # 술래 승리
        # 모두가 잡혔을 때 
        all_captured = all(survivor.status for survivor in self.survivors)
        if all_captured:
            print("All survivors are caught! Game Over.")
            return "Tagger Win"
        
        # 생존자 승리
        # 생존자의 미션 진행도가 일정 이상일 때
        if self.complete_mission_cnt == self.total_mission_cnt:
            return "Survivor Win"
        
        # 아직 결론 나지 않음
        return False


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
            "seeker_role_list" : ["normal" * game_setting["seeker_num"]],
            "survivor_role_list" : ["normal" * game_setting["survivor_num"]]
        }

    # 게임 세팅이 완료되었다면 게임 시작
    if setting_complete == True:     
        # 게임 객체 선언
        game = Game(game_setting)
        # 게임 시작
        game.start_game()
