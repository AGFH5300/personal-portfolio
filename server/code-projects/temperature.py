
print("=== Temperature Converter ===")
print("Convert temperatures between Celsius and Fahrenheit!")
print()

def get_temperature(unit):
    """Get temperature input with validation."""
    while True:
        try:
            temp = float(input(f"Enter temperature in {unit}: "))
            return temp
        except ValueError:
            print("Please enter a valid number.")

def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit."""
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    """Convert Fahrenheit to Celsius."""
    return (fahrenheit - 32) * 5/9

def celsius_to_kelvin(celsius):
    """Convert Celsius to Kelvin."""
    return celsius + 273.15

def fahrenheit_to_kelvin(fahrenheit):
    """Convert Fahrenheit to Kelvin."""
    return celsius_to_kelvin(fahrenheit_to_celsius(fahrenheit))

def kelvin_to_celsius(kelvin):
    """Convert Kelvin to Celsius."""
    return kelvin - 273.15

def kelvin_to_fahrenheit(kelvin):
    """Convert Kelvin to Fahrenheit."""
    return celsius_to_fahrenheit(kelvin_to_celsius(kelvin))

def display_all_conversions(temp, from_unit):
    """Display temperature in all units."""
    print(f"\n🌡️  Temperature Conversions:")
    print("=" * 40)
    
    if from_unit == "Celsius":
        celsius = temp
        fahrenheit = celsius_to_fahrenheit(celsius)
        kelvin = celsius_to_kelvin(celsius)
    elif from_unit == "Fahrenheit":
        fahrenheit = temp
        celsius = fahrenheit_to_celsius(fahrenheit)
        kelvin = fahrenheit_to_kelvin(fahrenheit)
    else:  # Kelvin
        kelvin = temp
        celsius = kelvin_to_celsius(kelvin)
        fahrenheit = kelvin_to_fahrenheit(kelvin)
    
    print(f"🔥 Celsius:    {celsius:.2f}°C")
    print(f"🌡️  Fahrenheit: {fahrenheit:.2f}°F")
    print(f"❄️  Kelvin:     {kelvin:.2f}K")
    print("=" * 40)
    
    # Add temperature context
    if celsius <= 0:
        print("💧 Water freezes at this temperature!")
    elif celsius >= 100:
        print("💨 Water boils at this temperature!")
    elif 20 <= celsius <= 25:
        print("🌤️  Perfect room temperature!")
    elif celsius < 10:
        print("🧊 Pretty cold!")
    elif celsius > 35:
        print("🔥 Getting hot!")

def get_conversion_choice():
    """Get user's conversion choice."""
    while True:
        print("\nChoose conversion type:")
        print("1. Celsius to Fahrenheit")
        print("2. Fahrenheit to Celsius")
        print("3. Show all conversions")
        print("4. Advanced (include Kelvin)")
        
        choice = input("Enter your choice (1-4): ").strip()
        if choice in ['1', '2', '3', '4']:
            return choice
        print("Please enter a valid choice (1-4).")

def main():
    """Main function to run the temperature converter."""
    while True:
        print("🌡️  Temperature Converter 🌡️")
        
        choice = get_conversion_choice()
        
        if choice == '1':
            celsius = get_temperature("Celsius")
            fahrenheit = celsius_to_fahrenheit(celsius)
            print(f"\n{celsius}°C = {fahrenheit:.2f}°F")
            
        elif choice == '2':
            fahrenheit = get_temperature("Fahrenheit")
            celsius = fahrenheit_to_celsius(fahrenheit)
            print(f"\n{fahrenheit}°F = {celsius:.2f}°C")
            
        elif choice == '3':
            temp_unit = input("Enter the original unit (Celsius/Fahrenheit): ").strip().title()
            if temp_unit not in ['Celsius', 'Fahrenheit']:
                print("Please enter 'Celsius' or 'Fahrenheit'.")
                continue
            
            temp = get_temperature(temp_unit)
            display_all_conversions(temp, temp_unit)
            
        elif choice == '4':
            print("\nAdvanced Temperature Converter")
            print("Units: Celsius, Fahrenheit, Kelvin")
            
            from_unit = input("Convert FROM (Celsius/Fahrenheit/Kelvin): ").strip().title()
            if from_unit not in ['Celsius', 'Fahrenheit', 'Kelvin']:
                print("Please enter a valid unit.")
                continue
            
            temp = get_temperature(from_unit)
            display_all_conversions(temp, from_unit)
        
        # Ask if user wants to convert again
        print()
        convert_again = input("Would you like to convert another temperature? (y/n): ").lower().strip()
        if convert_again not in ['y', 'yes']:
            print("Thanks for using the Temperature Converter! 🌡️")
            break
        print()

if __name__ == "__main__":
    main()
