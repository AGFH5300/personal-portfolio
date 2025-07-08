import random
import string

print("=== Password Generator ===")
print("Generate secure random passwords!")
print()

# Get user preferences
length = int(input("Enter password length (8-128): "))
if length < 8:
    length = 8
    print("Minimum length set to 8 for security.")
elif length > 128:
    length = 128
    print("Maximum length set to 128.")

include_lowercase = input("Include lowercase letters? (y/n): ").lower().startswith('y')
include_uppercase = input("Include uppercase letters? (y/n): ").lower().startswith('y')
include_numbers = input("Include numbers? (y/n): ").lower().startswith('y')
include_symbols = input("Include symbols? (y/n): ").lower().startswith('y')

# Build character set
characters = ""
if include_lowercase:
    characters += string.ascii_lowercase
if include_uppercase:
    characters += string.ascii_uppercase
if include_numbers:
    characters += string.digits
if include_symbols:
    characters += "!@#$%^&*()_+-=[]{}|;:,.<>?"

if not characters:
    print("No character types selected! Using all types.")
    characters = string.ascii_letters + string.digits + "!@#$%^&*()_+-=[]{}|;:,.<>?"

# Generate password
password = ''.join(random.choice(characters) for _ in range(length))

print(f"\nGenerated Password: {password}")
print(f"Password Length: {length}")
print(f"Character types used: {len(set(characters))} different characters")

# Security tips
print("\n=== Security Tips ===")
print("• Store your password in a secure password manager")
print("• Don't reuse this password for multiple accounts")
print("• Consider using 2-factor authentication")
print("• Update passwords regularly")