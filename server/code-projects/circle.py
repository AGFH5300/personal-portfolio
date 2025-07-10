
import math

def get_positive_number(prompt):
    """Get a positive number from user input with error handling."""
    while True:
        try:
            value = float(input(prompt))
            if value <= 0:
                print("Please enter a positive number greater than 0.")
                continue
            return value
        except ValueError:
            print("Please enter a valid number.")

def calculate_area(radius):
    """Calculate the area of a circle given its radius."""
    area = math.pi * radius ** 2
    return round(area, 2)

def calculate_circumference(radius):
    """Calculate the circumference of a circle given its radius."""
    circumference = 2 * math.pi * radius
    return round(circumference, 2)

def get_radius():
    """Get radius from user, either directly or from diameter."""
    while True:
        choice = input("Do you have a radius or diameter? (r/d): ").lower().strip()
        
        if choice in ['r', 'radius']:
            return get_positive_number("Enter the radius (cm): ")
        elif choice in ['d', 'diameter']:
            diameter = get_positive_number("Enter the diameter (cm): ")
            return diameter / 2
        else:
            print("Please enter 'r' for radius or 'd' for diameter.")

def display_results(radius, area, circumference):
    """Display the results in a formatted way."""
    print("\n" + "="*40)
    print("CIRCLE CALCULATOR RESULTS")
    print("="*40)
    print(f"Radius: {radius} cm")
    print(f"Area: {area} cm²")
    print(f"Circumference: {circumference} cm")
    print("="*40)

def main():
    """Main function to run the circle calculator."""
    print("=== Circle Calculator ===")
    print("Calculate the area and circumference of a circle!")
    print()
    
    while True:
        # Get what the user wants to calculate
        print("What would you like to calculate?")
        print("1. Area only")
        print("2. Circumference only") 
        print("3. Both area and circumference")
        
        choice = input("Enter your choice (1/2/3): ").strip()
        
        if choice not in ['1', '2', '3']:
            print("Please enter 1, 2, or 3.")
            continue
        
        # Get radius from user
        radius = get_radius()
        
        # Calculate based on user choice
        if choice == '1':
            area = calculate_area(radius)
            print(f"\nThe area of your circle is {area} cm²")
        elif choice == '2':
            circumference = calculate_circumference(radius)
            print(f"\nThe circumference of your circle is {circumference} cm")
        else:
            area = calculate_area(radius)
            circumference = calculate_circumference(radius)
            display_results(radius, area, circumference)
        
        # Ask if user wants to continue
        print()
        continue_choice = input("Would you like to calculate another circle? (y/n): ").lower().strip()
        if continue_choice not in ['y', 'yes']:
            print("Thank you for using the Circle Calculator!")
            break
        print()

main()
