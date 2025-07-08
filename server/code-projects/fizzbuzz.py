print("=== FizzBuzz Challenge ===")
print("Classic programming challenge!")
print()

# Get range from user
start = int(input("Enter starting number (default 1): ") or "1")
end = int(input("Enter ending number (default 100): ") or "100")

print(f"\nFizzBuzz from {start} to {end}:")
print("=" * 30)

for i in range(start, end + 1):
    if i % 15 == 0:  # Divisible by both 3 and 5
        print("FizzBuzz")
    elif i % 3 == 0:  # Divisible by 3
        print("Fizz")
    elif i % 5 == 0:  # Divisible by 5
        print("Buzz")
    else:
        print(i)

print("=" * 30)
print("FizzBuzz challenge completed!")