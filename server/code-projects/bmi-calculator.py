
def get_height():
    """Get height from user with validation."""
    while True:
        try:
            height = float(input("Enter your height in meters (e.g., 1.75): "))
            if 0.5 <= height <= 3.0:
                return height
            print("Please enter a realistic height between 0.5 and 3.0 meters.")
        except ValueError:
            print("Please enter a valid number.")

def get_weight():
    """Get weight from user with validation."""
    while True:
        try:
            weight = float(input("Enter your weight in kilograms (e.g., 70): "))
            if 10 <= weight <= 500:
                return weight
            print("Please enter a realistic weight between 10 and 500 kg.")
        except ValueError:
            print("Please enter a valid number.")

def calculate_bmi(weight, height):
    """Calculate BMI from weight and height."""
    return weight / (height ** 2)

def get_bmi_category(bmi):
    """Get BMI category and recommendation based on BMI value."""
    if bmi < 18.5:
        category = "Underweight"
        recommendation = "Consider consulting a healthcare provider about healthy weight gain."
        risk = "May indicate malnutrition or other health issues."
    elif 18.5 <= bmi < 25:
        category = "Normal weight"
        recommendation = "Great job! Maintain your healthy lifestyle with balanced diet and regular exercise."
        risk = "Low risk of weight-related health problems."
    elif 25 <= bmi < 30:
        category = "Overweight"
        recommendation = "Consider a balanced diet and regular exercise to reach a healthier weight."
        risk = "Increased risk of cardiovascular disease and diabetes."
    else:
        category = "Obese"
        recommendation = "Consider consulting a healthcare provider for personalized advice and support."
        risk = "Higher risk of serious health conditions including heart disease, diabetes, and stroke."
    
    return category, recommendation, risk

def calculate_ideal_weight_range(height):
    """Calculate ideal weight range based on height."""
    # Using BMI range of 18.5 to 24.9 for normal weight
    min_weight = 18.5 * (height ** 2)
    max_weight = 24.9 * (height ** 2)
    return min_weight, max_weight

def display_results(height, weight, bmi, category, recommendation, risk):
    """Display comprehensive BMI results."""
    print("\n" + "="*60)
    print("BMI CALCULATION RESULTS")
    print("="*60)
    print(f"Height: {height:.2f} meters")
    print(f"Weight: {weight:.1f} kg")
    print(f"BMI: {bmi:.1f}")
    print(f"Category: {category}")
    print("-"*60)
    print(f"Health Risk: {risk}")
    print(f"Recommendation: {recommendation}")
    
    # Show ideal weight range
    min_weight, max_weight = calculate_ideal_weight_range(height)
    print("-"*60)
    print(f"Ideal weight range for your height: {min_weight:.1f} - {max_weight:.1f} kg")
    
    # Show weight difference if not in normal range
    if bmi < 18.5:
        weight_to_gain = min_weight - weight
        print(f"Weight to gain to reach normal BMI: {weight_to_gain:.1f} kg")
    elif bmi >= 25:
        weight_to_lose = weight - max_weight
        print(f"Weight to lose to reach normal BMI: {weight_to_lose:.1f} kg")
    
    print("="*60)

def show_bmi_info():
    """Display information about BMI categories."""
    print("\nBMI Categories:")
    print("-" * 30)
    print("Underweight: Below 18.5")
    print("Normal weight: 18.5 - 24.9")
    print("Overweight: 25.0 - 29.9")
    print("Obese: 30.0 and above")
    print("-" * 30)
    print("Note: BMI is a screening tool and may not be accurate for")
    print("athletes, elderly individuals, or those with muscular builds.")

def main():
    """Main function to run the BMI calculator."""
    print("=== BMI Calculator ===")
    print("Calculate your Body Mass Index and get health recommendations!")
    print()
    
    while True:
        print("Choose an option:")
        print("1. Calculate BMI")
        print("2. Learn about BMI categories")
        
        choice = input("Enter your choice (1-2): ").strip()
        
        if choice == '1':
            print("\nBMI Calculation")
            print("-" * 20)
            
            height = get_height()
            weight = get_weight()
            
            bmi = calculate_bmi(weight, height)
            category, recommendation, risk = get_bmi_category(bmi)
            
            display_results(height, weight, bmi, category, recommendation, risk)
            
        elif choice == '2':
            show_bmi_info()
            
        else:
            print("Please enter 1 or 2.")
            continue
        
        print()
        calculate_again = input("Would you like to use the BMI calculator again? (y/n): ").lower().strip()
        if calculate_again not in ['y', 'yes']:
            print("Thank you for using the BMI Calculator!")
            print("Remember: Always consult healthcare professionals for medical advice.")
            break
        print()

main()
