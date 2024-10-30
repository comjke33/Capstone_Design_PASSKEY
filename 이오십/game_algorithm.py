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
        
    # 게임 시작
    def start_game(self):
        print("Game Started!")
        for survivor in self.survivors:
            survivor.is_captured = False  # 생존자 상태 초기화
        self.play_turns()

    # 턴 진행
    def play_turns(self):
        turns = 0         
            
        while not self.check_game_over():
            print(f"\n--- Turn {turns + 1} ---")
            for survivor in self.survivors:
                survivor.escape()
            self.seeker.find_survivor(self.survivors)
            turns += 1

    # 게임 오버 체크
    def check_game_over(self):
        all_captured = all(survivor.is_captured for survivor in self.survivors)
        if all_captured:
            print("All survivors are caught! Game Over.")
            return True
        return False


def __main__():
    game_setting = {
        "player_num" : 5,
        "seeker_num" : 1,
        "survivor_num" : 4,
        "seeker_role_list" : ["normal" * game_setting["seeker_num"]],
        "survivor_role_list" : ["normal" * game_setting["survivor_num"]]
    }

    # 게임 실행
    game = Game(game_setting)
    game.start_game()
