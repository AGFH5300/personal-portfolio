
import sys

def is_leap(year):
    if year % 4 == 0:
        if year % 100 == 0:
            if year % 400 == 0:
                return True
            else:
                return False
        else:
            return True
    else:
        return False

def days_in_month(year, month):
    if month > 12 or month < 1:
        return "This is an Invalid Month"
    month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if is_leap(year) and month == 2:
        return 29
    return month_days[month - 1]

def main():
    print("=== Days in Month Calculator ===")
    print("Find out how many days are in any month of any year!")
    print()
    
    while True:
        try:
            year = int(input("Enter a year: "))
            month = int(input("Enter a month (1-12): "))
            
            days = days_in_month(year, month)
            if isinstance(days, str):
                print(days)
            else:
                print(f"There are {days} days in month {month} of year {year}.")
                
        except ValueError:
            print("Please enter valid numbers for both year and month.")
            continue
        except KeyboardInterrupt:
            print("\nGoodbye!")
            sys.exit(0)
        except EOFError:
            print("\nGoodbye!")
            sys.exit(0)
        except Exception as e:
            print(f"An error occurred: {e}")
            continue
        
        print()
        try:
            check_again = input("Would you like to check another month? (y/n): ").lower().strip()
            if check_again not in ['y', 'yes']:
                print("Thanks for using the Days in Month Calculator!")
                break
        except (KeyboardInterrupt, EOFError):
            print("\nGoodbye!")
            sys.exit(0)
        except Exception:
            print("Thanks for using the Days in Month Calculator!")
            break
        
        print()

if __name__ == "__main__":
    main()
