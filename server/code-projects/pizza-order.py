print("Welcome to Python Pizza Deliveries!")
size = input("What size pizza do you want? S, M, or L: ").upper()
add_pepperoni = input("Do you want pepperoni? (y/n): ").lower()
extra_cheese = input("Do you want extra cheese? (y/n): ").lower()

price = 0

if size == "S":
    price += 15
    if add_pepperoni == "y":
        price += 2
elif size == "M":
    price += 20
    if add_pepperoni == "y":
        price += 3
elif size == "L":
    price += 25
    if add_pepperoni == "y":
        price += 3
else:
    print("Invalid size selected. Defaulting to Small.")
    price += 15

if extra_cheese == "y":
    price += 1

print(f"Your final bill is: ${price}.")