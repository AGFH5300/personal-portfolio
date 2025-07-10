
print("Temperature Converter")
print("1. Celsius to Fahrenheit")
print("2. Fahrenheit to Celsius")

choice = input("Choose conversion type (1 or 2): ")

if choice == "1":
    celsius = float(input("What is the temperature in Celsius that you want to convert? "))
    fahrenheit = (celsius * 1.8) + 32
    print(f'{celsius}°C is {fahrenheit}°F')

elif choice == "2":
    fahrenheit = float(input("What is the temperature in Fahrenheit that you want to convert? "))
    celsius = (fahrenheit - 32) / 1.8
    print(f'{fahrenheit}°F is {celsius}°C')

else:
    print("Invalid choice. Please enter 1 or 2.")
