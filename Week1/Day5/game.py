import random
class Game:
    def get_user_item(self):     
            while True:
             choice = input("Select (r)ock, (p)aper, (s)cissors: ").strip().lower()
            
             if choice in ("r", "p", "s"):
                return choice
             else:
                print("Please enter only 'r', 'p', or 's'!")

    
    def get_computer_item(self):
        choices = ["r", "p", "s"]
        computer_choice = random.choice(choices)
        print(f"Computer chose: {computer_choice}") 
        return computer_choice 
    
    def get_game_result(self, user_item, computer_item):
      
        if user_item == computer_item :
            return "draw"
        elif (user_item == "r" and computer_item == "s") or \
             (user_item == "p" and computer_item == "r") or \
             (user_item == "s" and computer_item == "p"):
            return "win"
        else:
            return "loss"
        
    def play(self):

        user_choice = self.get_user_item()
        computer_choice = self.get_computer_item()
        result = self.get_game_result(user_choice, computer_choice)

        if result == "draw":
            print("It's a draw!")
        elif result == "win":
            print("You win! ")
        else:
            print("Computer wins! ")
        
        return result
    


