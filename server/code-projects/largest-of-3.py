first_number = int(input("What is your first number? "))
second_number = int(input("What is your second number? "))
third_number = int(input("What is your third number? "))

if first_number >= second_number and first_number >= third_number:
   largest = first_number
elif second_number >= first_number and second_number >= third_number:
   largest = second_number
else:
   largest = third_number

print(f"The largest number is {largest}")
