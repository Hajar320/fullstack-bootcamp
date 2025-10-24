from game import Game

def get_user_menu_choice():
    print("\n=== Rock Paper Scissors Menu ===")
    print("1. Play a new game")
    print("2. Show scores")
    print("3. Quit")

    while True:
        choice = input("Enter your choice (1-3): ").strip()
        if choice in ("1", "2", "3"):
            return choice
        else:
            print("Invalid choice. Please enter 1, 2, or 3.")
    

def print_results(results) :

    print("\n=== Game Results ===")
    print(f"Wins: {results.get('Win', 0)}")
    print(f"Losses: {results.get('loss', 0)}")
    print(f"Draws: {results.get('draw', 0)}")
    print(f"Total games played: {sum(results.values())}")
    print("\nThank you for playing!")

    
def main():
   results = {'win': 0, 'loss': 0, 'draw': 0}
   while 1:
     choice = get_user_menu_choice()

     if choice == "1":
            game = Game()
            result = game.play()
            results[result] = results.get(result, 0) + 1
     elif choice == "2":
            print_results(results)
     elif choice == "3":
            print_results(results)
            break
       

if __name__ == "__main__":
    main()
