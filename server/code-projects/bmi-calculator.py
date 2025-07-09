# BMI Calculator
print("=== BMI Calculator ===")
print("Calculate your Body Mass Index and get health recommendations!")
print()

# Get user input
height = float(input("Enter your height in meters (e.g., 1.75): "))
weight = float(input("Enter your weight in kilograms (e.g., 70): "))

# Calculate BMI
bmi = weight / (height ** 2)

print(f"\nYour BMI is: {bmi:.1f}")

if bmi < 18.5:
    category = "Underweight"
    recommendation = "Consider consulting a healthcare provider about healthy weight gain."
elif 18.5 <= bmi < 25:
    category = "Normal weight"
    recommendation = "Great job! Maintain your healthy lifestyle."
elif 25 <= bmi < 30:
    category = "Overweight"
    recommendation = "Consider a balanced diet and regular exercise."
else:
    category = "Obese"
    recommendation = "Consider consulting a healthcare provider for personalized advice."

print(f"Category: {category}")
print(f"Recommendation: {recommendation}")