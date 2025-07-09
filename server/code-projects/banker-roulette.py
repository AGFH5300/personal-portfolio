import random

test_seed = int(input("Create a seed number: "))
random.seed(test_seed)

names_string = input("Give me everybody's names, separated by a comma. ")
names = names_string.split(", ")

totalNames = len(names)

random_nameIndex = random.randint(0, totalNames - 1)

print(f"{names[random_nameIndex]} is going to buy the meal today!")
