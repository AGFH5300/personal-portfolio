
print("=== Band Name Generator ===")
print("Create unique band names based on your personal details!")
print()

def get_input_with_validation(prompt, min_length=1):
    """Get user input with validation."""
    while True:
        user_input = input(prompt).strip()
        if len(user_input) >= min_length:
            return user_input
        print(f"Please enter at least {min_length} character(s).")

def generate_band_name():
    """Generate band name from user inputs."""
    print("Let's create your unique band name!")
    print()
    
    city = get_input_with_validation("Which city did you grow up in? ")
    pet = get_input_with_validation("What is the name of a pet? ")
    
    # Generate multiple variations
    variations = [
        f"{city} {pet}",
        f"The {city} {pet}",
        f"{pet} from {city}",
        f"{city}'s {pet}",
        f"The {pet} of {city}"
    ]
    
    print(f"\n🎵 Here are your band name suggestions:")
    print("=" * 40)
    for i, name in enumerate(variations, 1):
        print(f"{i}. {name}")
    print("=" * 40)
    
    return variations

def main():
    """Main function to run the band name generator."""
    while True:
        band_names = generate_band_name()
        
        print(f"\n✨ Hope you found the perfect band name!")
        
        # Ask if user wants to generate another
        print()
        continue_choice = input("Would you like to generate another band name? (y/n): ").lower().strip()
        if continue_choice not in ['y', 'yes']:
            print("🎸 Rock on with your new band name! 🎸")
            break
        print()

if __name__ == "__main__":
    main()
