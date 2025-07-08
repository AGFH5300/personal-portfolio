import random

print("=== Rock Paper Scissors ===")
print("Best of 3 rounds wins!")
print("Enter: rock, paper, or scissors")
print()

player_score = 0
computer_score = 0
round_num = 1

while player_score < 2 and computer_score < 2:
    print(f"--- Round {round_num} ---")
    
    # Get player choice
    player_choice = input("Your choice: ").lower().strip()
    
    if player_choice not in ['rock', 'paper', 'scissors']:
        print("Invalid choice! Please enter rock, paper, or scissors.")
        continue
    
    # Computer choice
    computer_choice = random.choice(['rock', 'paper', 'scissors'])
    print(f"Computer choice: {computer_choice}")
    
    # Determine winner
    if player_choice == computer_choice:
        print("It's a tie!")
    elif (player_choice == 'rock' and computer_choice == 'scissors') or \
         (player_choice == 'paper' and computer_choice == 'rock') or \
         (player_choice == 'scissors' and computer_choice == 'paper'):
        print("You win this round!")
        player_score += 1
    else:
        print("Computer wins this round!")
        computer_score += 1
    
    print(f"Score - You: {player_score}, Computer: {computer_score}")
    print()
    round_num += 1

# Final result
print("=== GAME OVER ===")
if player_score > computer_score:
    print("🎉 Congratulations! You won the game!")
else:
    print("💻 Computer wins the game! Better luck next time!")
    
print(f"Final Score - You: {player_score}, Computer: {computer_score}")