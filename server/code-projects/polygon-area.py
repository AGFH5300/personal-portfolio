import math
import os

def get_area_coefficient(sides):
    """Returns the coefficient for calculating regular polygon area."""
    coefficients = {
        3: 0.5,  # Triangle: base * height / 2, but for regular: (side^2 * sqrt(3)) / 4
        4: 1.0,  # Square: side^2
        5: 1.72,  # Pentagon
        6: (3 * math.sqrt(3)) / 2,  # Hexagon
        7: 3.633912444,  # Septagon
        8: 2 * (1 + math.sqrt(2)),  # Octagon
        9: 2.25 * 2.747,  # Nonagon
        10: 7.69420884294,  # Decagon
        11: 9.365,  # Undecagon
        12: 3 * (2 + math.sqrt(3)),  # Dodecagon
        13: 13.185768328324,  # Tridecagon
        14: 15.334501936372,  # Tetradecagon
        15: 17.642362910544   # Pentadecagon
    }
    return coefficients.get(sides, 0)

def calculate_polygon_area(sides):
    """Calculate area of a regular polygon."""
    polygon_names = {
        3: "triangle", 4: "quadrilateral", 5: "pentagon", 6: "hexagon",
        7: "septagon", 8: "octagon", 9: "nonagon", 10: "decagon",
        11: "undecagon", 12: "dodecagon", 13: "tridecagon", 
        14: "tetradecagon", 15: "pentadecagon"
    }

    polygon_name = polygon_names[sides]

    if sides == 3:
        base = float(input(f'What is the base of the {polygon_name} (cm)?\n'))
        height = float(input(f'What is the height of the {polygon_name} (cm)?\n'))
        area = (base * height) / 2
    elif sides == 4:
        length = float(input(f'What is the length of the {polygon_name} (cm)?\n'))
        width = float(input(f'What is the width of the {polygon_name} (cm)?\n'))
        area = length * width
    else:
        side = float(input(f'What is the length of the side in the regular {polygon_name} (cm)?\n'))
        coefficient = get_area_coefficient(sides)
        area = side * side * coefficient

    # Handle rounding
    if not area.is_integer():
        round_input = int(input('How many decimal places do you want to round the answer to (0-10)?\n'))
        if 0 <= round_input <= 10:
            area = round(area, round_input)
        else:
            print("Invalid Input.")
            return
    else:
        area = math.trunc(area)

    print(f"The area of the regular {polygon_name} is {area}cm²!")

def area_of_triangle():
    calculate_polygon_area(3)

def area_of_quad():
    calculate_polygon_area(4)

def area_of_pentagon():
    calculate_polygon_area(5)

def area_of_hexagon():
    calculate_polygon_area(6)

def area_of_septagon():
    calculate_polygon_area(7)

def area_of_octagon():
    calculate_polygon_area(8)

def area_of_nonagon():
    calculate_polygon_area(9)

def area_of_decagon():
    calculate_polygon_area(10)

def area_of_undecagon():
    calculate_polygon_area(11)

def area_of_dodecagon():
    calculate_polygon_area(12)

def area_of_tridecagon():
    calculate_polygon_area(13)

def area_of_tetradecagon():
    calculate_polygon_area(14)

def area_of_pentadecagon():
    calculate_polygon_area(15)

def clear_screen():
    """Clear the screen."""
    os.system('clear')

def area():
    """Main area calculation function."""
    print("Welcome to Area of a Regular Polygon Calculator!")

    while True:
        user_input = input('How many sides does your regular polygon have (3 - 15)?\n')

        if not user_input.isnumeric():
            print("Invalid input.")
            continue

        sides = int(user_input)

        if sides < 3 or sides > 15:
            print("Limit exceeded, valid range is 3-15.")
            continue

        calculate_polygon_area(sides)
        break

    should_continue = input("Want to do another calculation (type 'y' or 'n')? ").lower()
    if should_continue == 'y':
        clear_choice = input("Want to clear screen? (type 'y' or 'n')? ").lower()
        if clear_choice == 'y':
            clear_screen()
        elif clear_choice != 'n':
            print("Invalid Input!")
            return
        print('')
        area()
    elif should_continue != 'n':
        print("Invalid Input!")

area()