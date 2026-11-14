import random

print("=== Number Guessing Game ===")
print("I'm thinking of a number - can you guess it?")
print()

EASY_LEVEL = 10
HARD_LEVEL = 5
logo = '''
  _   _                 _                  _____                     _                _____                      
 | \ | |               | |                / ____|                   (_)              / ____|                     
 |  \| |_   _ _ __ ___ | |__   ___ _ __  | |  __ _   _  ___  ___ ___ _ _ __   __ _  | |  __  __ _ _ __ ___   ___ 
 | . ` | | | | '_ ` _ \| '_ \ / _ \ '__| | | |_ | | | |/ _ \/ __/ __| | '_ \ / _` | | | |_ |/ _` | '_ ` _ \ / _ 
 | |\  | |_| | | | | | | |_) |  __/ |    | |__| | |_| |  __/\__ \__ \ | | | | (_| | | |__| | (_| | | | | | |  __/
 |_| \_|\__,_|_| |_| |_|_.__/ \___|_|     \_____|\__,_|\___||___/___/_|_| |_|\__, |  \_____|\__,_|_| |_| |_|\___|
                                                                              __/ |                              
                                                                             |___/                              
'''

def set_difficulty():
    while True:
        difficulty = input("Choose a difficulty. Type 'easy' or 'hard': ").lower()
        if difficulty == "easy":
            return EASY_LEVEL
        elif difficulty == "hard":
            return HARD_LEVEL
        else:
            print("Please enter 'easy' or 'hard'.")

def check_answer(user_choice, computer_choice, no_of_lives):
    if user_choice > computer_choice:
        print("Too High")
        return no_of_lives - 1
    elif user_choice < computer_choice:
        print("Too Low")
        return no_of_lives - 1
    else:
        print("You got it!")
        print(f"The answer is {computer_choice}")
        return no_of_lives

def game():
    print(logo)
    print("Welcome to The Number Guessing Game!")
    print("I'm thinking of a number between 1 and 100")

    turns = set_difficulty()
    answer = random.randint(1, 100)

    while turns > 0:
        print(f"You have {turns} remaining.")
        try:
            guess = int(input("Make a guess: "))
        except ValueError:
            print("Please enter a valid number.")
            continue

        turns = check_answer(guess, answer, turns)

        if guess == answer:
            return
        elif turns <= 0:
            print("You have run out of guesses. You lose.")
            print(f"The answer was {answer}")
            return
        else:
            print("Guess Again")

def main():
    while True:
        game()
        play_again = input("Would you like to play again? (y/n): ").lower().strip()
        if play_again not in ['y']:
            print("Thanks for playing!")
            break
        print()

main()