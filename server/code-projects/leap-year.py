
print("=== Leap Year Checker ===")
print("Check if any year is a leap year!")
print()

def is_leap_year(year):
    """Check if a year is a leap year."""
    if year % 400 == 0:
        return True
    if year % 100 == 0:
        return False
    if year % 4 == 0:
        return True
    return False

def get_year():
    """Get year from user with validation."""
    while True:
        try:
            year = int(input("Enter a year: "))
            if year > 0:
                return year
            print("Please enter a positive year.")
        except ValueError:
            print("Please enter a valid year.")

def explain_leap_year_rules():
    """Explain the leap year rules."""
    print("\n📚 Leap Year Rules:")
    print("=" * 30)
    print("1. If divisible by 400 → Leap year")
    print("2. If divisible by 100 → Not a leap year")
    print("3. If divisible by 4 → Leap year")
    print("4. Otherwise → Not a leap year")
    print("=" * 30)

def get_year_range():
    """Get a range of years to check."""
    while True:
        try:
            start = int(input("Enter start year: "))
            end = int(input("Enter end year: "))
            
            if start > end:
                print("Start year should be less than or equal to end year.")
                continue
            
            if end - start > 100:
                print("Range too large. Please choose a range of 100 years or less.")
                continue
            
            return start, end
        except ValueError:
            print("Please enter valid years.")

def check_year_range(start_year, end_year):
    """Check leap years in a range."""
    leap_years = []
    for year in range(start_year, end_year + 1):
        if is_leap_year(year):
            leap_years.append(year)
    
    print(f"\n🗓️  Leap years between {start_year} and {end_year}:")
    print("=" * 40)
    
    if leap_years:
        for i, year in enumerate(leap_years):
            if i % 5 == 0 and i > 0:
                print()  # New line every 5 years
            print(f"{year}", end="  ")
        print()
        print(f"\nTotal leap years: {len(leap_years)}")
    else:
        print("No leap years found in this range.")
    
    print("=" * 40)

def display_year_info(year):
    """Display detailed information about a year."""
    is_leap = is_leap_year(year)
    
    print(f"\n📅 Year {year} Analysis:")
    print("=" * 30)
    print(f"Leap year: {'✅ Yes' if is_leap else '❌ No'}")
    print(f"Days in year: {366 if is_leap else 365}")
    print(f"Days in February: {29 if is_leap else 28}")
    
    # Show divisibility
    print(f"\nDivisibility:")
    print(f"  By 4: {'✅' if year % 4 == 0 else '❌'}")
    print(f"  By 100: {'✅' if year % 100 == 0 else '❌'}")
    print(f"  By 400: {'✅' if year % 400 == 0 else '❌'}")
    
    print("=" * 30)

def main():
    """Main function to run the leap year checker."""
    while True:
        print("🗓️  Welcome to the Leap Year Checker! 🗓️")
        print()
        print("Choose an option:")
        print("1. Check a single year")
        print("2. Check a range of years")
        print("3. Learn about leap year rules")
        
        choice = input("Enter your choice (1-3): ").strip()
        
        if choice == '1':
            year = get_year()
            display_year_info(year)
            
        elif choice == '2':
            print("Enter a range of years to check:")
            start_year, end_year = get_year_range()
            check_year_range(start_year, end_year)
            
        elif choice == '3':
            explain_leap_year_rules()
            
        else:
            print("Please enter 1, 2, or 3.")
            continue
        
        # Ask if user wants to check more years
        print()
        check_again = input("Would you like to check more years? (y/n): ").lower().strip()
        if check_again not in ['y', 'yes']:
            print("Thanks for using the Leap Year Checker! 🗓️")
            break
        print()

main()
