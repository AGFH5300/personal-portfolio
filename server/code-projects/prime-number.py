
print("=== Prime Number Checker ===")
print("Check if numbers are prime and find prime numbers in ranges!")
print()

def is_prime(number):
    """Check if a number is prime."""
    if number < 2:
        return False
    if number == 2:
        return True
    if number % 2 == 0:
        return False
    
    # Check odd divisors up to sqrt(number)
    for i in range(3, int(number**0.5) + 1, 2):
        if number % i == 0:
            return False
    return True

def get_number():
    """Get a number from user with validation."""
    while True:
        try:
            number = int(input("Enter a number to check: "))
            if number >= 0:
                return number
            print("Please enter a non-negative number.")
        except ValueError:
            print("Please enter a valid integer.")

def get_range():
    """Get a range of numbers from user."""
    while True:
        try:
            start = int(input("Enter start number: "))
            end = int(input("Enter end number: "))
            
            if start < 0 or end < 0:
                print("Please enter non-negative numbers.")
                continue
            
            if start > end:
                print("Start number should be less than or equal to end number.")
                continue
            
            if end - start > 10000:
                print("Range too large. Please choose a range of 10,000 or less.")
                continue
            
            return start, end
        except ValueError:
            print("Please enter valid integers.")

def find_primes_in_range(start, end):
    """Find all prime numbers in a range."""
    primes = []
    for num in range(start, end + 1):
        if is_prime(num):
            primes.append(num)
    return primes

def display_prime_info(number):
    """Display detailed information about a number."""
    prime_status = is_prime(number)
    
    print(f"\n🔢 Analysis of {number}:")
    print("=" * 30)
    print(f"Is prime: {'✅ Yes' if prime_status else '❌ No'}")
    
    if number < 2:
        print("Note: Numbers less than 2 are not considered prime.")
    elif number == 2:
        print("Note: 2 is the only even prime number.")
    elif not prime_status and number > 1:
        # Find factors
        factors = []
        for i in range(2, int(number**0.5) + 1):
            if number % i == 0:
                factors.append(i)
                if i != number // i:
                    factors.append(number // i)
        
        factors.sort()
        print(f"Factors: {factors}")
        print(f"Smallest factor: {factors[0]}")
    
    # Show nearby primes
    nearby_primes = []
    for i in range(max(2, number - 10), number + 11):
        if is_prime(i):
            nearby_primes.append(i)
    
    if nearby_primes:
        print(f"Nearby primes: {nearby_primes}")
    
    print("=" * 30)

def display_range_results(start, end, primes):
    """Display prime numbers found in a range."""
    print(f"\n🔍 Prime numbers between {start} and {end}:")
    print("=" * 40)
    
    if primes:
        print(f"Found {len(primes)} prime numbers:")
        
        # Display primes in rows of 10
        for i, prime in enumerate(primes):
            if i % 10 == 0 and i > 0:
                print()
            print(f"{prime:4d}", end=" ")
        print()
        
        print(f"\nFirst prime: {primes[0]}")
        print(f"Last prime: {primes[-1]}")
        print(f"Total count: {len(primes)}")
        
        # Calculate percentage
        total_numbers = end - start + 1
        percentage = (len(primes) / total_numbers) * 100
        print(f"Percentage of range: {percentage:.1f}%")
    else:
        print("No prime numbers found in this range.")
    
    print("=" * 40)

def main():
    """Main function to run the prime number checker."""
    while True:
        print("🔢 Welcome to the Prime Number Checker! 🔢")
        print()
        print("Choose an option:")
        print("1. Check a single number")
        print("2. Find primes in a range")
        print("3. Learn about prime numbers")
        
        choice = input("Enter your choice (1-3): ").strip()
        
        if choice == '1':
            number = get_number()
            display_prime_info(number)
            
        elif choice == '2':
            print("Enter a range to find prime numbers:")
            start, end = get_range()
            primes = find_primes_in_range(start, end)
            display_range_results(start, end, primes)
            
        elif choice == '3':
            print("\n📚 About Prime Numbers:")
            print("=" * 40)
            print("• A prime number is a natural number greater than 1")
            print("• It has exactly two factors: 1 and itself")
            print("• Examples: 2, 3, 5, 7, 11, 13, 17, 19, 23...")
            print("• 2 is the only even prime number")
            print("• There are infinitely many prime numbers")
            print("• Used in cryptography and computer science")
            print("=" * 40)
            
        else:
            print("Please enter 1, 2, or 3.")
            continue
        
        # Ask if user wants to check more numbers
        print()
        check_again = input("Would you like to check more numbers? (y/n): ").lower().strip()
        if check_again not in ['y']:
            print("Thanks for using the Prime Number Checker! 🔢")
            break
        print()

main()
