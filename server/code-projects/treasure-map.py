
print("=== Treasure Map Game ===")
print("Place treasures on a 3x3 grid!")
print()

def create_map():
    """Create a fresh 3x3 map."""
    return [
        ["⬜️", "⬜️", "⬜️"],
        ["⬜️", "⬜️", "⬜️"],
        ["⬜️", "⬜️", "⬜️"]
    ]

def display_map(game_map):
    """Display the current map."""
    print("\nCurrent Map:")
    print("  1 2 3")
    for i, row in enumerate(game_map):
        print(f"{i+1} {' '.join(row)}")

def get_position():
    """Get treasure position from user with validation."""
    while True:
        try:
            position = input("Enter position (e.g., 23 for row 2, column 3): ").strip()
            
            if len(position) != 2:
                print("Please enter exactly 2 digits (row then column).")
                continue
            
            row = int(position[1]) - 1  # Convert to 0-based index
            col = int(position[0]) - 1  # Convert to 0-based index
            
            if 0 <= row <= 2 and 0 <= col <= 2:
                return row, col
            else:
                print("Please enter numbers between 1 and 3.")
        except ValueError:
            print("Please enter valid numbers.")

def get_treasure_type():
    """Get treasure type from user."""
    treasures = {
        "1": "💎",  # Diamond
        "2": "🏆",  # Trophy
        "3": "💰",  # Money bag
        "4": "👑",  # Crown
        "5": "🗡️",   # Sword
        "6": "📜",  # Scroll
        "7": "🔮",  # Crystal ball
        "8": "⚱️",   # Urn
        "9": "💍"   # Ring
    }
    
    print("\nChoose treasure type:")
    for key, value in treasures.items():
        print(f"{key}. {value}")
    
    while True:
        choice = input("Enter treasure number (1-9): ").strip()
        if choice in treasures:
            return treasures[choice]
        print("Please enter a number between 1 and 9.")

def main():
    """Main function to run the treasure map game."""
    while True:
        print("🗺️  Welcome to Treasure Map! 🗺️")
        print("Place treasures on a 3x3 grid.")
        print("Position format: RC (Row Column), e.g., 23 = Row 2, Column 3")
        
        game_map = create_map()
        placed_treasures = 0
        
        while True:
            display_map(game_map)
            
            print(f"\nTreasures placed: {placed_treasures}")
            print("Commands:")
            print("- Enter position (e.g., 23) to place treasure")
            print("- Type 'done' to finish")
            print("- Type 'reset' to clear map")
            
            command = input("Enter command: ").strip().lower()
            
            if command == 'done':
                if placed_treasures > 0:
                    print("\n🎉 Your treasure map is complete!")
                    display_map(game_map)
                    break
                else:
                    print("Please place at least one treasure before finishing.")
                    continue
            
            elif command == 'reset':
                game_map = create_map()
                placed_treasures = 0
                print("Map reset!")
                continue
            
            elif len(command) == 2 and command.isdigit():
                try:
                    row = int(command[1]) - 1
                    col = int(command[0]) - 1
                    
                    if 0 <= row <= 2 and 0 <= col <= 2:
                        if game_map[row][col] == "⬜️":
                            treasure = get_treasure_type()
                            game_map[row][col] = treasure
                            placed_treasures += 1
                            print(f"Treasure placed at position {command}!")
                        else:
                            print("That position already has a treasure!")
                    else:
                        print("Please enter numbers between 1 and 3.")
                except ValueError:
                    print("Please enter valid numbers.")
            else:
                print("Invalid command. Use position (e.g., 23), 'done', or 'reset'.")
        
        # Ask if user wants to create another map
        print()
        create_another = input("Would you like to create another treasure map? (y/n): ").lower().strip()
        if create_another not in ['y', 'yes']:
            print("Thanks for playing Treasure Map! 🗺️")
            break
        print()

main()
