
def get_direction():
    """Get encode/decode direction with validation."""
    while True:
        direction = input("Type 'encode' to encrypt, type 'decode' to decrypt: ").lower().strip()
        if direction in ['encode', 'decode']:
            return direction
        print("Please enter 'encode' or 'decode'.")

def get_text():
    """Get text from user."""
    while True:
        text = input("Type your message: ").strip()
        if text:
            return text.lower()
        print("Please enter a message.")

def get_shift():
    """Get shift number with validation."""
    while True:
        try:
            shift = int(input("Type the shift number (1-25): "))
            if 1 <= shift <= 25:
                return shift
            print("Please enter a number between 1 and 25.")
        except ValueError:
            print("Please enter a valid number.")

def caesar_cipher(text, shift_amount, cipher_direction):
    """Perform Caesar cipher encryption/decryption."""
    alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    
    cipher_text = ""
    if cipher_direction == "decode":
        shift_amount *= -1
    
    for character in text:
        if character in alphabet:
            position = alphabet.index(character)
            new_letter = alphabet[(position + shift_amount) % len(alphabet)]
            cipher_text += new_letter
        else:
            cipher_text += character
    
    return cipher_text

def display_result(direction, original_text, result_text, shift):
    """Display the cipher result."""
    print("\n" + "="*50)
    print("CAESAR CIPHER RESULT")
    print("="*50)
    print(f"Operation: {direction.title()}")
    print(f"Shift: {shift}")
    print(f"Original: {original_text}")
    print(f"Result: {result_text}")
    print("="*50)

def main():
    """Main function to run the Caesar cipher."""
    logo = """           
 ,adPPYba, ,adPPYYba,  ,adPPYba, ,adPPYba, ,adPPYYba, 8b,dPPYba,  
a8"     "" ""     `Y8 a8P_____88 I8[    "" ""     `Y8 88P'   "Y8  
8b         ,adPPPPP88 8PP"""""""  `"Y8ba,  ,adPPPPP88 88          
"8a,   ,aa 88,    ,88 "8b,   ,aa aa    ]8I 88,    ,88 88          
 `"Ybbd8"' `"8bbdP"Y8  `"Ybbd8"' `"YbbdP"' `"8bbdP"Y8 88   
            88             88                                 
           ""             88                                 
                          88                                 
 ,adPPYba, 88 8b,dPPYba,  88,dPPYba,   ,adPPYba, 8b,dPPYba,  
a8"     "" 88 88P'    "8a 88P'    "8a a8P_____88 88P'   "Y8  
8b         88 88       d8 88       88 8PP""""""" 88          
"8a,   ,aa 88 88b,   ,a8" 88       88 "8b,   ,aa 88          
 `"Ybbd8"' 88 88`YbbdP"'  88       88  `"Ybbd8"' 88          
              88                                             
              88           
"""
    
    print("=== Caesar Cipher ===")
    print("Encode and decode secret messages using the Caesar cipher!")
    print()
    print(logo)
    
    while True:
        direction = get_direction()
        text = get_text()
        shift = get_shift()
        
        result = caesar_cipher(text, shift, direction)
        display_result(direction, text, result, shift)
        
        # Ask if user wants to continue
        print()
        continue_choice = input("Do you want to continue? (y/n): ").lower().strip()
        if continue_choice not in ['y', 'yes']:
            print("Thank you for using the Caesar Cipher!")
            break
        print()

if __name__ == "__main__":
    main()
