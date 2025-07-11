import random

print("=== Banker Roulette ===")
print("Randomly select who pays for the meal!")
print()

def get_names():
    """Get names from user with validation."""
    while True:
        names_input = input("Enter everyone's names, separated by commas: ").strip()
        if not names_input:
            print("Please enter at least one name.")
            continue

        # Split and clean names
        names = [name.strip() for name in names_input.split(",")]
        names = [name for name in names if name]  # Remove empty strings

        if len(names) < 2:
            print("Please enter at least 2 names for the roulette to work.")
            continue

        return names



def main():
    """Main function to run banker roulette."""
    while True:
        print("Welcome to Banker Roulette!")
        print()

        # Get names
        names = get_names()
        print(f"\nParticipants: {', '.join(names)}")

        print("Using random selection")

        # Select winner
        chosen_person = random.choice(names)

        print(f"\nThe result is...")
        print("." * 20)
        print(f"{chosen_person} is buying the meal today!")
        print("Enjoy your meal everyone!")

        # Ask if user wants to play again
        print()
        play_again = input("Would you like to play again? (y/n): ").lower().strip()
        if play_again not in ['y']:
            print("Thanks for playing Banker Roulette!")
            break
        print()

main()