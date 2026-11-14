sci_redu = 0
bos_total = 0

def is_decimal(num):
    return not num.is_integer()

print("Welcome to Mr. Mine Scientist Death Calculator!")

def main():
    while True:
        calculate_death_chance()

        play_again = input("\nWould you like to calculate another scientist's death chance? (y/n): ").lower().strip()
        if play_again not in ['y']:
            print("Thanks for using Mr. Mine Scientist Death Calculator!")
            break
        print()

def calculate_death_chance():
    try:
        death_chance = int(input('Chance of Death (1 - 100)?\n'))
        if death_chance > 100:
            print("Invalid Input!")
            return
    except ValueError:
        print("Invalid input.")
        return

    rarity = str(input("Rarity of the Scientist? (ex. common, rare, warped++)\n"))

    if rarity == 'common':
        sci_redu = 1
    elif rarity == 'uncommon':
        sci_redu = 0.9
    elif rarity == 'rare':
        sci_redu = 0.75
    elif rarity == 'legendary':
        sci_redu = 0.45
    elif rarity == 'warped':
        decision = input('Was the scientist a common or uncommon before it was warped?\n')
        if decision == "common":
            sci_redu = 0.75
        elif decision == "uncommon":
            sci_redu = 0.675
        else:
            print("Invalid Input!")
            return
    elif rarity == 'warped+':
        sci_redu = 0.4
    elif rarity == 'warped++':
        sci_redu = 0.3
    else:
        print('Invalid Input!')
        return

    bos = input("Percentage of points you have in the Book of Success (ex. 10, 50, idk)?\n")

    if bos.isdigit():
        bos_total = int(bos)
    else:
        if bos == 'idk':
            bos_amount = int(input("How many Books of Success do you have?\n"))
            bos_amount = bos_amount * 10
            bosplus_amount = int(input("How many Books of Success+ do you have?\n"))
            bosplus_amount = bosplus_amount * 12.5
            bosplus2_amount = int(input("How many Books of Success++ do you have?\n"))
            bosplus2_amount = bosplus2_amount * 15
            bos_total = bos_amount + bosplus_amount + bosplus2_amount
            if bos_total > 75:
                print("Invalid Input!")
                return
            else:
                if is_decimal(bos_total):
                    print(f"The amount of points of the books of success is {bos_total}.")
                else:
                    bos_total = int(bos_total)
                    print(f"The amount of points of the books of success is {bos_total}.")
        else:
            print('Invalid Input!')
            return

    bos_total = bos_total / 100

    if is_decimal(bos_total):
        final = round(death_chance * sci_redu) * (1 - bos_total)
        final = round(final, 2)
        final = f"There is a {final}% that your scientist will die."
        print(final)
    else:
        bos_total = int(bos_total)
        final = round(death_chance * sci_redu) * (1 - bos_total)
        final = round(final, 2)
        final = f"There is a {final}% that your scientist will die."
        print(final)

main()