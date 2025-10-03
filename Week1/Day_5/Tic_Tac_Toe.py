def display_board(board):
    print("\n")
    print("   1   2   3")
    for i, row in enumerate(board):
        print(f"{i+1}  " + " | ".join(row))
        if i < 2:
            print("  ---+---+---")
    print("\n")


def player_input(player, board):
    while True:
        try:
            row = int(input(f"Player {player}, enter row (1-3): ")) - 1
            col = int(input(f"Player {player}, enter column (1-3): ")) - 1
            if row in range(3) and col in range(3):
                if board[row][col] == " ":
                    return row, col
                else:
                    print("That spot is already taken. Try again.")
            else:
                print("Invalid input. Row and column must be from 1 to 3.")
        except ValueError:
            print("Please enter valid numbers.")


def check_win(board, player):
    # Rows, Columns, Diagonals
    for i in range(3):
        if all([cell == player for cell in board[i]]):  # Row
            return True
        if all([board[j][i] == player for j in range(3)]):  # Column
            return True
    # Diagonals
    if all([board[i][i] == player for i in range(3)]):
        return True
    if all([board[i][2 - i] == player for i in range(3)]):
        return True
    return False


def check_tie(board):
    return all(cell != " " for row in board for cell in row)


def play():
    board = [[" " for _ in range(3)] for _ in range(3)]
    current_player = "X"
    display_board(board)

    while True:
        row, col = player_input(current_player, board)
        board[row][col] = current_player
        display_board(board)

        if check_win(board, current_player):
            print(f"🎉 Player {current_player} wins!")
            break
        elif check_tie(board):
            print("🤝 It's a tie!")
            break

        # Switch player
        current_player = "O" if current_player == "X" else "X"


# Run the game
if __name__ == "__main__":
    play()
