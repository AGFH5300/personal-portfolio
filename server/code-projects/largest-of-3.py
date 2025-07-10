
print("=== Largest Number Finder ===")
print("Find the largest number from your input!")
print()

def get_number(prompt):
    """Get a number from user with validation."""
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Please enter a valid number.")

def get_numbers_count():
    """Get how many numbers user wants to compare."""
    while True:
        try:
            count = int(input("How many numbers would you like to compare? (2-10): "))
            if 2 <= count <= 10:
                return count
            print("Please enter a number between 2 and 10.")
        except ValueError:
            print("Please enter a valid number.")

def find_largest_and_smallest(numbers):
    """Find largest and smallest numbers and their positions."""
    largest = max(numbers)
    smallest = min(numbers)
    
    largest_indices = [i for i, x in enumerate(numbers) if x == largest]
    smallest_indices = [i for i, x in enumerate(numbers) if x == smallest]
    
    return largest, smallest, largest_indices, smallest_indices

def display_results(numbers, largest, smallest, largest_indices, smallest_indices):
    """Display the results in a formatted way."""
    print(f"\nResults:")
    print("=" * 40)
    
    print(f"Numbers entered: {', '.join(map(str, numbers))}")
    print(f"Count: {len(numbers)}")
    print()
    
    print(f"Largest number: {largest}")
    if len(largest_indices) > 1:
        positions = [str(i + 1) for i in largest_indices]
        print(f"   Found at positions: {', '.join(positions)}")
    else:
        print(f"   Found at position: {largest_indices[0] + 1}")
    
    print(f"Smallest number: {smallest}")
    if len(smallest_indices) > 1:
        positions = [str(i + 1) for i in smallest_indices]
        print(f"   Found at positions: {', '.join(positions)}")
    else:
        print(f"   Found at position: {smallest_indices[0] + 1}")
    
    if largest == smallest:
        print("   All numbers are equal!")
    else:
        difference = largest - smallest
        print(f"Difference: {difference}")
    
    # Calculate average
    average = sum(numbers) / len(numbers)
    print(f"Average: {average:.2f}")
    
    print("=" * 40)

def main():
    """Main function to run the largest number finder."""
    while True:
        print("Welcome to the Largest Number Finder!")
        print()
        
        # Get number count
        count = get_numbers_count()
        
        # Get numbers from user
        numbers = []
        for i in range(count):
            number = get_number(f"Enter number {i + 1}: ")
            numbers.append(number)
        
        # Find largest and smallest
        largest, smallest, largest_indices, smallest_indices = find_largest_and_smallest(numbers)
        
        # Display results
        display_results(numbers, largest, smallest, largest_indices, smallest_indices)
        
        # Ask if user wants to compare more numbers
        print()
        compare_again = input("Would you like to compare more numbers? (y/n): ").lower().strip()
        if compare_again not in ['y']:
            print("Thanks for using the Largest Number Finder!")
            break
        print()

main()
