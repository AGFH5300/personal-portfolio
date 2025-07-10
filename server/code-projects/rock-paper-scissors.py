
import random

print("=== Rock Paper Scissors ===")
print("Play the classic game against the computer!")
print()

rock = '''
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
'''

paper = '''
    _______
---'   ____)____
          ______)
          _______)
         _______)
---.__________)
'''

scissors = '''
    _______
---'   ____)____
          ______)
       _________)
      (____)
---.__(___)
'''

game_images = [rock, paper, scissors]
choice_names = ["Rock", "Paper", "Scissors"]

def get_user_choice():
    """Get user's choice with validation."""
    while True:
        try:
            print("\nWhat do you choose?")
            print("0 - Rock 🪨")
            print("1 - Paper 📄")
            print("2 - Scissors ✂️")
            
            choice = int(input("Enter your choice (0-2): "))
            if 0 <= choice <= 2:
                return choice
            print("Please enter 0, 1, or 2.")
        except ValueError:
            print("Please enter a valid number.")

def determine_winner(user_choice, computer_choice):
    """Determine the winner and return result."""
    if user_choice == computer_choice:
        return "tie"
    elif (user_choice == 0 and computer_choice == 2) or \
         (user_choice == 1 and computer_choice == 0) or \
         (user_choice == 2 and computer_choice == 1):
        return "user"
    else:
        return "computer"

def display_choices(user_choice, computer_choice):
    """Display both choices with graphics."""
    print(f"\nYou chose {choice_names[user_choice]}:")
    print(game_images[user_choice])
    
    print(f"Computer chose {choice_names[computer_choice]}:")
    print(game_images[computer_choice])

def play_round():
    """Play a single round and return the result."""
    user_choice = get_user_choice()
    computer_choice = random.randint(0, 2)
    
    display_choices(user_choice, computer_choice)
    
    result = determine_winner(user_choice, computer_choice)
    
    if result == "tie":
        print("🤝 It's a tie!")
        return "tie"
    elif result == "user":
        print("🎉 You win this round!")
        return "user"
    else:
        print("😔 Computer wins this round!")
        return "computer"

def display_score(user_wins, computer_wins, ties):
    """Display current score."""
    total_games = user_wins + computer_wins + ties
    print(f"\n📊 Score Summary:")
    print("=" * 25)
    print(f"You: {user_wins} wins")
    print(f"Computer: {computer_wins} wins")
    print(f"Ties: {ties}")
    print(f"Total games: {total_games}")
    print("=" * 25)

def main():
    """Main function to run the rock paper scissors game."""
    user_wins = 0
    computer_wins = 0
    ties = 0
    
    print("🪨📄✂️ Welcome to Rock Paper Scissors! 🪨📄✂️")
    
    while True:
        print(f"\n{'='*50}")
        print(f"Round {user_wins + computer_wins + ties + 1}")
        print(f"{'='*50}")
        
        result = play_round()
        
        # Update scores
        if result == "user":
            user_wins += 1
        elif result == "computer":
            computer_wins += 1
        else:
            ties += 1
        
        display_score(user_wins, computer_wins, ties)
        
        # Ask if user wants to play again
        print()
        play_again = input("Would you like to play another round? (y/n): ").lower().strip()
        if play_again not in ['y', 'yes']:
            print(f"\n🎮 Final Results:")
            display_score(user_wins, computer_wins, ties)
            
            if user_wins > computer_wins:
                print("🏆 Congratulations! You won overall!")
            elif computer_wins > user_wins:
                print("🤖 Computer wins overall! Better luck next time!")
            else:
                print("🤝 It's a tie overall! Great game!")
            
            print("Thanks for playing Rock Paper Scissors! 🪨📄✂️")
            break

if __name__ == "__main__":
    main()
