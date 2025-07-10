
import random

print("=== Coin Flip Simulator ===")
print("Flip a virtual coin and test your luck!")
print()

def get_seed():
    """Get random seed from user."""
    while True:
        try:
            seed_input = input("Enter a seed number for consistent results (or press Enter for random): ").strip()
            if not seed_input:
                return None
            return int(seed_input)
        except ValueError:
            print("Please enter a valid number.")

def get_flip_count():
    """Get number of flips from user."""
    while True:
        try:
            count_input = input("How many times would you like to flip the coin? (1-100): ").strip()
            count = int(count_input)
            if 1 <= count <= 100:
                return count
            print("Please enter a number between 1 and 100.")
        except ValueError:
            print("Please enter a valid number.")

def flip_coin():
    """Flip a coin and return the result."""
    return "Heads" if random.randint(0, 1) == 1 else "Tails"

def main():
    """Main function to run the coin flip simulator."""
    while True:
        print("🪙 Coin Flip Simulator 🪙")
        print()
        
        # Get seed
        seed = get_seed()
        if seed is not None:
            random.seed(seed)
            print(f"Using seed: {seed}")
        else:
            print("Using random flips")
        
        # Get number of flips
        flip_count = get_flip_count()
        
        print(f"\nFlipping coin {flip_count} time(s)...")
        print("=" * 30)
        
        # Perform flips
        results = []
        heads_count = 0
        tails_count = 0
        
        for i in range(flip_count):
            result = flip_coin()
            results.append(result)
            
            if result == "Heads":
                heads_count += 1
                print(f"Flip {i+1}: 🟡 {result}")
            else:
                tails_count += 1
                print(f"Flip {i+1}: ⚪ {result}")
        
        # Show summary
        print("=" * 30)
        print(f"📊 Summary:")
        print(f"   Heads: {heads_count} ({heads_count/flip_count*100:.1f}%)")
        print(f"   Tails: {tails_count} ({tails_count/flip_count*100:.1f}%)")
        
        if flip_count > 1:
            if heads_count > tails_count:
                print(f"   🟡 Heads won by {heads_count - tails_count}!")
            elif tails_count > heads_count:
                print(f"   ⚪ Tails won by {tails_count - heads_count}!")
            else:
                print(f"   🤝 It's a tie!")
        
        # Ask if user wants to flip again
        print()
        flip_again = input("Would you like to flip again? (y/n): ").lower().strip()
        if flip_again not in ['y', 'yes']:
            print("Thanks for using the Coin Flip Simulator! 🪙")
            break
        print()

if __name__ == "__main__":
    main()
