import os

def area():
  answer_area = input("Do you have a radius or a diameter (pick one) (for finding the area)? ")
  answer_area = answer_area.lower()


  if answer_area == "radius":
    radius_a = float(input("What is the radius of your circle (cm)? "))
    radius_squared = radius_a*radius_a



  elif answer_area == "diameter":
    diameter_a = float(input("What is your diameter (cm)? "))
    diameter_a = diameter_a / 2
    squared_diameter_a = diameter_a*diameter_a
    radius_squared = squared_diameter_a


  else:
    print("Please enter a valid answer")
  pi = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679
  area = pi*radius_squared
  area = round(area, 2)
  global area_ans   
  area_ans = f"The area of your circle is {area}cm²!"
  print(area_ans)

def circumference():
  answer = input("Do you have a radius or a diameter (pick one) (for finding the circumference)? ")
  answer = answer.lower()


  if answer == "radius":
    radius = float(input("What is your radius (cm)? "))
    diameter = radius*2

  elif answer == "diameter":
    diameter = float(input("What is your diameter (cm)? "))

  else:
    print("Please enter a valid answer")

  pi = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679
  circumference = pi*diameter
  circumference = round(circumference, 2)
  global circum_answer
  circum_answer = f"The circumference of your circle is {circumference}cm!"
  print(circum_answer)

yes_no = input("Do you want to find the area of a circle or the circumference or both (type 'area' or 'circumference' or 'both')? ").lower()

if yes_no == "both":
  circumference()
  os.system('clear')
  print(circum_answer)
  area()
  os.system('clear')
  print(circum_answer)
  print(area_ans)  

elif yes_no == "circumference":
  circumference()
  os.system('clear')
  print(circum_answer)
elif yes_no == "area":
  area()
  os.system('clear')
  print(area_ans)
else:
  print("Enter a valid input.")
