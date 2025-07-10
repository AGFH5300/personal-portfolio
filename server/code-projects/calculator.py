import operator

def display_logo():
    """Display the calculator logo."""
    logo = """
 _____________________
|  _________________  |
| | Pythonista   0. | |  .----------------.  .----------------.  .----------------.  .----------------. 
| |_________________| | | .--------------. || .--------------. || .--------------. || .--------------. |
|  ___ ___ ___   ___  | | |     ______   | || |      __      | || |   _____      | || |     ______   | |
| | 7 | 8 | 9 | | + | | | |   .' ___  |  | || |     /  \     | || |  |_   _|     | || |   .' ___  |  | |
| |___|___|___| |___| | | |  / .'   \_|  | || |    / /\ \    | || |    | |       | || |  / .'   \_|  | |
| | 4 | 5 | 6 | | - | | | |  | |         | || |   / ____ \   | || |    | |   _   | || |  | |         | |
| |___|___|___| |___| | | |  \ `.___.'\  | || | _/ /    \ \_ | || |   _| |__/ |  | || |  \ `.___.'\  | |
| | 1 | 2 | 3 | | x | | | |   `._____.'  | || ||____|  |____|| || |  |________|  | || |   `._____.'  | |
| |___|___|___| |___| | | |              | || |              | || |              | || |              | |
| | . | 0 | = | | / | | | '--------------' || '--------------' || '--------------' || '--------------' |
| |___|___|___| |___| |  '----------------'  '----------------'  '----------------'  '----------------' 
|_____________________|
"""
    return logo

def get_number(prompt):
    """Get a number from user with validation."""
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Please enter a valid number.")

def get_operation():
    """Get operation from user with validation."""
    operations = {
        "+": operator.add,
        "-": operator.sub,
        "*": operator.mul,
        "/": operator.truediv,
        "**": operator.pow,
        "%": operator.mod
    }

    print("\nAvailable operations:")
    for symbol in operations.keys():
        print(f"  {symbol}")

    while True:
        operation_symbol = input("Pick an operation: ").strip()
        if operation_symbol in operations:
            return operation_symbol, operations[operation_symbol]
        print("Please choose a valid operation from the list above.")

def perform_calculation(num1, num2, operation_symbol, operation_function):
    """Perform the calculation and handle errors."""
    try:
        if operation_symbol == "/" and num2 == 0:
            print("Error: Cannot divide by zero!")
            return None

        result = operation_function(num1, num2)
        print(f"{num1} {operation_symbol} {num2} = {result}")
        return result

    except Exception as e:
        print(f"Error performing calculation: {e}")
        return None

def get_continue_choice(result):
    """Get user's choice to continue or start fresh."""
    print(f"\nType 'y' to continue calculating with {result}")
    print("Type 'n' to start a new calculation")
    print("Type 'q' to quit")

    while True:
        choice = input("Your choice: ").lower().strip()
        if choice in ['y']:
            return 'continue'
        elif choice in ['n']:
            return 'new'
        elif choice in ['q']:
            return 'quit'
        print("Please enter 'y', 'n', or 'q'.")

def calculator_session():
    """Run a calculator session."""
    print(display_logo())

    num1 = get_number("What is the first number? ")

    while True:
        operation_symbol, operation_function = get_operation()
        num2 = get_number("What is the next number? ")

        result = perform_calculation(num1, num2, operation_symbol, operation_function)

        if result is None:
            continue

        choice = get_continue_choice(result)

        if choice == 'continue':
            num1 = result
        elif choice == 'new':
            return True  # Start new calculation
        else:
            return False  # Quit

def main():
    """Main function to run the calculator."""
    print("=== Calculator ===")
    print("Perform basic mathematical operations!")
    print()

    while True:
        should_continue = calculator_session()
        if not should_continue:
            print("Thank you for using the calculator!")
            break
        print("\n" + "="*50)
        print("Starting new calculation...")
        print("="*50)

main()