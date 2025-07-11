print("=== FizzBuzz Challenge ===")
print("Numbers 1-100, but with a twist - multiples of 3 become 'Fizz', 5 become 'Buzz'!")
print()

for number in range(1, 101):
    if number % 3 == 0 and number % 5 == 0:
        print("FizzBuzz")
    elif number % 3 == 0:
        print("Fizz")
    elif number % 5 == 0:
        print("Buzz")
    else:
        print(number)