from datetime import datetime, date

print("=== Life Left in Weeks Calculator ===")
print("Calculate how many weeks you have left based on average life expectancy.")
print("This gives perspective on the precious time we have.")
print()

birth_year = int(input("Enter your birth year (e.g., 2008): "))
birth_month = int(input("Enter your birth month (1-12): "))
birth_day = int(input("Enter your birth day (1-31): "))

birth_date = date(birth_year, birth_month, birth_day)
today = date.today()
age_in_days = (today - birth_date).days
age_in_years = age_in_days / 365.25

print(f"\nYou are approximately {age_in_years:.1f} years old")
print(f"That's {age_in_days:,} days you've been alive!")

life_expectancy = 90
years_left = life_expectancy - age_in_years
weeks_left = years_left * 52.18  
days_left = years_left * 365.25

print(f"\n=== Time Perspective ===")
print(f"Average life expectancy: {life_expectancy} years")

if years_left > 0:
    print(f"Estimated years left: {years_left:.1f}")
    print(f"Estimated weeks left: {weeks_left:,.0f}")
    print(f"Estimated days left: {days_left:,.0f}")
    
    percentage_lived = (age_in_years / life_expectancy) * 100
    print(f"\nYou've lived approximately {percentage_lived:.1f}% of your expected life")
    
    print(f"\n=== Perspective ===")
    print(f"• Every week is precious - you have roughly {weeks_left:,.0f} left")
    print(f"• That's about {weeks_left/52:.0f} years to pursue your dreams")
    print(f"• Make each week count!")
    
    if age_in_years < 25:
        print(f"• You're young! You have most of your life ahead of you")
    elif age_in_years < 50:
        print(f"• You're in your prime years - great time for achievements!")
    else:
        print(f"• You have wisdom and experience - share it with others!")
        
else:
    print(f"Congratulations! You've exceeded the average life expectancy!")
    print(f"Every day is a bonus - make the most of it!")

print(f"\nRemember: This is just an estimate based on averages.")
print(f"Focus on living a healthy, fulfilling life!")